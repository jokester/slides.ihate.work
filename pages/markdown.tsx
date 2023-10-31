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
            <button type="submit">start</button>
          </label>
        </form>
      </div>
    </DefaultHtml>
  );
}
