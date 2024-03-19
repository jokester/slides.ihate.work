import clsx from 'clsx';
import { Button } from '@mui/material';
import { FileUpload, FileOpen, PlayCircle } from '@mui/icons-material';

function OpenFileButton(props: { className?: string; onInput?(value: string): void }) {
  const onFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      props.onInput?.(text);
    };
    reader.readAsText(file);
  };

  return (
    <Button component="label" variant="outlined" tabIndex={-1} startIcon={<FileOpen />}>
      Open file
      <input className="hidden" type="file" onChange={onFileChange} accept=".md,.markdown,.txt,text/*" />
    </Button>
  );
}

export function MarkdownTextarea(props: {
  showUploadButton?: boolean;
  value: string;
  onChange(value: string, isManualEdit: boolean): void;
  className?: string;
  onStart?(markdownText: string): void;
}) {
  return (
    <div className={clsx('max-w-screen-lg mx-auto px-4', props.className)}>
      <form>
        <div className="">
          <label>
            <span className="text-lg">Markdown text:</span>
            <textarea
              className="w-full border p-1"
              name="text"
              rows={20}
              cols={80}
              value={props.value}
              onChange={(ev) => props.onChange(ev.target.value, true)}
            />
          </label>
        </div>
        <br />
        <label className="flex w-full justify-center items-center space-x-8">
          {props.showUploadButton ? <OpenFileButton onInput={(v) => props.onChange(v, false)} /> : null}
          <Button
            startIcon={<PlayCircle />}
            variant="outlined"
            className=""
            type="button"
            onClick={() => props.onStart?.(props.value)}
          >
            START
          </Button>
        </label>
      </form>
    </div>
  );
}
