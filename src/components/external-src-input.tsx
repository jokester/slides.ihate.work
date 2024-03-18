import { Button, Input, TextField } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

export function ExternalSourceInput(props: { onSubmit?(url: string): void }) {
  const [value, setValue] = useState('');
  const onSubmit = () => {
    if (!value) {
      return;
    }
    props.onSubmit?.(value);
  };
  return (
    <div className="flex flex-row space-x-4">
      <TextField
        className={clsx('flex-1')}
        label="URL of gist or any URL of the markdown content"
        variant="outlined"
        value={value}
        onKeyUp={(ev) => {
          if (ev.key === 'Enter') {
            onSubmit();
          }
        }}
        onChange={(ev) => setValue(ev.target.value)}
      />
      <Button type="button" variant="outlined" onClick={onSubmit} disabled={!value}>
        Load
      </Button>
    </div>
  );
}
