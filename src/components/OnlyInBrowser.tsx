import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';

export function OnlyInBrowser(props: PropsWithChildren): ReactElement {
  const [inBrowser, setInBrowser] = useState(false);
  useEffect(() => {
    setInBrowser(true);
  }, []);
  return <>{inBrowser && props.children}</>;
}
