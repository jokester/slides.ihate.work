/**
 * A markdown viewer with reveal.js
 */
setTimeout(async function main() {
  const f = document.querySelector('form#markdown-form') as HTMLFormElement;

  (f.querySelector('button[type=submit]') as HTMLButtonElement).disabled = false;

  f.onsubmit = (ev) => {
    ev.preventDefault();
    console.debug(ev.target);
  };
});
