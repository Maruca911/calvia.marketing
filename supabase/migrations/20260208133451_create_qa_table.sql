/*
  # Create Q&A Section Table

  1. New Tables
    - `qa_items`
      - `id` (uuid, primary key) - Unique identifier for each Q&A item
      - `question` (text) - Question text optimized for AI search
      - `answer` (text) - Detailed 200-300 word answer with bullets/lists/FAQs
      - `category` (text) - Category grouping (Digital Marketing, SEO, PPC, Social Media, etc.)
      - `order_index` (integer) - Display order
      - `view_count` (integer) - Number of views
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `qa_items` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS qa_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'Digital Marketing',
  order_index integer NOT NULL DEFAULT 0,
  view_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_qa_category ON qa_items(category);
CREATE INDEX IF NOT EXISTS idx_qa_order ON qa_items(order_index);

ALTER TABLE qa_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view Q&A items"
  ON qa_items FOR SELECT
  USING (true);