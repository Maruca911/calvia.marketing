import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Search } from 'lucide-react';
import SEO from '../components/SEO';
import Card from '../components/Card';
import { format } from 'date-fns';
import { PUBLISHED_ARTICLES } from '../content/articles';
import { CATEGORIES } from '../content/categories';

const categories = ['All', ...CATEGORIES.map((c) => c.name)];

export default function KnowledgeBase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();
  const initialQuery = useMemo(() => {
    return new URLSearchParams(location.search).get('q') ?? '';
  }, [location.search]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  useEffect(() => {
    // Keep local input state in sync with the URL (SearchAction schema target uses ?q=...).
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const filteredArticles = useMemo(() => {
    let filtered = PUBLISHED_ARTICLES;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((article) => article.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <>
      <SEO
        title="Knowledge Base - Digital Marketing Guides and Insights"
        description="Comprehensive guides and articles on digital marketing, SEO, Google Ads, social media, PPC, and more for businesses in Calvià and Mallorca."
        keywords="digital marketing guides mallorca, seo guides, google ads tutorials, social media marketing tips, ppc guides mallorca"
      />

      <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-black mb-6">
              Knowledge Base
            </h1>
            <p className="text-xl text-neutral-grey leading-relaxed">
              In-depth guides, tutorials, and insights to master digital marketing
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-grey" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-neutral-grey/30 focus:outline-none focus:border-primary transition-colors bg-white"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  className="text-sm px-4 py-2 rounded-full bg-white border border-neutral-grey/20 text-neutral-grey hover:text-neutral-black hover:border-neutral-grey/40 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-neutral-grey/20 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-neutral-grey-light text-neutral-grey hover:bg-neutral-grey/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-grey-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentArticles.length > 0 ? (
            <>
              <div className="mb-8 text-neutral-grey">
                Showing {indexOfFirstArticle + 1}-
                {Math.min(indexOfLastArticle, filteredArticles.length)} of{' '}
                {filteredArticles.length} articles
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentArticles.map((article) => (
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
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white text-neutral-grey hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-neutral-grey"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === i + 1
                          ? 'bg-primary text-white'
                          : 'bg-white text-neutral-grey hover:bg-primary/10'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white text-neutral-grey hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-neutral-grey"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-grey">
                No articles found. Try adjusting your search or filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
