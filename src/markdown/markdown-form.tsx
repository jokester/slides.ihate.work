import clsx from 'clsx';
import { Button } from '@mui/material';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';

interface MarkdownFormProps {
  onStart(text: string): void;
  className?: string;
}

const defaultSlideText = `

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
  const [loaded, setLoaded] = useState(true);
  useAsyncEffect(async (running) => {
    await import('./markdown-reveal');
    if (running.current) {
      setLoaded(true);
    }
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const onStart = () => {
    const f: HTMLFormElement = formRef.current!;
    readFormValue(f).then((v) => {
      props.onStart(v);
    });
  };

  return (
    <div className={clsx('w-full', props.className)}>
      <form ref={formRef}>
        <div className="sm:grid grid-cols-2 gap-1">
          <label className="flex sm:px-4 flex-col justify-center text-lg">
            1️⃣ Select a Markdown file:
            <input className="" type="file" name="file" accept=".md,.markdown,mime/markdown" />
          </label>
          <label>
            <span className="text-lg">2️⃣ Or, input some Markdown text:</span>
            <textarea className="w-full border p-1" name="text" rows={20} cols={80} defaultValue={defaultSlideText} />
          </label>
        </div>
        <br />
        <label className="flex w-full justify-center items-center">
          <Button variant="outlined" className="" type="button" onClick={onStart} disabled={!loaded}>
            and 3️⃣ START
          </Button>
        </label>
      </form>
    </div>
  );
}
