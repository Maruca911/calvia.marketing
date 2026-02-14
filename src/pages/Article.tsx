import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { format } from 'date-fns';

import SEO from '../components/SEO';
import NewsletterForm from '../components/NewsletterForm';
import Card from '../components/Card';

import { getArticleBySlug, getArticlesByCategory } from '../content/articles';
import { categoryNameToSlug } from '../content/categories';
import type { Source } from '../content/types';
import { SITE_NAME, SITE_URL } from '../lib/site';

function getYouTubeEmbedId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractExternalSources(html: string): Source[] {
  const accessedAt = new Date().toISOString().split('T')[0];
  const matches = Array.from(html.matchAll(/href="(https?:\/\/[^"]+)"/g)).map((m) => m[1]);
  const unique = Array.from(new Set(matches));

  const filtered = unique.filter((href) => {
    try {
      const host = new URL(href).hostname;
      // Don't treat our own properties as "sources".
      if (host.endsWith('calvia.marketing')) return false;
      if (host.endsWith('calvia.digital')) return false;
      return true;
    } catch {
      return false;
    }
  });

  return filtered.slice(0, 20).map((href) => {
    const u = new URL(href);
    return {
      title: u.hostname,
      publisher: u.hostname,
      url: href,
      accessedAt,
    };
  });
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  const [shareMessage, setShareMessage] = useState<string>('');

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return getArticlesByCategory(article.category)
      .filter((a) => a.slug !== article.slug)
      .slice(0, 3);
  }, [article]);

  const sources = useMemo(() => {
    if (!article) return [];
    if (article.sources && article.sources.length > 0) return article.sources;
    return extractExternalSources(article.content);
  }, [article]);

  const handleShare = async () => {
    if (!article) return;
    const url =
      typeof window !== 'undefined' ? window.location.href : `${SITE_URL}/article/${article.slug}`;

    try {
      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        // @ts-expect-error - `navigator.share` is not in all TS lib targets.
        await navigator.share({ title: article.title, url });
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareMessage('Link copied!');
        setTimeout(() => setShareMessage(''), 2500);
      }
    } catch {
      // Ignore share failures.
    }
  };

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-heading font-bold text-neutral-black mb-4">
          Article Not Found
        </h1>
        <p className="text-neutral-grey mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/knowledge-base"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Knowledge Base
        </Link>
      </div>
    );
  }

  const articleUrl = `${SITE_URL}/article/${article.slug}`;
  const categorySlug = categoryNameToSlug(article.category);

  const articleText = stripHtml(article.content);
  const wordCount = articleText ? articleText.split(/\s+/).length : 0;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image_url,
    datePublished: article.published_date,
    dateModified: article.updated_date,
    inLanguage: 'en',
    articleSection: article.category,
    wordCount,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  } as const;

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Knowledge Base',
        item: `${SITE_URL}/knowledge-base`,
      },
      ...(categorySlug
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: article.category,
              item: `${SITE_URL}/category/${categorySlug}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: categorySlug ? 4 : 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  } as const;

  const faqSchema =
    article.faq && article.faq.length > 0
      ? ({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: stripHtml(item.answer),
            },
          })),
        } as const)
      : null;

  return (
    <>
      <SEO
        title={article.meta_title}
        description={article.meta_description}
        keywords={`${article.focus_keyword}, ${article.category.toLowerCase()} mallorca`}
        image={article.featured_image_url}
        type="article"
        publishedTime={article.published_date}
        modifiedTime={article.updated_date}
        author={article.author}
        canonical={articleUrl}
        schema={[articleSchema, breadcrumbList, ...(faqSchema ? [faqSchema] : [])]}
      />

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/knowledge-base"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Knowledge Base
          </Link>

          <div className="mb-8">
            {categorySlug ? (
              <Link
                to={`/category/${categorySlug}`}
                className="bg-accent text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4 hover:bg-accent-dark transition-colors"
              >
                {article.category}
              </Link>
            ) : (
              <span className="bg-accent text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
                {article.category}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-black mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-neutral-grey">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{format(new Date(article.published_date), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{article.read_time} min read</span>
              </div>
            </div>

            {article.updated_date !== article.published_date && (
              <p className="mt-3 text-sm text-neutral-grey">
                Updated {format(new Date(article.updated_date), 'MMMM d, yyyy')}
              </p>
            )}
          </div>

          <div className="mb-12">
            <img
              src={article.featured_image_url}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg"
              loading="eager"
            />
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="prose prose-lg max-w-none mb-12 prose-headings:font-heading prose-headings:text-neutral-black prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-neutral-grey-dark prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-dark prose-li:text-neutral-grey-dark prose-strong:text-neutral-black prose-blockquote:border-primary prose-blockquote:text-neutral-grey-dark prose-img:rounded-lg"
          />

          {article.youtube_embed_url && (
            <div className="mb-12">
              <h3 className="text-title-sm font-heading font-bold text-neutral-black mb-4">
                Watch Tutorial
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeEmbedId(
                    article.youtube_embed_url
                  )}`}
                  title="Video tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {sources.length > 0 && (
            <section className="border border-neutral-grey/20 rounded-lg p-6 md:p-8 mb-12">
              <h2 className="text-title-sm font-heading font-bold text-neutral-black mb-4">
                Sources &amp; Further Reading
              </h2>
              <p className="text-sm text-neutral-grey mb-4">
                We link to reputable resources and official documentation. If you notice an
                outdated link, please contact us.
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-neutral-grey-dark">
                {sources.map((s, idx) => (
                  <li key={s.url} id={`source-${idx + 1}`}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium">
                      {s.title}
                    </a>{' '}
                    <span className="text-neutral-grey">({s.publisher}; accessed {s.accessedAt})</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {article.faq && article.faq.length > 0 && (
            <section className="border border-neutral-grey/20 rounded-lg p-6 md:p-8 mb-12">
              <h2 className="text-title-sm font-heading font-bold text-neutral-black mb-4">
                FAQ
              </h2>
              <div className="space-y-6">
                {article.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-heading font-bold text-neutral-black mb-2">
                      {item.question}
                    </h3>
                    <div
                      className="text-sm text-neutral-grey-dark"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="border-t border-b border-neutral-grey/20 py-8 mb-12">
            <div className="flex items-center justify-between gap-6">
              <span className="text-neutral-grey font-medium">Share this article:</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-neutral-grey hover:text-primary transition-colors"
                  aria-label="Share or copy link"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                {shareMessage && <span className="text-sm text-neutral-grey">{shareMessage}</span>}
              </div>
            </div>
          </div>

          <div className="bg-neutral-grey-light p-8 rounded-lg mb-12">
            <h3 className="text-title-sm font-heading font-bold text-neutral-black mb-4">
              Get More Insights, Weekly
            </h3>
            <p className="text-neutral-grey mb-6">
              Subscribe for practical marketing tips for Mallorca businesses. No spam.
            </p>
            <NewsletterForm tag={article.category} placeholder="Your email address" />
          </div>

          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-title-md font-heading font-bold text-neutral-black mb-8">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} to={`/article/${related.slug}`}>
                    <Card>
                      <div className="relative overflow-hidden rounded-t-lg h-40">
                        <img
                          src={related.featured_image_url}
                          alt={related.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-heading font-bold text-neutral-black mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {related.title}
                        </h4>
                        <p className="text-sm text-neutral-grey line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
