export function extractErrorMessage(e: any): string {
  if (e instanceof Error) {
    return e.message;
  }
  if (typeof e === 'string') {
    return e;
  }
  return e?.message ?? e?.code ?? 'error occurred';
}
