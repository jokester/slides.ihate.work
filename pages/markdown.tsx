import { DefaultHtml } from './_layout';
import { Fragment } from 'hono/jsx';

export function MarkdownPage2() {
  return (
    <DefaultHtml>
      <div style="display: flex; width: 1000px; height: 600px">
        <textarea id="md" style="flex: 1; resize: none"></textarea>
        <div id="marp-render" style="flex: 1; overflow-y: auto"></div>
      </div>
      <div>
        <form id="markdown-form">
          <label>
            File
            <input type="file" name="file" />
          </label>
          <label>
            <button type="submit" disabled>
              start
            </button>
          </label>
        </form>
      </div>
      <script src="/static/markdown-reveal.js" defer></script>
    </DefaultHtml>
  );
}

const header = (
  <Fragment>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/dist/reset.css"
      integrity="sha256-GqjoTJyry/5NlbGYef5IucLF5tVFdMvmebwi7bn+ErY="
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/dist/reveal.css"
      integrity="sha256-kn0GsHm3VJbbHu3LH5BQYg//SYDTkhbrHsseRTZgTz0="
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/dist/theme/black.css"
      integrity="sha256-u7b1ew+/UCV5esol+6xydfpMhXWOxKlNzz3+H+UQ6H8="
      crossorigin="anonymous"
    />
  </Fragment>
);
export function MarkdownPage() {
  const text = `
## Demo 1
Slide 1
---
## Demo 1
Slide 2
---
## Demo 1
Slide 3
    `.trim();
  return (
    <DefaultHtml header={header}>
      <div class="reveal">
        <div class="slides">
          <section data-markdown="">
            <script type="text/template">{text}</script>
          </section>
        </div>
      </div>
      <div>
        <form id="markdown-form">
          <label>
            File
            <input type="file" name="file" />
          </label>
          <label>
            <button type="submit" disabled>
              start
            </button>
          </label>
        </form>
      </div>
      <script src="/static/markdown-reveal.js" defer></script>
    </DefaultHtml>
  );
}
