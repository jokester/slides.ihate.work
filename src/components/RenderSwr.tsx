import { SWRResponse } from 'swr';
import { ReactElement } from 'react';
import { extractErrorMessage } from '../utils';

/**
 * @deprecated
 */
export function RenderSwr<Data, E>({
  res,
  children,
}: {
  res: SWRResponse<Data, E>;
  children(d: Data): ReactElement;
}): string | ReactElement {
  return useRenderSwr(res, children);
}

export function useRenderSwr<Data, E>(
  res: SWRResponse<Data, E>,
  onValue: (d: Data) => ReactElement,
): string | ReactElement {
  if (res.isLoading) {
    return 'Loading...';
  }
  if (res.error) {
    return extractErrorMessage(res.error);
  }
  return onValue(res.data!);
}
