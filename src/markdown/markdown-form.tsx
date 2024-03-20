import { PropsWithChildren, useState } from 'react';
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

export function MarkdownForm(props: PropsWithChildren<MarkdownFormProps>) {
  const [text, setText] = useState(props.initialValue);
  const onTextChange = (newText: string, isManualEdit: boolean) => {
    if (isManualEdit || !text || newText === props.initialValue) {
      setText(newText);
    } else if (confirm('Overwrite current input?')) {
      setText(newText);
    }
  };

  return (
    <MarkdownTextarea
      value={text}
      onChange={onTextChange}
      showUploadButton={true}
      onStart={() => props.onStart(text)}
    />
  );
}
