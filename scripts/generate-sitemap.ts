import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { seoArticles, localSeoArticles } from '../src/lib/articles/seoArticles';
import { googleAdsArticles, ppcArticles } from '../src/lib/articles/adsArticles';
import { socialMediaArticles, contentMarketingArticles } from '../src/lib/articles/socialContentArticles';
import { brandingArticles } from '../src/lib/articles/brandingArticles';

const SITE_URL = 'https://calvia.digital';
const today = new Date().toISOString().split('T')[0];

const allArticles = [
  ...seoArticles,
  ...localSeoArticles,
  ...googleAdsArticles,
  ...ppcArticles,
  ...socialMediaArticles,
  ...contentMarketingArticles,
  ...brandingArticles,
];

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/knowledge-base', priority: '0.9', changefreq: 'weekly' },
  { path: '/qa', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

function generateSitemap(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  for (const article of allArticles) {
    if (!article.is_published) continue;
    xml += `
  <url>
    <loc>${SITE_URL}/article/${article.slug}</loc>
    <lastmod>${today}</lastmod>
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
console.log(`Generated sitemap.xml with ${staticPages.length + allArticles.length} URLs`);

writeFileSync(resolve(publicDir, 'robots.txt'), generateRobotsTxt());
console.log('Generated robots.txt');
