export function DefaultHtml(props: { title?: string; children: any }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{props.title ?? 'TITLE'}</title>
        <link
          key="css-tailwind"
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
          integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </head>

      <body>{props.children}</body>
    </html>
  );
}
