import { Link } from 'react-router-dom';
import { Clock, ArrowRight, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import Card from '../components/Card';
import NewsletterForm from '../components/NewsletterForm';
import { format } from 'date-fns';
import { PUBLISHED_ARTICLES } from '../content/articles';
import { SITE_NAME, SITE_URL } from '../lib/site';
import { categoryNameToSlug } from '../content/categories';

export default function Homepage() {
  const featuredArticles = PUBLISHED_ARTICLES.slice(0, 6);

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      'Expert digital marketing insights and strategies for businesses in Calvià and Mallorca.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Calvià',
      addressRegion: 'Mallorca',
      addressCountry: 'ES',
    },
  } as const;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/knowledge-base?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  } as const;

  return (
    <>
      <SEO
        title="Calvia Marketing: Expert Digital Marketing Insights for Mallorca Businesses"
        description="Discover expert digital marketing strategies, SEO tips, and PPC insights for businesses in Calvià and Mallorca. Practical guides to grow your online presence."
        schema={[orgSchema, websiteSchema]}
      />

      <section className="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Digital Marketing Excellence
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-black mb-6 leading-tight">
              Expert Digital Marketing Insights for Mallorca Businesses
            </h1>
            <p className="text-xl md:text-2xl text-neutral-grey mb-8 leading-relaxed">
              Discover proven strategies, actionable tips, and industry insights to grow your
              business online. From SEO to Google Ads, we help Calvià businesses thrive in the
              digital landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/knowledge-base"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Explore Knowledge Base
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://calvia.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-accent text-accent px-8 py-4 rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors"
              >
                Optional: Implementation Help
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-title-lg font-heading font-bold text-neutral-black mb-4">
              Latest Marketing Insights
            </h2>
            <p className="text-xl text-neutral-grey max-w-2xl mx-auto">
              Deep-dive articles, practical guides, and expert tips to elevate your digital
              marketing game.
            </p>
          </div>

          {featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <Link key={article.slug} to={`/article/${article.slug}`}>
                  <Card>
                    <div className="relative overflow-hidden rounded-t-lg h-48">
                      <img
                        src={article.featured_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
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
                      {categoryNameToSlug(article.category) && (
                        <p className="mt-4 text-sm text-neutral-grey">
                          Explore more in{' '}
                          <Link
                            to={`/category/${categoryNameToSlug(article.category)}`}
                            className="font-semibold"
                          >
                            {article.category}
                          </Link>
                          .
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-grey">
                No articles yet. Check back soon for expert insights!
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/knowledge-base"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-grey-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm variant="large" />
        </div>
      </section>
    </>
  );
}
