import { SWRResponse } from 'swr';
import { ReactElement } from 'react';
import { extractErrorMessage } from '../utils';

function _renderError<Data, E>(swrError: SWRResponse<Data, E>['error']): string | ReactElement {
  return extractErrorMessage(swrError);
}

export function useRenderSwr<Data, E>(
  res: SWRResponse<Data, E>,
  onValue: (d: Data) => ReactElement,
  renderError: typeof _renderError = _renderError,
): string | ReactElement {
  if (res.isLoading) {
    return 'Loading...';
  }
  if (res.error) {
    return renderError(res.error);
  }
  return onValue(res.data!);
}
