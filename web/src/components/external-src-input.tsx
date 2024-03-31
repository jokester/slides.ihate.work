import { Button, IconButton, Input, TextField } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';
import { detectSourceUrlType, isUrl } from '../core/url-loader';
import { GitHub, Clear, Http } from '@mui/icons-material';

export function ExternalSourceInput(props: { onSubmit?(url: string): void }) {
  const [urlValue, setUrlValue] = useState('');
  const urlType = detectSourceUrlType(urlValue);

  const onSubmit = () => {
    if (urlType === 'unknown') {
      alert('Invalid URL');
      return;
    }
    props.onSubmit?.(urlValue);
  };

  return (
    <div className="space-y-2">
      <div>
        <TextField
          className={clsx('w-full')}
          label="URL of markdown slide text"
          variant="outlined"
          value={urlValue}
          onChange={(ev) => setUrlValue(ev.target.value)}
          onKeyUp={(ev) => {
            if (ev.key === 'Enter') {
              onSubmit();
            }
          }}
          InputProps={{
            endAdornment: urlValue && (
              <IconButton size="small" onClick={() => setUrlValue('')}>
                <Clear />
              </IconButton>
            ),
          }}
        />
      </div>
      <div className="flex flex-row justify-center">
        <Button
          type="button"
          className="mx-auto w-64"
          variant="outlined"
          color="primary"
          onClick={onSubmit}
          disabled={!urlValue}
        >
          {
            urlType === 'gist' ? (
              <>
                Load from Gist &nbsp;
                <GitHub />
              </>
            ) : urlType === 'unknown' ? (
              'Load Raw URL'
            ) : (
              'Load'
            ) // fallback
          }
        </Button>
      </div>
    </div>
  );
}
