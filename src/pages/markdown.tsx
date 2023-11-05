import { useState } from 'preact/compat';
import { MarkdownForm } from '../markdown/markdown-form';
import { MarkdownSlides } from '../markdown/markdown-slides';

export function MarkdownPage() {
  const [text, setText] = useState('');

  return (
    <>
      <MarkdownForm onStart={setText} hidden={!!text} />
      <MarkdownSlides text={text} />
    </>
  );
}
