import { useRouter, useSearchParams } from 'next/navigation';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { rewriteToSourceSpecificRoute } from '../routes/url-rewrite';
import { isUrl } from '../core/url-loader';

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
        const externalAsset = await fetchText(markdownUrl);
        if (running.current && onRawFetched) {
          onRawFetched(externalAsset);
        }
      }
    },
    [markdownUrl],
  );
}

async function fetchText(url: string) {
  return (await fetch(url)).text();
}
