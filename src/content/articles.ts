import { DEFAULT_AUTHOR } from '../lib/site';
import type { Article } from './types';

import { seoArticles, localSeoArticles } from '../lib/articles/seoArticles';
import { googleAdsArticles, ppcArticles } from '../lib/articles/adsArticles';
import {
  socialMediaArticles,
  contentMarketingArticles,
} from '../lib/articles/socialContentArticles';
import { brandingArticles } from '../lib/articles/brandingArticles';
import { aiMarketingArticles } from '../lib/articles/aiMarketingArticles';

const DEFAULT_PUBLISHED_DATE = '2026-02-08T00:00:00.000Z';

function normalizeArticle(input: any): Article {
  const published_date =
    input.published_date ?? input.publishedDate ?? DEFAULT_PUBLISHED_DATE;
  const updated_date = input.updated_date ?? input.updatedDate ?? published_date;

  return {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    category: input.category,
    focus_keyword: input.focus_keyword,
    meta_title: input.meta_title,
    meta_description: input.meta_description,
    featured_image_url: input.featured_image_url,
    youtube_embed_url: input.youtube_embed_url ?? null,
    author: input.author ?? DEFAULT_AUTHOR,
    published_date,
    updated_date,
    read_time: input.read_time ?? 8,
    is_published: Boolean(input.is_published),
    sources: input.sources,
    faq: input.faq,
  };
}

export const ALL_ARTICLES: Article[] = [
  ...aiMarketingArticles,
  ...seoArticles,
  ...localSeoArticles,
  ...googleAdsArticles,
  ...ppcArticles,
  ...socialMediaArticles,
  ...contentMarketingArticles,
  ...brandingArticles,
].map(normalizeArticle);

export const PUBLISHED_ARTICLES: Article[] = ALL_ARTICLES.filter((a) => a.is_published).sort(
  (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
);

export function getArticleBySlug(slug: string): Article | undefined {
  return PUBLISHED_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return PUBLISHED_ARTICLES.filter((a) => a.category === category).sort(
    (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
  );
}

