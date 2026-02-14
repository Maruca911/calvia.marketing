import { writeFileSync } from 'fs';
import { resolve } from 'path';

import { SITE_NAME, SITE_URL } from '../src/lib/site';
import { PUBLISHED_ARTICLES } from '../src/content/articles';

function xmlEscape(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc2822(dateIso: string): string {
  const d = new Date(dateIso);
  // If parsing fails, fall back to now.
  const safe = Number.isNaN(d.getTime()) ? new Date() : d;
  return safe.toUTCString();
}

function generateRss(): string {
  const items = PUBLISHED_ARTICLES.slice()
    .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
    .slice(0, 50);

  const lastBuildDate = items[0]?.updated_date || items[0]?.published_date || new Date().toISOString();

  const channelItems = items
    .map((a) => {
      const link = `${SITE_URL}/article/${a.slug}`;
      return `
    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${xmlEscape(link)}</link>
      <guid isPermaLink="true">${xmlEscape(link)}</guid>
      <pubDate>${xmlEscape(toRfc2822(a.published_date))}</pubDate>
      <description>${xmlEscape(a.excerpt)}</description>
      <category>${xmlEscape(a.category)}</category>
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE_NAME)}</title>
    <link>${xmlEscape(SITE_URL)}</link>
    <description>${xmlEscape(
      'Free, public digital marketing knowledge base for Mallorca local businesses.'
    )}</description>
    <language>en-us</language>
    <lastBuildDate>${xmlEscape(toRfc2822(lastBuildDate))}</lastBuildDate>
    <atom:link href="${xmlEscape(
      `${SITE_URL}/rss.xml`
    )}" rel="self" type="application/rss+xml" />
${channelItems}
  </channel>
</rss>
`;
}

const publicDir = resolve(process.cwd(), 'public');
writeFileSync(resolve(publicDir, 'rss.xml'), generateRss(), 'utf-8');
// eslint-disable-next-line no-console
console.log(`Generated rss.xml with ${PUBLISHED_ARTICLES.length} total articles (max 50 in feed)`);

