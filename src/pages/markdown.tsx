import { useState } from 'preact/compat';
import { MarkdownForm } from '../markdown/markdown-form';
import { MarkdownSlides } from '../markdown/markdown-slides';

export function MarkdownPage() {
  const [text, setText] = useState('');

  return (
    <>
      {!text && <MarkdownForm onStart={setText} hidden={!!text} />}
      {text && <MarkdownSlides text={text} />}
    </>
  );
}
