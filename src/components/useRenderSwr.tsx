import { SWRResponse } from 'swr';
import { ReactElement } from 'react';
import { extractErrorMessage } from '../utils';

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
