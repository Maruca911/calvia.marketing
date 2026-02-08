/*
  # Create Newsletter Subscribers Table

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key) - Unique identifier for each subscriber
      - `email` (text, unique) - Subscriber email address
      - `consent_given` (boolean) - GDPR consent status
      - `tag` (text, nullable) - Segmentation tag based on article category interest
      - `status` (text) - Subscription status (active, unsubscribed, bounced)
      - `subscribed_date` (timestamptz) - Date of subscription
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for authenticated users only (admin access)
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  consent_given boolean NOT NULL DEFAULT true,
  tag text,
  status text NOT NULL DEFAULT 'active',
  subscribed_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can view subscribers"
  ON subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert subscribers"
  ON subscribers FOR INSERT
  WITH CHECK (true);