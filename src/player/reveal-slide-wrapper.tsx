import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { wait } from '@jokester/ts-commonutil/lib/concurrency/timing';
import { filter, fromEvent, merge, scan, tap } from 'rxjs';
import debug from 'debug';
import { Button } from '@mui/material';

const logger = debug('src:player:reveal-slide-wrapper');

interface RevealSlideWrapperProps {
  text: string;
  onDestroy?(): void;
}

function useEscDoubleclick({ onDestroy }: RevealSlideWrapperProps, iframeRef: RefObject<HTMLIFrameElement>): void {
  useAsyncEffect(
    async (running, released) => {
      if (!onDestroy) {
        return;
      }
      while (!iframeRef.current) {
        await wait(0.1e3);
        if (!running.current) {
          return;
        }
      }
      const $keyup1 = fromEvent<KeyboardEvent>(document, 'keyup');
      const $keyup2 = fromEvent<KeyboardEvent>(iframeRef.current.contentDocument!, 'keyup');

      const $escape = merge($keyup1, $keyup2).pipe(
        tap((ev) => {
          logger('key pressed', ev);
        }),
        filter((e) => e.key === 'Escape'),
        scan((acc, _) => acc + 1, 0),
        tap((value) => {
          logger('escape key pressed %d times', value);
        }),
      );

      const s = $escape.subscribe((count) => {
        if (count >= 2) {
          onDestroy();
        }
      });
      logger('useEscDoubleclick', s);

      released.then(() => s.unsubscribe());
    },
    [iframeRef, onDestroy],
  );
}

export function RevealSlideWrapper(props: RevealSlideWrapperProps) {
  const [assetUrl, setAssetUrl] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEscDoubleclick(props, iframeRef);

  useAsyncEffect(
    async (running) => {
      if (props.text) {
        const blob = new Blob([props.text], { type: 'text/markdown' });
        // FIXME: free this allocation
        const url = URL.createObjectURL(blob);
        setAssetUrl(url);

        await wait(5e3);
        if (!running.current) {
          return;
        }
        // props.onDestroy?.();
      }
    },
    [props.text],
  );

  const iframeUrl = useMemo(() => {
    if (!assetUrl) {
      return '';
    }
    return `/_internal/reveal-player?url=${encodeURIComponent(assetUrl)}`;
  }, [assetUrl]);

  if (iframeUrl) {
    return (
      <>
        <div className="absolute left-0 top-0 p-4 hidden hover:inline-block">
          <Button type="button" onClick={props.onDestroy}>
            Close
          </Button>
        </div>
        <iframe ref={iframeRef} key={iframeUrl} style={{ width: '100vw', height: '100vh' }} src={iframeUrl} />
      </>
    );
  }

  return null;
}
