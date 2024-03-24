import { filter, fromEvent, Observable, scan, tap } from 'rxjs';
import debug from 'debug';

const logger = debug('src:player:reveal-slide-wrapper');

export function createKeyUpObservable(elem: Document | HTMLElement, keyOrKeyCode?: string | number) {
  const $keyup = fromEvent<KeyboardEvent>(elem, 'keyup');
  return $keyup.pipe(
    tap((ev) => {
      logger('key pressed', elem, ev);
    }),
    filter((e) => e.key === keyOrKeyCode || e.code === keyOrKeyCode),
  );
}

export function createRecentObservable<T>(
  source: Observable<T>,
  len: number,
): Observable<{ values: T[]; times: number[] }> {
  return source.pipe(
    scan<T, { values: T[]; times: number[] }>(
      (acc, value) => {
        const { values, times } = acc;
        return { values: [value, ...values].slice(0, len), times: [Date.now(), ...times].slice(0, len) };
      },
      { values: [], times: [] },
    ),
  );
}
