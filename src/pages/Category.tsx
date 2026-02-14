import { Link, useParams } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

import SEO from '../components/SEO';
import Card from '../components/Card';

import { CATEGORIES, categorySlugToName } from '../content/categories';
import { CATEGORY_FAQ } from '../content/categoryFaq';
import { getArticlesByCategory } from '../content/articles';
import { SITE_NAME, SITE_URL } from '../lib/site';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export default function Category() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const categoryName = categorySlug ? categorySlugToName(categorySlug) : null;

  const articles = categoryName ? getArticlesByCategory(categoryName) : [];
  const faq = (categorySlug && CATEGORY_FAQ[categorySlug]) || [];

  if (!category || !categoryName) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-heading font-bold text-neutral-black mb-4">
          Category Not Found
        </h1>
        <p className="text-neutral-grey mb-8">
          The category you&apos;re looking for doesn&apos;t exist.
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

  const pageUrl = `${SITE_URL}/category/${category.slug}`;
  const title = `${category.name} Guides for Mallorca Businesses`;
  const description = `${category.description} Browse practical guides, templates, and examples.`;

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
      { '@type': 'ListItem', position: 3, name: category.name, item: pageUrl },
    ],
  } as const;

  const faqSchema =
    faq.length > 0
      ? ({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
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
        title={`${title} | ${SITE_NAME}`}
        description={description}
        keywords={`${category.name.toLowerCase()} mallorca, ${category.name.toLowerCase()} calvia, ${category.name.toLowerCase()} guides`}
        canonical={pageUrl}
        schema={[breadcrumbList, ...(faqSchema ? [faqSchema] : [])]}
      />

      <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/knowledge-base"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Knowledge Base
          </Link>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-black mb-6">
            {category.name}
          </h1>
          <p className="text-xl text-neutral-grey leading-relaxed max-w-3xl">
            {category.description}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length > 0 ? (
            <>
              <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <h2 className="text-title-md font-heading font-bold text-neutral-black mb-2">
                    Articles
                  </h2>
                  <p className="text-neutral-grey">
                    {articles.length} published {articles.length === 1 ? 'article' : 'articles'} in{' '}
                    {category.name}.
                  </p>
                </div>
                <Link
                  to="/knowledge-base"
                  className="text-primary font-semibold hover:text-primary-dark"
                >
                  Search all topics →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link key={article.slug} to={`/article/${article.slug}`}>
                    <Card>
                      <div className="relative overflow-hidden rounded-t-lg h-48">
                        <img
                          src={article.featured_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-neutral-grey mb-3">
                          <span>{format(new Date(article.published_date), 'MMM d, yyyy')}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.read_time} min read
                          </span>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-neutral-black mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-neutral-grey line-clamp-3">{article.excerpt}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-title-md font-heading font-bold text-neutral-black mb-4">
                No articles yet
              </h2>
              <p className="text-neutral-grey max-w-2xl mx-auto">
                We are building this category. In the meantime, browse the{' '}
                <Link to="/knowledge-base" className="text-primary font-semibold">
                  Knowledge Base
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {faq.length > 0 && (
        <section className="py-16 bg-neutral-grey-light border-t border-neutral-grey/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-title-md font-heading font-bold text-neutral-black mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faq.map((item) => (
                <div key={item.question} className="bg-white border border-neutral-grey/20 rounded-lg p-6">
                  <h3 className="font-heading font-bold text-neutral-black mb-2">
                    {item.question}
                  </h3>
                  <p className="text-neutral-grey-dark">{stripHtml(item.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

