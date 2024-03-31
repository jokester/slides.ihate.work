import { SlideBundle } from '../core/SlideBundle';

const _stateStorage = new Map<string, SlideBundle>();

export const bundleStorage = {
  put(v: SlideBundle): string {
    if (typeof window !== 'object') {
      throw new Error(`only for browser`);
    }
    const nonce = Math.random().toString(36).slice(2, 10);
    _stateStorage.set(nonce, v);
    return nonce;
  },
  get(nonce: string): null | SlideBundle {
    return _stateStorage.get(nonce) || null;
  },
} as const;
