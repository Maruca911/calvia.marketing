/*
  # Create Knowledge Base Articles Table

  1. New Tables
    - `articles`
      - `id` (uuid, primary key) - Unique identifier for each article
      - `title` (text) - Article title for display and SEO
      - `slug` (text, unique) - URL-friendly identifier
      - `excerpt` (text) - Short summary for preview cards
      - `content` (text) - Full article content (markdown/HTML)
      - `category` (text) - Article category (Google Ads, SEO, Social Media, PPC, Content Marketing, Local SEO, Branding)
      - `focus_keyword` (text) - Primary SEO keyword
      - `meta_title` (text) - SEO meta title
      - `meta_description` (text) - SEO meta description
      - `featured_image_url` (text) - Main article image URL
      - `youtube_embed_url` (text, nullable) - Optional YouTube tutorial video URL
      - `author` (text) - Author name
      - `published_date` (timestamptz) - Publication date
      - `read_time` (integer) - Estimated reading time in minutes
      - `view_count` (integer) - Number of views
      - `is_published` (boolean) - Publication status
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `articles` table
    - Add policy for public read access to published articles
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  focus_keyword text NOT NULL,
  meta_title text NOT NULL,
  meta_description text NOT NULL,
  featured_image_url text NOT NULL,
  youtube_embed_url text,
  author text NOT NULL DEFAULT 'Calvia Marketing Team',
  published_date timestamptz DEFAULT now(),
  read_time integer NOT NULL DEFAULT 8,
  view_count integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_date ON articles(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_is_published ON articles(is_published);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (is_published = true);