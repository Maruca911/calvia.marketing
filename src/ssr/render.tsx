import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
// react-router-dom@7.x no longer exports the /server subpath in a way that works with Node ESM "exports".
// Import server primitives from react-router (installed as a dependency of react-router-dom).
import { StaticRouter } from 'react-router';
import AppShell from '../AppShell';

export function render(url: string) {
  const helmetContext: any = {};

  const app = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </HelmetProvider>
  );

  const html = renderToString(app);
  const helmet = helmetContext.helmet;

  const head = [
    helmet?.title?.toString?.() ?? '',
    helmet?.meta?.toString?.() ?? '',
    helmet?.link?.toString?.() ?? '',
    helmet?.script?.toString?.() ?? '',
  ]
    .filter(Boolean)
    .join('\n');

  return { html, head };
}
