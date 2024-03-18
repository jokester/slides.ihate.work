import { useSearchParams, useRouter } from 'next/navigation';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { Route } from 'next';
import { GistSource } from '../core/GistSource';

export function useMarkdownUrlQuery(onRawFetched?: (x: string) => void) {
  const router = useRouter();
  const markdownUrl = useSearchParams().get('markdownUrl');
  useAsyncEffect(
    async (running) => {
      if (markdownUrl) {
        const redirect = buildInternalRedirectDest(markdownUrl);
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

export function buildInternalRedirectDest(url: string): null | Route | Error {
  const parsed = new GistSource(url).parseUrl();

  if (parsed?.gistId && !parsed?.revisionId) {
    return `/gist/${parsed.ownerId}/${parsed.gistId}`;
  }
  return null;
}

async function fetchText(url: string) {
  return (await fetch(url)).text();
}
