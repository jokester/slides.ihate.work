import debug from 'debug';
import { PropsWithChildren, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const logger = debug('src:iframe:framed-portal');

export function FramedPortal(props: PropsWithChildren) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [subdocBody, setSubdocBody] = useState<HTMLElement>(null!);

  useEffect(() => {
    logger('FramedPortal mounted', iframeRef.current);
    if (!iframeRef.current) return;

    const innerDoc = iframeRef.current.contentDocument!.body;

    setSubdocBody(innerDoc);
  }, []);

  const portal = subdocBody && createPortal(props.children, subdocBody);

  return (
    <iframe ref={iframeRef} loading="eager" src="/_internal/empty-iframe" style={{ width: '100vw', height: '100vh' }}>
      {portal}
    </iframe>
  );
}
