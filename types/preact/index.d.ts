import { HTMLAttributes } from 'preact/compat';
declare module 'preact' {
  export namespace JSX {
    export interface IntrinsicElements {
      'fluent-button': HTMLAttributes<HTMLButtonElement>;
    }
  }
}
