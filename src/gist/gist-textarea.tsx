import { SlideBundle } from '../core/SlideBundle';
import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@mui/material';

export function GistTextarea(props: {
  bundle: SlideBundle;
  initialValue?: string;
  className?: string;
  onStart?(markdownText: string): void;
}): ReactElement {
  const [text, setText] = useState(props.initialValue || props.bundle.slideText);
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
              value={text}
              onChange={(ev) => setText(ev.target.value)}
            />
          </label>
        </div>
        <br />
        <label className="flex w-full justify-center items-center">
          <Button variant="outlined" className="" type="button" onClick={() => props.onStart?.(text)}>
            START
          </Button>
        </label>
      </form>
    </div>
  );
}
