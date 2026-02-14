import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_AUTHOR,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from '../lib/site';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string; // Base site URL
  canonical?: string; // Full canonical URL override
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  schema?: object | object[];
}

export default function SEO({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_OG_IMAGE,
  url = SITE_URL,
  canonical,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = DEFAULT_AUTHOR,
  schema,
}: SEOProps) {
  const location = useLocation();
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ?? new URL(location.pathname, url).toString();

  // Avoid indexing deploy previews/branch deploys. Works both in Node prerender and in the browser.
  const isNonProductionDeploy =
    (typeof process !== 'undefined' &&
      typeof process.env !== 'undefined' &&
      process.env.CONTEXT &&
      process.env.CONTEXT !== 'production') ||
    (typeof window !== 'undefined' &&
      window.location.hostname.endsWith('netlify.app') &&
      window.location.hostname !== new URL(SITE_URL).hostname);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta
        name="robots"
        content={
          isNonProductionDeploy
            ? 'noindex,nofollow'
            : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
        }
      />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {schema &&
        (Array.isArray(schema) ? schema : [schema]).map((s, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(s)}
          </script>
        ))}
    </Helmet>
  );
}
