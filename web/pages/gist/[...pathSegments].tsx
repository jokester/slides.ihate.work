import debug from 'debug';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GistSource } from '../../src/core/GistSource';
import useSWR from 'swr';
import { GistTextarea } from '../../src/gist/gist-textarea';
import { PageContainer, PageHeader } from '../../src/layouts';
import { RevealSlidePlayer } from '../../src/player/reveal-slide-player';
import { useRenderSwr } from '../../src/components/useRenderSwr';
import clsx from 'clsx';
import { StartPlaybackButton } from '../../src/markdown/markdown-textarea';

const logger = debug('pages:gist');

function GistSourcePageContent({ src }: { src: GistSource }) {
  const fetched = useSWR(src.fetchKey, async () => src.fetchSource());
  const [text, setText] = useState('');
  const [playback, setPlayback] = useState(false);
  const onStartPlayback = (newText: string) => {
    setText(newText);
    setPlayback(true);
  };

  const textArea = useRenderSwr(fetched, (v) => (
    <>
      <div className={clsx('flex justify-center my-4 items-center', { ['space-x-12']: text })}>
        <StartPlaybackButton onClick={() => onStartPlayback(v.slideText)} />
      </div>
      <GistTextarea bundle={v} initialValue={text} onStart={onStartPlayback} />
      {v.gistSource && (
        <div>
          Original Gist:&nbsp;
          <a className="text-xs underline" href={v.gistSource.asUpstreamUrl()} target="_blank">
            {v.gistSource.asUpstreamUrl()}
          </a>
        </div>
      )}
    </>
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
    return (
      <PageContainer>
        <PageHeader />
        <div>Loading...</div>
      </PageContainer>
    );
  }

  if (src instanceof Error) {
    return (
      <PageContainer>
        <PageHeader />
        <div>Error: {src.message}</div>
      </PageContainer>
    );
  }

  return <GistSourcePageContent key={src.fetchKey} src={src} />;
}
