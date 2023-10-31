import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { Bindings } from './bindings';
import { serveStatic } from 'hono/cloudflare-workers';
import { IndexPage } from './pages';
import { MarkdownPage } from './pages/markdown';

const app = new Hono<{ Bindings: Bindings }>({});
app.use('*', logger());

app.get('/*', serveStatic({ root: /* relative to bucket in wrangler.toml */ '.' }));

app.get('/', (c) => c.html(<IndexPage />));
app.get('/markdown', (c) => c.html(<MarkdownPage />, {}));

export default app;
