import { cloneElement } from 'react';
import Head from 'next/head';

export const cssLinks = {
  tailwind2: (
    <link
      key="css-tailwind"
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
      integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  ),
};

export const revealThemes = {
  reset: <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/dist/reset.min.css" />,
  base: <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/dist/reveal.min.css" />,
  white: <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/dist/theme/white.min.css" />,
  simple: <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/dist/theme/simple.min.css" />,
  black: <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/dist/theme/black.min.css" />,
} as const;

export const revealCodeThemes = {
  monokai: (
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/plugin/highlight/monokai.min.css" />
  ),
  zenburn: (
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/plugin/highlight/zenburn.min.css" />
  ),

  docco: (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/docco.min.css"
      integrity="sha256-f00Sea6GJsgCmYG/ihG88J4oJkrA1MpWWVm0EZPCXyw="
      crossOrigin="anonymous"
    />
  ),
} as const;

export type RevealThemeKey = Exclude<keyof typeof revealThemes, 'reset' | 'base'>;
export type RevealCodeThemeKey = keyof typeof revealCodeThemes;

export function RevealStylesheets(props: { theme?: RevealThemeKey; codeTheme?: RevealCodeThemeKey }) {
  const base = cloneElement(revealThemes.base, { key: 'reveal-base' });
  const revealTheme = cloneElement(revealThemes[props.theme ?? 'simple'], { key: 'reveal-theme' });
  const codeTheme = cloneElement(revealCodeThemes[props.codeTheme ?? 'docco'], { key: 'reveal-code-theme' });
  return (
    <Head>
      {base}
      {revealTheme}
      {codeTheme}
    </Head>
  );
}
