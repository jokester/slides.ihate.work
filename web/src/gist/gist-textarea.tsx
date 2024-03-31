import { SlideBundle } from '../core/SlideBundle';
import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@mui/material';
import { MarkdownTextarea } from '../markdown/markdown-textarea';

export function GistTextarea(props: {
  bundle: SlideBundle;
  initialValue?: string;
  className?: string;
  onStart?(markdownText: string): void;
}): ReactElement {
  const [text, setText] = useState(props.initialValue || props.bundle.slideText);
  return <MarkdownTextarea value={text} onChange={setText} className={props.className} />;
}
