import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

import {
  DEFAULT_AUTHOR,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from '../src/lib/site';
import { PUBLISHED_ARTICLES, getArticleBySlug, getArticlesByCategory } from '../src/content/articles';
import { CATEGORIES, getCategoryBySlug } from '../src/content/categories';
import { QA_ITEMS } from '../src/content/qa';

function escapeAttr(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function isoDate(date?: string): string | undefined {
  if (!date) return undefined;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function routeToFile(distDir: string, route: string): string {
  if (route === '/') return resolve(distDir, 'index.html');
  const clean = route.replace(/^\/+/, '');
  return resolve(distDir, clean, 'index.html');
}

function isNonProductionDeploy(): boolean {
  // Netlify sets CONTEXT=production|deploy-preview|branch-deploy.
  const ctx = process.env.CONTEXT;
  return Boolean(ctx && ctx !== 'production');
}

function buildSeoHead(opts: {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: object[];
}): string {
  const {
    title,
    description,
    canonical,
    keywords = DEFAULT_KEYWORDS,
    image = DEFAULT_OG_IMAGE,
    type = 'website',
    author = DEFAULT_AUTHOR,
    publishedTime,
    modifiedTime,
    schema = [],
  } = opts;

  const robots = isNonProductionDeploy()
    ? 'noindex,nofollow'
    : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

  const safeTitle = escapeAttr(title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`);
  const safeDesc = escapeAttr(description);
  const safeCanonical = escapeAttr(canonical);
  const safeKeywords = escapeAttr(keywords);
  const safeImage = escapeAttr(image);
  const safeAuthor = escapeAttr(author);

  const meta = [
    `<title>${safeTitle}</title>`,
    `<meta name="description" content="${safeDesc}" />`,
    `<meta name="keywords" content="${safeKeywords}" />`,
    `<meta name="author" content="${safeAuthor}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${safeCanonical}" />`,

    `<meta property="og:title" content="${safeTitle}" />`,
    `<meta property="og:description" content="${safeDesc}" />`,
    `<meta property="og:image" content="${safeImage}" />`,
    `<meta property="og:image:alt" content="${safeTitle}" />`,
    `<meta property="og:url" content="${safeCanonical}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${safeTitle}" />`,
    `<meta name="twitter:description" content="${safeDesc}" />`,
    `<meta name="twitter:image" content="${safeImage}" />`,
    `<meta name="twitter:image:alt" content="${safeTitle}" />`,
  ];

  if (publishedTime) meta.push(`<meta property="article:published_time" content="${escapeAttr(publishedTime)}" />`);
  if (modifiedTime) meta.push(`<meta property="article:modified_time" content="${escapeAttr(modifiedTime)}" />`);
  if (author) meta.push(`<meta property="article:author" content="${safeAuthor}" />`);

  for (const s of schema) {
    // Don't HTML-escape JSON; only neutralize `<` to prevent tag breaks.
    const json = JSON.stringify(s).replace(/</g, '\\u003c');
    meta.push(`<script type="application/ld+json">${json}</script>`);
  }

  return meta.join('\n');
}

function renderHeader(): string {
  return `
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <a href="/" class="flex items-center gap-3 group">
            <div class="flex flex-col">
              <span class="font-heading font-bold text-xl text-neutral-black">${escapeAttr(SITE_NAME)}</span>
              <span class="text-xs text-neutral-grey hidden sm:block">Digital Marketing Insights for Mallorca</span>
            </div>
          </a>
          <nav class="hidden lg:flex items-center gap-8">
            <a class="font-medium transition-colors relative text-neutral-grey hover:text-neutral-black" href="/knowledge-base">Knowledge Base</a>
            <a class="font-medium transition-colors relative text-neutral-grey hover:text-neutral-black" href="/qa">Q&amp;A</a>
            <a class="font-medium transition-colors relative text-neutral-grey hover:text-neutral-black" href="/contact">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  `;
}

function renderFooter(): string {
  const year = new Date().getFullYear();
  return `
    <footer class="bg-neutral-black text-neutral-grey-light mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="col-span-1 md:col-span-2">
            <a href="/" class="flex items-center gap-3 mb-4 group">
              <span class="font-heading font-bold text-xl text-white">${escapeAttr(SITE_NAME)}</span>
            </a>
            <p class="text-sm mb-4 max-w-md">
              Free, citation-backed marketing knowledge for Calvià and Mallorca businesses.
            </p>
          </div>
          <div>
            <h4 class="font-heading font-bold text-white mb-4">Quick Links</h4>
            <ul class="space-y-2 text-sm">
              <li><a class="hover:text-primary transition-colors" href="/knowledge-base">Knowledge Base</a></li>
              <li><a class="hover:text-primary transition-colors" href="/qa">Q&amp;A</a></li>
              <li><a class="hover:text-primary transition-colors" href="/editorial-policy">Editorial Policy</a></li>
              <li><a class="hover:text-primary transition-colors" href="/privacy">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-heading font-bold text-white mb-4">Agency</h4>
            <ul class="space-y-2 text-sm">
              <li><a class="hover:text-primary transition-colors" href="https://calvia.digital" target="_blank" rel="noopener noreferrer">calvia.digital</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-neutral-grey/20 pt-8 text-sm text-center md:text-left">
          <p>&copy; ${year} ${escapeAttr(SITE_NAME)}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

function renderLayout(inner: string): string {
  return `
    <div class="min-h-screen flex flex-col bg-white">
      ${renderHeader()}
      <main class="flex-1">
        ${inner}
      </main>
      ${renderFooter()}
    </div>
  `;
}

function renderHome(): { title: string; description: string; body: string } {
  const latest = PUBLISHED_ARTICLES.slice(0, 8);
  const list = latest
    .map(
      (a) =>
        `<li class="py-3 border-b border-neutral-grey/10">
          <a class="text-primary hover:underline font-semibold" href="/article/${escapeAttr(a.slug)}">${escapeAttr(a.title)}</a>
          <div class="text-sm text-neutral-grey mt-1">${escapeAttr(a.excerpt || '')}</div>
        </li>`
    )
    .join('\n');

  return {
    title: 'Free Marketing Knowledge Base for Mallorca Businesses',
    description:
      'Actionable, citation-backed SEO, AI marketing, and local growth guides for Calvià and Mallorca.',
    body: renderLayout(`
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="font-heading font-bold text-4xl text-neutral-black mb-4">Calvia Marketing Knowledge Base</h1>
        <p class="text-lg text-neutral-grey max-w-3xl">
          Practical guides for SEO, AI marketing, Google Ads, and local business growth in Mallorca.
        </p>
        <div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div class="lg:col-span-2">
            <h2 class="font-heading font-bold text-2xl text-neutral-black mb-3">Latest Articles</h2>
            <ul class="bg-white rounded-xl shadow-sm border border-neutral-grey/10 divide-y divide-neutral-grey/10">
              ${list}
            </ul>
          </div>
          <aside class="bg-neutral-grey-light rounded-xl p-6 border border-neutral-grey/10">
            <h3 class="font-heading font-bold text-xl text-neutral-black mb-2">Need help implementing?</h3>
            <p class="text-sm text-neutral-grey mb-4">
              If you want an expert team to execute, visit our agency.
            </p>
            <a class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors" href="https://calvia.digital" target="_blank" rel="noopener noreferrer">
              calvia.digital
            </a>
          </aside>
        </div>
      </section>
    `),
  };
}

function renderKnowledgeBase(): { title: string; description: string; body: string } {
  const cats = CATEGORIES.map(
    (c) =>
      `<li class="p-4 border border-neutral-grey/10 rounded-xl bg-white shadow-sm">
        <a class="text-primary font-semibold hover:underline" href="/category/${escapeAttr(c.slug)}">${escapeAttr(c.name)}</a>
        <div class="text-sm text-neutral-grey mt-1">${escapeAttr(c.description)}</div>
      </li>`
  ).join('\n');

  const list = PUBLISHED_ARTICLES.slice(0, 30)
    .map(
      (a) =>
        `<li class="py-3 border-b border-neutral-grey/10">
          <a class="text-primary hover:underline font-semibold" href="/article/${escapeAttr(a.slug)}">${escapeAttr(a.title)}</a>
          <div class="text-sm text-neutral-grey mt-1">${escapeAttr(a.excerpt || '')}</div>
        </li>`
    )
    .join('\n');

  return {
    title: 'Knowledge Base',
    description: 'Browse categories and read citation-backed guides on SEO, AI marketing, and local growth.',
    body: renderLayout(`
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="font-heading font-bold text-4xl text-neutral-black mb-4">Knowledge Base</h1>
        <p class="text-lg text-neutral-grey max-w-3xl">Explore categories and start with the most useful guides.</p>
        <h2 class="font-heading font-bold text-2xl text-neutral-black mt-10 mb-4">Categories</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${cats}</ul>
        <h2 class="font-heading font-bold text-2xl text-neutral-black mt-12 mb-4">Popular Articles</h2>
        <ul class="bg-white rounded-xl shadow-sm border border-neutral-grey/10">${list}</ul>
      </section>
    `),
  };
}

function renderCategory(categorySlug: string): { title: string; description: string; body: string } {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) {
    return {
      title: 'Category Not Found',
      description: 'This category does not exist.',
      body: renderLayout(`<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><h1 class="font-heading font-bold text-3xl">Category not found</h1></section>`),
    };
  }

  const articles = getArticlesByCategory(cat.slug);
  const list = articles
    .map(
      (a) =>
        `<li class="py-3 border-b border-neutral-grey/10">
          <a class="text-primary hover:underline font-semibold" href="/article/${escapeAttr(a.slug)}">${escapeAttr(a.title)}</a>
          <div class="text-sm text-neutral-grey mt-1">${escapeAttr(a.excerpt || '')}</div>
        </li>`
    )
    .join('\n');

  return {
    title: `${cat.name} Guides`,
    description: cat.description,
    body: renderLayout(`
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav class="text-sm text-neutral-grey mb-4"><a class="hover:underline" href="/knowledge-base">Knowledge Base</a> / ${escapeAttr(cat.name)}</nav>
        <h1 class="font-heading font-bold text-4xl text-neutral-black mb-4">${escapeAttr(cat.name)}</h1>
        <p class="text-lg text-neutral-grey max-w-3xl">${escapeAttr(cat.description)}</p>
        <h2 class="font-heading font-bold text-2xl text-neutral-black mt-10 mb-4">Articles</h2>
        <ul class="bg-white rounded-xl shadow-sm border border-neutral-grey/10">${list || '<li class=\"p-4\">No articles yet.</li>'}</ul>
      </section>
    `),
  };
}

function renderArticle(slug: string): {
  title: string;
  description: string;
  body: string;
  schema: object[];
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  keywords?: string;
} {
  const a = getArticleBySlug(slug);
  if (!a) {
    return {
      title: 'Article Not Found',
      description: 'This article does not exist.',
      body: renderLayout(`<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><h1 class="font-heading font-bold text-3xl">Article not found</h1></section>`),
      schema: [],
    };
  }

  const canonical = `${SITE_URL}/article/${a.slug}`;
  const published = isoDate(a.published_date);
  const modified = isoDate(a.updated_date);

  const articleSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.meta_description || a.excerpt,
    image: [a.featured_image_url || DEFAULT_OG_IMAGE],
    author: [{ '@type': 'Person', name: a.author || DEFAULT_AUTHOR }],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };
  if (published) articleSchema.datePublished = published;
  if (modified) articleSchema.dateModified = modified;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Knowledge Base', item: SITE_URL + '/knowledge-base' },
      { '@type': 'ListItem', position: 3, name: a.title, item: canonical },
    ],
  };

  const sources = (a.sources || [])
    .map(
      (s, idx) =>
        `<li class="text-sm text-neutral-grey mb-2">
          <a class="text-primary hover:underline" href="${escapeAttr(s.url)}" target="_blank" rel="noopener noreferrer">[${idx + 1}] ${escapeAttr(s.title)} (${escapeAttr(s.publisher)})</a>
          <span class="ml-2">Accessed: ${escapeAttr(s.accessedAt)}</span>
        </li>`
    )
    .join('\n');

  const faqSchema =
    a.faq && a.faq.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: a.faq.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: q.answer },
          })),
        }
      : null;

  const inner = `
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav class="text-sm text-neutral-grey mb-4">
        <a class="hover:underline" href="/knowledge-base">Knowledge Base</a>
        <span> / </span>
        <a class="hover:underline" href="/category/${escapeAttr(a.category)}">${escapeAttr(a.category)}</a>
      </nav>
      <h1 class="font-heading font-bold text-4xl text-neutral-black mb-4">${escapeAttr(a.title)}</h1>
      <p class="text-lg text-neutral-grey mb-8">${escapeAttr(a.excerpt || '')}</p>
      <div class="prose prose-lg max-w-none">
        ${a.content}
      </div>
      <hr class="my-10" />
      <h2 class="font-heading font-bold text-2xl text-neutral-black mb-4">Sources</h2>
      <ul>${sources || '<li class=\"text-sm text-neutral-grey\">Sources are being added.</li>'}</ul>
      <div class="mt-10 p-6 rounded-xl bg-neutral-grey-light border border-neutral-grey/10">
        <h3 class="font-heading font-bold text-xl text-neutral-black mb-2">Want help implementing this?</h3>
        <p class="text-sm text-neutral-grey mb-4">We keep Calvia Marketing free. If you want an agency to execute, check out calvia.digital.</p>
        <a class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors" href="https://calvia.digital" target="_blank" rel="noopener noreferrer">calvia.digital</a>
      </div>
    </section>
  `;

  return {
    title: a.meta_title || a.title,
    description: a.meta_description || a.excerpt || stripHtml(a.content).slice(0, 160),
    body: renderLayout(inner),
    schema: [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])],
    publishedTime: published,
    modifiedTime: modified,
    image: a.featured_image_url || DEFAULT_OG_IMAGE,
    keywords: a.focus_keyword ? `${a.focus_keyword}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS,
  };
}

function renderQa(): { title: string; description: string; body: string; schema: object[] } {
  const items = QA_ITEMS.slice().sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
  const html = items
    .map(
      (q) => `
      <details class="border border-neutral-grey/10 rounded-xl p-4 bg-white shadow-sm">
        <summary class="font-semibold text-neutral-black cursor-pointer">${escapeAttr(q.question)}</summary>
        <div class="prose prose-lg max-w-none mt-3">${q.answer}</div>
      </details>
    `
    )
    .join('\\n');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };

  return {
    title: 'Marketing Q&A',
    description: 'Frequently asked marketing questions for Mallorca businesses, answered with practical guidance.',
    body: renderLayout(`
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="font-heading font-bold text-4xl text-neutral-black mb-4">Marketing Q&amp;A</h1>
        <p class="text-lg text-neutral-grey mb-8">Quick answers, plus links to deeper guides.</p>
        <div class="space-y-4">${html}</div>
      </section>
    `),
    schema: [schema],
  };
}

function inject(template: string, head: string, bodyHtml: string): string {
  const rootMarker = '<div id=\"root\"></div>';
  if (!template.includes(rootMarker)) {
    throw new Error('prerender: expected dist/index.html to include <div id=\"root\"></div>');
  }

  let out = template.replace(rootMarker, `<div id=\"root\">${bodyHtml}</div>`);
  out = out.replace('</head>', `${head}\n</head>`);
  return out;
}

function main() {
  const distDir = resolve(process.cwd(), 'dist');
  const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

  const staticRoutes = [
    '/',
    '/knowledge-base',
    '/qa',
    '/about',
    '/services',
    '/contact',
    '/privacy',
    '/editorial-policy',
  ];

  const categoryRoutes = CATEGORIES.map((c) => `/category/${c.slug}`);
  const articleRoutes = PUBLISHED_ARTICLES.map((a) => `/article/${a.slug}`);

  const routes = Array.from(new Set([...staticRoutes, ...categoryRoutes, ...articleRoutes]));

  for (const route of routes) {
    const canonical = new URL(route, SITE_URL).toString();

    let page:
      | { title: string; description: string; body: string; schema?: object[]; keywords?: string; image?: string; publishedTime?: string; modifiedTime?: string }
      | undefined;

    if (route === '/') page = renderHome();
    else if (route === '/knowledge-base') page = renderKnowledgeBase();
    else if (route === '/qa') page = renderQa();
    else if (route.startsWith('/category/')) page = renderCategory(route.split('/').pop() || '');
    else if (route.startsWith('/article/')) page = renderArticle(route.split('/').pop() || '');
    else {
      // Minimal static shell for non-content pages (React will render on the client).
      page = {
        title: route === '/contact' ? 'Contact' : route.replace('/', '').replaceAll('-', ' '),
        description:
          'Calvia Marketing is a free, citation-backed knowledge base for SEO, AI marketing, and local business growth in Mallorca.',
        body: renderLayout(
          `<section class=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12\"><h1 class=\"font-heading font-bold text-4xl text-neutral-black\">${escapeAttr(
            route.replace('/', '').replaceAll('-', ' ') || 'Calvia Marketing'
          )}</h1><p class=\"text-lg text-neutral-grey mt-4\">This page is loading.</p></section>`
        ),
      };
    }

    const seoHead = buildSeoHead({
      title: page.title,
      description: page.description,
      canonical,
      keywords: page.keywords,
      image: page.image,
      type: route.startsWith('/article/') ? 'article' : 'website',
      author: DEFAULT_AUTHOR,
      publishedTime: page.publishedTime,
      modifiedTime: page.modifiedTime,
      schema: page.schema || [],
    });

    const out = inject(template, seoHead, page.body);
    const outPath = routeToFile(distDir, route);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, out, 'utf-8');
  }

  // eslint-disable-next-line no-console
  console.log(`Prerendered ${routes.length} routes into dist/ (static HTML generator)`); // Netlify build log
}

main();
