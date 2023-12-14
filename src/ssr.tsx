  mport { Context, MiddlewareHandler } from 'hono';
import { VNode, Component, FunctionComponent, createElement } from 'preact';
import { renderToString } from 'preact-render-to-string';
import { StatusCode } from 'hono/dist/types/utils/http-status';

export interface RouteResult {
  status?: number;
  Component?: Component;
  prependHtml?: string;
}

interface SsrConfig {
  route(
    path: string,
    pathParams: Record<string, string>,
    queries: Record<string, string[]>,
  ): RouteResult | Promise<RouteResult>;
  layout?(routeResult: RouteResult): Promise<VNode>;
  prependHtml?: string;
}

export function ssr(config: SsrConfig): MiddlewareHandler {
  return async (c, next) => {
    const path = new URL(c.req.url).pathname;
    const route = await config.route(path, c.req.param() as Record<string, string>, c.req.queries());

    if (!route.Component) {
      c.status(route.status ?? 404);
      return c.body('Not Found');
    }

    const prependHtml = route.prependHtml ?? config.prependHtml ?? '<!DOCTYPE html>';
    // @ts-expect-error FIXME
    const vnode = config.layout ? await config.layout(route) : createElement(route);
    const html = renderToString(vnode);
    c.status(route.status ?? 200);
    return c.body(prependHtml ? `${prependHtml}${html}` : html);
  };
}

interface SsrConfigSpa {
  app: FunctionComponent<SpaProps>;
  layout?(propsRendered: string, c: Context): VNode | Promise<VNode>;
}

interface SpaProps {
  path: string;
}

export function spaSsr(config: SsrConfigSpa): MiddlewareHandler {
  return async (c, next) => {
    const path = new URL(c.req.url).pathname;
    const appRendered = renderToString(createElement<SpaProps>(config.app, { path }) as VNode);
    let status: StatusCode = 200;
    if (!appRendered) {
      status = 404;
    }
    if (config.layout) {
      const layoutVNode = await config.layout(appRendered, c);
      const htmlRendered = renderToString(layoutVNode);
      return c.html(htmlRendered, status);
    } else {
      return c.html(appRendered, status);
    }
  };
}

interface SsrConfigStatic {
  prependHtml?: string;
  headers?: Record<string, string>;
}

export function ssrStatic(vnode: VNode, config?: SsrConfigStatic): MiddlewareHandler {
  return async (c, next) => {
    const prependHtml = config?.prependHtml ?? '<!DOCTYPE html>';
    const html = renderToString(vnode);
    return c.html(prependHtml ? `${prependHtml}${html}` : html, 200, config?.headers);
  };
}
