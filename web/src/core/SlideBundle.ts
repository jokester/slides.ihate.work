import { GistSource } from './GistSource';
import { FetchTextSource } from './FetchTextSource';

export interface SlideBundle {
  // markdown text
  slideText: string;
  fetchTextSource?: FetchTextSource;
  localTextSource?: Blob;
  gistSource?: GistSource;
}
