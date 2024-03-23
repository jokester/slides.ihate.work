import { PropsWithChildren, Ref, RefObject, forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import debug from 'debug';
import { SlideBundle } from '../core/SlideBundle';
import clsx from 'clsx';
import slideStyles from './slides.module.scss';
import { useSingleton } from 'foxact/use-singleton';
import { createKeyUpObservable, createRecentObservable } from '../utils/observables';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { RevealCodeThemeKey, RevealStylesheets, RevealThemeKey } from '../components/cdn_assets';

const logger = debug('src:markdown:markdown-slides');

export interface MarkdownSlideProps {
  revealTheme?: RevealThemeKey;
  revealCodeTheme: RevealCodeThemeKey;
  className?: string;
  bundle?: SlideBundle;
  /**
   * @deprecated use bundle.slideText
   */
  text?: string;
  listenEscDblclick?: boolean;
  onDestroy?(): void;
}

export class RevealHandle {
  private inited?: Promise<import('reveal.js').Api>;
  private destroyed = false;

  constructor(
    private divRef: RefObject<HTMLDivElement>,
    private propRef: RefObject<MarkdownSlideProps>,
  ) {}

  async init() {
    await (this.inited ??= this._init());
  }

  async destroy() {
    if (this.inited && !this.destroyed) {
      this.destroyed = true;
      const api = await this.inited;
      api.destroy();
      logger('reveal destroyed', api, this.divRef.current);
    }
  }
  private async _init() {
    const { createReveal } = await import('./reveal-init');
    const api = await createReveal(this.divRef.current!);
    await api.initialize();
    // api.getRevealElement()?.focus();
    logger('reveal initialized', api, this.divRef.current);
    return api;
  }
}

function useDoubleClickEsc({ listenEscDblclick, onDestroy }: MarkdownSlideProps) {
  useEffect(() => {
    if (!listenEscDblclick) {
      return;
    }

    const esc$ = createKeyUpObservable(document, 'Escape');
    const dblClick$ = createRecentObservable(esc$, 2);

    const sub = dblClick$.subscribe(({ values, times }) => {
      const [tLatest, tPrev] = times;
      logger('esc pressed', tLatest, tPrev);
      if (tLatest && tPrev && tLatest <= tPrev + 1e3) {
        onDestroy?.();
        closeSnackbar();
        enqueueSnackbar('Presentation ended', { variant: 'info', autoHideDuration: 1e3 });
      } else if (!tPrev || tLatest <= tPrev + 2e3) {
        enqueueSnackbar('Double click ESC to exit', { variant: 'info', autoHideDuration: 2e3 });
      }
    });
    return () => sub.unsubscribe();
  }, [onDestroy, listenEscDblclick]);
}

function _RevealSlidePlayer(props: PropsWithChildren<MarkdownSlideProps>, ref: Ref<RevealHandle>) {
  const propsRef = useRef(props);
  propsRef.current = props;
  const divRef = useRef<HTMLDivElement>(null!);

  const slideText = useSingleton(() => props.bundle?.slideText ?? props.text ?? '');
  const handle = useSingleton(() => new RevealHandle(divRef, propsRef)).current;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useImperativeHandle(ref, () => handle, []);
  useDoubleClickEsc(props);

  useAsyncEffect(
    async (running, released) => {
      await handle.init();
      await released;
      await handle.destroy();
    },
    [],
    true,
  );
  const options = {
    'data-separator': '^\n---\n$',
    'data-separator-vertical': '^\n--\n$',
  };

  return (
    <div className={clsx('reveal', props.className, slideStyles.revealPlaying)} ref={divRef}>
      <RevealStylesheets theme={props.revealTheme ?? 'simple'} codeTheme={props.revealCodeTheme ?? 'docco'} />
      <div className="slides">
        <section data-markdown="" {...options}>
          <script type="text/template">{slideText.current}</script>
        </section>
      </div>
    </div>
  );
}

export const RevealSlidePlayer = memo(forwardRef(_RevealSlidePlayer), (whatever) => true);
