import { DefaultHtml } from './_layout';

export function MarkdownPage() {
  return (
    <DefaultHtml>
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
      <script src="/static/markdown.js" defer></script>
    </DefaultHtml>
  );
}
