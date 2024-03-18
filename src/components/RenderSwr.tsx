import { SWRResponse } from 'swr';
import { ReactElement } from 'react';

export function RenderSwr<Data, E>({
  res,
  children,
}: {
  res: SWRResponse<Data, E>;
  children(d: Data): ReactElement;
}): string | ReactElement {
  if (res.isLoading) {
    return 'Loading...';
  }
  if (res.error) {
    return `Error: ${(res.error as any as Error).message ?? ''}`;
  }
  return children(res.data!);
}
