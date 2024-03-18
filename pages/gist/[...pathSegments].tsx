import debug from 'debug';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { GistSource } from '../../src/core/GistSource';
import useSWR from 'swr';
import { RenderSwr } from '../../src/components/RenderSwr';
import { GistTextarea } from '../../src/gist/gist-textarea';
import { DefaultMeta } from '../../src/components/meta/default-meta';
import { PageHeader } from '../../src/layouts';
import { RevealSlideWrapper } from '../../src/player/reveal-slide-wrapper';

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

  logger(src, fetched);

  if (!playback) {
    return (
      <div>
        <RenderSwr res={fetched}>
          {(v) => (
            <>
              <DefaultMeta title="slides.ihate.work" />
              <PageHeader />
              <GistTextarea bundle={v} initialValue={text} onStart={onStartPlayback} />
            </>
          )}
        </RenderSwr>
      </div>
    );
  }

  return (
    <>
      <DefaultMeta title="slides.ihate.work" />
      <RevealSlideWrapper onDestroy={() => setPlayback(false)} text={text} />
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
      const src = new GistSource(url.toString());
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
