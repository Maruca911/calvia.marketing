import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import NewsletterForm from '../components/NewsletterForm';
import Card from '../components/Card';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  focus_keyword: string;
  meta_title: string;
  meta_description: string;
  featured_image_url: string;
  youtube_embed_url: string | null;
  author: string;
  published_date: string;
  read_time: number;
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

  const loadArticle = async (articleSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', articleSlug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setArticle(data);
        await incrementViewCount(data.id);
        loadRelatedArticles(data.category, data.id);
      }
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async (articleId: string) => {
    try {
      const { data: currentArticle } = await supabase
        .from('articles')
        .select('view_count')
        .eq('id', articleId)
        .maybeSingle();

      if (currentArticle) {
        await supabase
          .from('articles')
          .update({ view_count: currentArticle.view_count + 1 })
          .eq('id', articleId);
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const loadRelatedArticles = async (category: string, currentArticleId: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .eq('is_published', true)
        .eq('language', 'en')
        .neq('id', currentArticleId)
        .limit(3);

      if (error) throw error;
      setRelatedArticles(data || []);
    } catch (error) {
      console.error('Error loading related articles:', error);
    }
  };

  const getYouTubeEmbedId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-neutral-grey-light rounded w-3/4" />
          <div className="h-96 bg-neutral-grey-light rounded" />
          <div className="space-y-4">
            <div className="h-4 bg-neutral-grey-light rounded" />
            <div className="h-4 bg-neutral-grey-light rounded" />
            <div className="h-4 bg-neutral-grey-light rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

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

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image_url,
    datePublished: article.published_date,
    dateModified: article.published_date,
    inLanguage: 'en',
    articleSection: article.category,
    wordCount: Math.round(article.content.replace(/<[^>]*>/g, '').length / 5),
    author: {
      '@type': 'Organization',
      name: 'Calvia Digital',
      url: 'https://calvia.digital',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calvia Digital',
      url: 'https://calvia.digital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://calvia.digital/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://calvia.digital/article/${article.slug}`,
    },
  };

  return (
    <>
      <SEO
        title={article.meta_title}
        description={article.meta_description}
        keywords={`${article.focus_keyword}, ${article.category.toLowerCase()} mallorca`}
        image={article.featured_image_url}
        type="article"
        publishedTime={article.published_date}
        author={article.author}
        schema={schema}
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
            <span className="bg-accent text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
              {article.category}
            </span>
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
          </div>

          <div className="mb-12">
            <img
              src={article.featured_image_url}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg"
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

          <div className="border-t border-b border-neutral-grey/20 py-8 mb-12">
            <div className="flex items-center justify-between">
              <span className="text-neutral-grey font-medium">Share this article:</span>
              <div className="flex gap-4">
                <button className="text-neutral-grey hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-neutral-grey-light p-8 rounded-lg mb-12">
            <h3 className="text-title-sm font-heading font-bold text-neutral-black mb-4">
              Get More Insights — Sign Up
            </h3>
            <p className="text-neutral-grey mb-6">
              Subscribe to our newsletter for weekly marketing tips and strategies delivered to
              your inbox.
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
                  <Link key={related.id} to={`/article/${related.slug}`}>
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
