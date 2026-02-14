import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
// For prerendering we can use MemoryRouter (no DOM dependency, no /server deep import).
import { MemoryRouter } from 'react-router-dom';
import AppShell from '../AppShell';

export function render(url: string) {
  const helmetContext: any = {};

  const app = (
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <AppShell />
      </MemoryRouter>
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
