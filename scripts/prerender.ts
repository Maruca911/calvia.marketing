import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

import { render } from '../src/ssr/render';
import { PUBLISHED_ARTICLES } from '../src/content/articles';
import { CATEGORIES } from '../src/content/categories';

const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/knowledge-base',
  '/qa',
  '/contact',
  '/privacy',
  '/editorial-policy',
];

function routeToFile(distDir: string, route: string): string {
  if (route === '/') return resolve(distDir, 'index.html');
  const clean = route.replace(/^\/+/, ''); // remove leading slash
  return resolve(distDir, clean, 'index.html');
}

function inject(template: string, head: string, bodyHtml: string): string {
  const rootMarker = '<div id="root"></div>';
  if (!template.includes(rootMarker)) {
    throw new Error('prerender: expected index.html to include <div id="root"></div>');
  }

  let out = template.replace(rootMarker, `<div id="root">${bodyHtml}</div>`);

  if (head) {
    out = out.replace('</head>', `${head}\n</head>`);
  }

  return out;
}

function main() {
  const distDir = resolve(process.cwd(), 'dist');
  const templatePath = resolve(distDir, 'index.html');
  const template = readFileSync(templatePath, 'utf-8');

  const categoryRoutes = CATEGORIES.map((c) => `/category/${c.slug}`);
  const articleRoutes = PUBLISHED_ARTICLES.map((a) => `/article/${a.slug}`);

  const routes = Array.from(
    new Set([...STATIC_ROUTES, ...categoryRoutes, ...articleRoutes])
  );

  for (const route of routes) {
    const { html, head } = render(route);
    const out = inject(template, head, html);

    const outPath = routeToFile(distDir, route);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, out, 'utf-8');
  }

  // eslint-disable-next-line no-console
  console.log(`Prerendered ${routes.length} routes into dist/`);
}

main();

