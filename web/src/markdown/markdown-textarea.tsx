import clsx from 'clsx';
import { Button } from '@mui/material';
import { FileOpen, PlayCircle, Clear } from '@mui/icons-material';
import { ChangeEvent, MutableRefObject, RefObject, useState } from 'react';
import { SlideBundle } from '../core/SlideBundle';
import { PropsOf } from '@emotion/react';

export function useSlideFileInput(inputRef?: RefObject<HTMLInputElement>) {
  const [loading, setLoading] = useState(false);

  async function load(f?: File): Promise<null | SlideBundle> {
    if (!f) {
      return null;
    }

    setLoading(true);

    try {
      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onabort = reject;
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result as string);
        reader.readAsText(f);
      });

      return {
        slideText: text,
        localTextSource: f,
      };
    } finally {
      setLoading(false);
    }
  }

  function clean() {
    if (inputRef?.current) {
      inputRef.current.value = '';
    }
  }

  return {
    loading,
    setLoading,
    load,
    clean,
  } as const;
}

export function OpenFileButton(props: {
  className?: string;
  onInput?(value: SlideBundle): void;
  inputRef?: RefObject<HTMLInputElement>;
}) {
  const handler = useSlideFileInput();

  const onFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
    handler.load(ev.target.files?.[0]).then((v) => v && props.onInput?.(v));
  };

  return (
    <Button component="label" variant="outlined" startIcon={<FileOpen />}>
      Open file
      <input className="hidden" type="file" ref={props.inputRef} onChange={onFileChange} accept=".md,.markdown,.txt,text/*" />
    </Button>
  );
}

export function StartPlaybackButton(props: PropsOf<typeof Button> & { children?: string }) {
  return (
    <Button startIcon={<PlayCircle />} variant="outlined" type="button" {...props}>
      {props.children ?? 'Start Presentation'}
    </Button>
  );
}

export function ClearButton(props: PropsOf<typeof Button> & { children?: string }) {
  return (
    <Button startIcon={<Clear />} variant="outlined" type="button" {...props}>
      {props.children ?? 'Clear'}
    </Button>
  );
}

export function MarkdownTextarea(props: {
  value: string;
  onChange(value: string, isManualEdit: boolean): void;
  className?: string;
  readOnly?: boolean;
}) {
  return (
    <div className={clsx('max-w-screen-lg mx-auto px-4', props.className)}>
      <textarea
        className="w-full border p-1"
        name="text"
        rows={20}
        cols={80}
        value={props.value}
        readOnly={props.readOnly}
        onChange={(ev) => props.onChange(ev.target.value, true)}
      />
    </div>
  );
}
