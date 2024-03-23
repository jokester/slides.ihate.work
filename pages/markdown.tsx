import { useState } from 'react';
import { DefaultMeta } from '../src/components/meta/default-meta';
import { MarkdownForm, defaultSlideText } from '../src/markdown/markdown-form';
import { MarkdownHelp, PageContainer, PageFooter, PageHeader } from '../src/layouts';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { isUrl } from '../src/core/url-loader';
import { rewriteUrlToRoute } from '../src/routes/url-rewrite';
import { extractErrorMessage } from '../src/utils';
import debug from 'debug';
import { useRouter } from 'next/router';
import { SlideBundle } from '../src/core/SlideBundle';
import { RevealSlidePlayer } from '../src/player/reveal-slide-player';

const logger = debug('pages:markdown');

/**
 * /markdown page
 * for markdown input from textarea / file / general external URL
 */
export default function MarkdownPage() {
  const [text, setText] = useState('');
  const [playback, setPlayback] = useState<null | SlideBundle>(null);
  const onTextChange = (newText: string, isManualEdit: boolean) => {
    if (isManualEdit || !text || text === defaultSlideText) {
      setText(newText);
    } else if (confirm('Overwrite current input?')) {
      setText(newText);
    }
  };

  const onStartPlayback = () => {
    setPlayback({
      slideText: text,
    });
  };
  useTextInitialize((initialValue) => {
    logger('externalText', initialValue);
    setText(initialValue);
  });

  if (!playback) {
    return (
      <>
        <DefaultMeta title="slides.ihate.work" />
        <PageContainer>
          <PageHeader />
          <MarkdownForm value={text} onChange={onTextChange} onStart={onStartPlayback} />
          <MarkdownHelp />
          <div className="flex-grow flex-shrink-0" />
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <DefaultMeta title="slides.ihate.work" />
      <RevealSlidePlayer listenEscDblclick onDestroy={() => setPlayback(null)} bundle={playback} />
    </>
  );
}

/**
 * handle `?markdownUrl=...` query
 */
export function useTextInitialize(onRawFetched: (x: string) => void) {
  const router = useRouter();
  useAsyncEffect(
    async (running) => {
      logger('ready', router.isReady);
      if (!router.isReady) {
        return;
      }
      const markdownUrl = router.query.markdownUrl as string | undefined;
      if (!markdownUrl) {
        onRawFetched(defaultSlideText);
        return;
      }
      if (!isUrl(markdownUrl)) {
        alert('Invalid URL');
        onRawFetched(defaultSlideText);
        return;
      }
      const redirect = rewriteUrlToRoute(markdownUrl);
      if (redirect instanceof Error) {
        alert(redirect.message);
        return;
      }
      if (redirect) {
        router.push(redirect);
        return;
      }
      try {
        const externalAsset = await fetch(markdownUrl).then((res) => res.text());
        if (running.current) {
          onRawFetched(externalAsset);
        }
      } catch (e: unknown) {
        console.error(e);
        alert(extractErrorMessage(e));
      }
    },
    [router],
  );
}
