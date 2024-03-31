import React, { useState } from 'react';
import { SlideBundle } from '../src/core/SlideBundle';
import { defaultSlideText } from '../src/markdown/markdown-form';
import { DefaultMeta } from '../src/components/meta/default-meta';
import { PageContainer, PageHeader } from '../src/layouts';
import { ClearButton, MarkdownTextarea, OpenFileButton, StartPlaybackButton } from '../src/markdown/markdown-textarea';
import { RevealSlidePlayer } from '../src/player/reveal-slide-player';
import clsx from 'clsx';

export default function LocalMarkdownPage() {
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

  if (!playback) {
    return (
      <PageContainer>
        <DefaultMeta title="Open File | slides.ihate.work" />
        <PageHeader />
        <div className={clsx('flex justify-center my-4 items-center', { ['space-x-12']: text })}>
          {text ? (
            <>
              <StartPlaybackButton disabled={!text} onClick={onStartPlayback} />
              <ClearButton variant={undefined} onClick={() => setText('')} />
            </>
          ) : (
            <>
              <OpenFileButton onInput={(v) => setText(v.slideText)} />
              &nbsp; or type slide text
            </>
          )}
        </div>
        <MarkdownTextarea value={text} onChange={onTextChange} />
      </PageContainer>
    );
  }
  return <RevealSlidePlayer listenEscDblclick onDestroy={() => setPlayback(null)} bundle={playback} />;
}
