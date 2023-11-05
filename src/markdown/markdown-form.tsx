import { PropsWithChildren, useEffect, useRef, useState } from 'preact/compat';

export interface MarkdownFormProps {
  onStart(text: string): void;
  hidden: boolean;
}

const defaultSlideText = `

## Section 1

Slide 1

---

## Section 2
Slide 2-1

--

## Section 2
Slide 2-2

---

## Demo 1
Slide 3
    `.trim();

async function readFormValue(f: HTMLFormElement): Promise<string> {
  const textArea = f.querySelector('textarea[name=text]') as HTMLTextAreaElement;
  const fileInput = f.querySelector('input[name=file]') as HTMLInputElement;

  const file0 = fileInput.files?.[0];
  const slideSource = file0 ? await file0.text() : textArea.value;

  return slideSource;
}
export function MarkdownForm(props: PropsWithChildren<MarkdownFormProps>) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const onStart = () => {
    const f: HTMLFormElement = formRef.current!;
    readFormValue(f).then((v) => {
      props.onStart(v);
    });
  };

  return (
    <div hidden={props.hidden}>
      <form ref={formRef}>
        <label>
          File
          <input type="file" name="file" />
        </label>
        <label>
          OR: Markdown Text
          <textarea name="text" rows={10} cols={80} value={defaultSlideText} />
        </label>
        <label>
          <fluent-button type="button" disabled={!loaded} onClick={onStart}>
            {loaded ? 'START' : 'Loading...'}
          </fluent-button>
        </label>
      </form>
    </div>
  );
}
