import { PropsWithChildren, useRef, useState } from 'react';
import { MarkdownTextarea } from './markdown-textarea';

interface MarkdownFormProps {
  initialValue: string;

  onStart(text: string): void;

  className?: string;
}

export const defaultSlideText = `

## Section 1

Slide 1

---

## Section 2
Slide 2-1

$$
i = \\sum_{i=1}^{k+1}i
$$

--

## Section 2
Slide 2-2

\`\`\`mermaid
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
\`\`\`

---

## Thanks for listening
    `.trim();

async function readFormValue(f: HTMLFormElement): Promise<string> {
  const textArea = f.querySelector('textarea[name=text]') as HTMLTextAreaElement;
  const fileInput = f.querySelector('input[name=file]') as HTMLInputElement;

  const file0 = fileInput.files?.[0];
  const slideSource = file0 ? await file0.text() : textArea.value;

  return slideSource;
}

export function MarkdownForm(props: PropsWithChildren<MarkdownFormProps>) {
  const [text, setText] = useState(props.initialValue);
  const onTextChange = (newText: string, isManualEdit: boolean) => {
    if (isManualEdit || !text || newText === props.initialValue) {
      setText(newText);
    } else if (confirm('Overwrite current input?')) {
      setText(newText);
    }
  };

  return <MarkdownTextarea value={text} onChange={onTextChange} showUploadButton={true} />;
}
