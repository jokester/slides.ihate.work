import React, { useState } from 'react';
import { DefaultMeta } from '../src/components/meta/default-meta';
import { defaultSlideText } from '../src/markdown/markdown-form';
import { PageContainer, PageHeader } from '../src/layouts';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { isUrl } from '../src/core/url-loader';
import { rewriteUrlToRoute } from '../src/routes/url-rewrite';
import { extractErrorMessage } from '../src/utils';
import debug from 'debug';
import { useRouter } from 'next/router';
import { SlideBundle } from '../src/core/SlideBundle';
import { RevealSlidePlayer } from '../src/player/reveal-slide-player';
import { Button } from '@mui/material';
import { MarkdownTextarea, StartPlaybackButton } from '../src/markdown/markdown-textarea';

const logger = debug('pages:markdown');

/**
 * @page /markdown
 * 1. try to load Markdown text from external url
 * 2. init MD form with loaded text
 * 3. if no external URL specified, have user try random text or example slides
 */
export default function RemoteMarkdownPage() {
  const [text, setText] = useState('');
  const [playback, setPlayback] = useState<null | SlideBundle>(null);
  const onTextChange = (newText: string, isManualEdit: boolean) => {
    if (isManualEdit || !text || newText === text || text === defaultSlideText) {
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
        <DefaultMeta title="Open URL | slides.ihate.work" />
        <PageContainer>
          <PageHeader />
          <div className="flex justify-center my-4 items-baseline">
            {text ? (
              <StartPlaybackButton disabled={!text} onClick={onStartPlayback} />
            ) : (
              <>
                Type some markdown text to start , or &nbsp;
                <Button variant="outlined" onClick={() => setText(defaultSlideText)}>
                  Load example slides
                </Button>
              </>
            )}
          </div>
          <MarkdownTextarea value={text} onChange={onTextChange} />
        </PageContainer>
      </>
    );
  }

  return (
    <>
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
        return;
      }
      if (!isUrl(markdownUrl)) {
        alert('Invalid URL');
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
