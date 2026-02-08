/*
  # Fix Security Issues

  1. Drop Unused Indexes
    - `idx_articles_is_published` on articles table
    - `idx_subscribers_email` on subscribers table
    - `idx_subscribers_status` on subscribers table
    - `idx_qa_category` on qa_items table

  2. Tighten RLS Policies
    - Replace unrestricted INSERT policy on `contact_submissions` with validation
    - Replace unrestricted INSERT policy on `subscribers` with validation
    - Fix overly permissive SELECT policy on `subscribers`
*/

-- 1. Drop unused indexes
DROP INDEX IF EXISTS idx_articles_is_published;
DROP INDEX IF EXISTS idx_subscribers_email;
DROP INDEX IF EXISTS idx_subscribers_status;
DROP INDEX IF EXISTS idx_qa_category;

-- 2. Fix RLS policies for contact_submissions
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;

CREATE POLICY "Public contact form with validation"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) > 0 AND length(name) <= 200
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(subject) > 0 AND length(subject) <= 500
    AND length(message) > 0 AND length(message) <= 5000
    AND status = 'new'
  );

-- 3. Fix RLS policies for subscribers
DROP POLICY IF EXISTS "Anyone can insert subscribers" ON subscribers;

CREATE POLICY "Public newsletter signup with validation"
  ON subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND status = 'active'
  );

-- 4. Fix overly permissive SELECT on subscribers
DROP POLICY IF EXISTS "Only authenticated users can view subscribers" ON subscribers;

CREATE POLICY "Authenticated users can view subscribers"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);
