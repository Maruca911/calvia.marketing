import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
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

