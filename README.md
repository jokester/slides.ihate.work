# slides.ihate.work

A site to show slides with reveal.js

## Run in local

```
yarn
yarn dev
```

## Preview before deploying to CF Worker

```
yarn wrangler publish --dry-run --outdir=./worker-preview --minify=true
```

## Run in Cloudflare Worker

Set `env.prod.route` in `wrangler.toml` and run:

```
yarn build
yarn wrangler publish --minify=true
```
