import { useState } from 'react';
import { DefaultMeta } from '../src/components/meta/default-meta';
import { MarkdownForm } from '../src/markdown/markdown-form';
import { RevealSlideWrapper } from '../src/player/reveal-slide-wrapper';
import { MarkdownHelp, PageContainer, PageFooter, PageHeader } from '../src/layouts';
import { useMarkdownUrlQuery } from '../src/hooks/use-external-url';

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
          <MarkdownForm onStart={onStartPlayback} />
          <MarkdownHelp />
          <div className="flex-grow flex-shrink-0" />
          <PageFooter />
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
