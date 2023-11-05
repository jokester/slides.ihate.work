/**
 * A markdown viewer with reveal.js
 */

import { Marp } from '@marp-team/marp-core';
import { browser } from '@marp-team/marp-core/browser';

async function tryMarp() {
  const marpRender = document.querySelector('div#marp-render') as HTMLDivElement;

  const marp = new Marp({ script: false });

  const { html, css } = await marp.render('---\nmarp: true\n---\n# Hello, Marp!');
  marpRender.innerHTML = `${html}<style>{css}</style>`;
  browser(marpRender);
}
