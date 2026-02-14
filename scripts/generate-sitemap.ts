import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { SITE_URL } from '../src/lib/site';
import { CATEGORIES } from '../src/content/categories';
import { PUBLISHED_ARTICLES } from '../src/content/articles';

const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/knowledge-base', priority: '0.9', changefreq: 'weekly' },
  { path: '/editorial-policy', priority: '0.5', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.4', changefreq: 'yearly' },
  { path: '/qa', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

const categoryPages = CATEGORIES.map((c) => ({
  path: `/category/${c.slug}`,
  priority: '0.8',
  changefreq: 'weekly',
}));

function generateSitemap(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const page of [...staticPages, ...categoryPages]) {
    xml += `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  for (const article of PUBLISHED_ARTICLES) {
    const lastmod = (article.updated_date || article.published_date || '').split('T')[0] || today;
    xml += `
  <url>
    <loc>${SITE_URL}/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  xml += `
</urlset>`;
  return xml;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

const publicDir = resolve(process.cwd(), 'public');

writeFileSync(resolve(publicDir, 'sitemap.xml'), generateSitemap());
console.log(
  `Generated sitemap.xml with ${staticPages.length + categoryPages.length + PUBLISHED_ARTICLES.length} URLs`
);

writeFileSync(resolve(publicDir, 'robots.txt'), generateRobotsTxt());
console.log('Generated robots.txt');
