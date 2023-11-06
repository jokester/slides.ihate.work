import { VNode } from 'preact';

const globalCss = `
body {
  min-height: 100%;
}
#root {
  height: 100%;
}
`;

export function Html(props: { title?: string; header?: VNode; children?: VNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{props.title ?? 'TITLE'}</title>
        <link
          key="css-tailwind"
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
          integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <style> {globalCss} </style>

        {props.header ?? null}
      </head>

      <body>
        <div id="root">{props.children}</div>
      </body>
    </html>
  );
}
