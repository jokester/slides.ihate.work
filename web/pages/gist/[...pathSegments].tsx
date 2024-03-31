import debug from 'debug';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { GistSource, GistSourceLocator } from '../../src/core/GistSource';
import useSWR from 'swr';
import { GistTextarea } from '../../src/gist/gist-textarea';
import { PageContainer, PageHeader } from '../../src/layouts';
import { RevealSlidePlayer } from '../../src/player/reveal-slide-player';
import { useRenderSwr } from '../../src/components/useRenderSwr';

const logger = debug('pages:gist');

function GistSourcePageContent({ src }: { src: GistSource }) {
  const fetched = useSWR(src.fetchKey, async () => src.fetchSource());
  // local modified text
  const [text, setText] = useState('');
  const [playback, setPlayback] = useState(false);
  const onStartPlayback = (newText: string) => {
    setText(newText);
    setPlayback(true);
  };

  const textArea = useRenderSwr(fetched, (v) => (
    <GistTextarea bundle={v} initialValue={text} onStart={onStartPlayback} />
  ));

  logger(src, fetched);

  if (!playback) {
    return (
      <PageContainer>
        <PageHeader />
        {textArea}
      </PageContainer>
    );
  }

  return (
    <>
      <RevealSlidePlayer listenEscDblclick onDestroy={() => setPlayback(false)} text={text} />
    </>
  );
}

export default function GistPresentPage() {
  const router = useRouter();

  const [src, setSrc] = useState<GistSource | Error | null>(null);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    try {
      const url = new URL(location.href);
      url.pathname = url.pathname.slice('/gist'.length);
      const src = new GistSource(url);
      setSrc(src);
    } catch (e: any) {
      const err = new Error(e?.message || 'error', {
        cause: e,
      });
      setSrc(err);
    }
  }, [router, router.isReady]);

  if (!src) {
    return <div>Loading...</div>;
  }

  if (src instanceof Error) {
    return <div>Error: {src.message}</div>;
  }

  return <GistSourcePageContent key={src.fetchKey} src={src} />;
}
