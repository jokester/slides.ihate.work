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
  reset: (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/dist/reset.css"
      integrity="sha256-GqjoTJyry/5NlbGYef5IucLF5tVFdMvmebwi7bn+ErY="
      crossOrigin="anonymous"
    />
  ),
  base: (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/dist/reveal.css"
      integrity="sha256-kn0GsHm3VJbbHu3LH5BQYg//SYDTkhbrHsseRTZgTz0="
      crossOrigin="anonymous"
    />
  ),
  white: (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/dist/theme/white.css"
      integrity="sha256-WqOk5DDwjhWKLU+Yp/xxhPXvNlWUK7U7qGhj/JNqLPA="
      crossOrigin="anonymous"
    />
  ),
  simple: (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/dist/theme/simple.css"
      integrity="sha256-BYbhkIKkrDAzklCmlvqhvE11+kJhqINHgrGzQOAEdMg="
      crossOrigin="anonymous"
    />
  ),
  black: (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/dist/theme/black.css"
      integrity="sha256-u7b1ew+/UCV5esol+6xydfpMhXWOxKlNzz3+H+UQ6H8="
      crossOrigin="anonymous"
    />
  ),
} as const;

export const revealCodeThemes = {
  monokai: (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/plugin/highlight/monokai.css"
      integrity="sha256-UE5RMUFE8/gycVXcaVAroQsaSZGuTMP6cAhs8VVGWZk="
      crossOrigin="anonymous"
    />
  ),
  zenburn: (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.1/plugin/highlight/zenburn.css"
      integrity="sha256-uhRpp9AZTJyimq9K0zQf/uW/u1g/IvBiDiXpGpqEZDE="
      crossOrigin="anonymous"
    />
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
