import { Button, Input, TextField } from '@mui/material';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { SlideBundle } from '../core/SlideBundle';
import { useToggle } from 'react-use';
import { detectSourceUrlType, isUrl, loadExternalSourceUrl } from '../core/url-loader';
import { extractErrorMessage } from '../utils';
import { GitHub } from '@mui/icons-material';

export function ExternalSourceInput(props: { onLoad?(bundle: SlideBundle): void }) {
  const [urlValue, setUrlValue] = useState('');
  const [loading, setLoading] = useToggle(false);
  const detectedType = detectSourceUrlType(urlValue);

  const onStartLoad = async () => {
    if (loading || !urlValue) {
      return;
    }
    try {
      setLoading(true);
      const loaded = await loadExternalSourceUrl(urlValue);
      props.onLoad?.(loaded);
    } catch (e) {
      console.error(e);
      alert(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-2">
      <div>
        <TextField
          className={clsx('w-full')}
          label="URL to load. Currently gist is supported"
          variant="outlined"
          value={urlValue}
          onChange={(ev) => setUrlValue(ev.target.value)}
          onKeyUp={(ev) => {
            if (ev.key === 'Enter') {
              onStartLoad();
            }
          }}
        />
      </div>
      <div className="flex flex-row justify-center">
        <Button
          type="button"
          className="mx-auto w-64"
          variant="outlined"
          color="primary"
          onClick={onStartLoad}
          aria-busy={loading}
          disabled={loading || !urlValue}
        >
          {
            loading ? (
              'Loading...'
            ) : !detectedType ? (
              'Load' // but disabled
            ) : detectedType === 'gist' ? (
              <>
                Load from Github Gist <GitHub />
              </>
            ) : detectedType === 'unknown' ? (
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
