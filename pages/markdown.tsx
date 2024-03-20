import { useState } from 'react';
import { DefaultMeta } from '../src/components/meta/default-meta';
import { MarkdownForm, defaultSlideText } from '../src/markdown/markdown-form';
import { RevealSlideWrapper } from '../src/player/reveal-slide-wrapper';
import { MarkdownHelp, PageContainer, PageFooter, PageHeader } from '../src/layouts';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { isUrl } from '../src/core/url-loader';
import { rewriteToSourceSpecificRoute } from '../src/routes/url-rewrite';
import { extractErrorMessage } from '../src/utils';

/**
 * /markdown page
 * for markdown input from textarea / file / general external URL
 */
export default function MarkdownPage() {
  const [text, setText] = useState('');
  const [playback, setPlayback] = useState(false);
  const onStartPlayback = (newText: string) => {
    setText(newText);
    setPlayback(true);
  };
  useMarkdownUrlQuery(onStartPlayback);

  if (!playback) {
    return (
      <>
        <DefaultMeta title="slides.ihate.work" />
        <PageContainer>
          <PageHeader />
          <MarkdownForm onStart={onStartPlayback} initialValue={text || defaultSlideText} />
          <MarkdownHelp />
          <div className="flex-grow flex-shrink-0" />
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <DefaultMeta title="slides.ihate.work" />
      <RevealSlideWrapper onDestroy={() => setPlayback(false)} text={text} />
    </>
  );
}

/**
 * handle `?markdownUrl=...` query
 */
export function useMarkdownUrlQuery(onRawFetched?: (x: string) => void) {
  const router = useRouter();
  const markdownUrl = useSearchParams().get('markdownUrl');
  useAsyncEffect(
    async (running) => {
      if (markdownUrl && isUrl(markdownUrl)) {
        const redirect = rewriteToSourceSpecificRoute(markdownUrl);
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
          if (running.current && onRawFetched) {
            onRawFetched(externalAsset);
          }
        } catch (e: unknown) {
          console.error(e);
          alert(extractErrorMessage(e));
        }
      }
    },
    [markdownUrl],
  );
}
