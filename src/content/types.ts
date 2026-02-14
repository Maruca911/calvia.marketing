export interface Source {
  title: string;
  publisher: string;
  url: string;
  accessedAt: string; // YYYY-MM-DD
}

export interface ArticleFAQItem {
  question: string;
  answer: string; // Plain text or short HTML
}

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML
  category: string;
  focus_keyword: string;
  meta_title: string;
  meta_description: string;
  featured_image_url: string;
  youtube_embed_url: string | null;
  author: string;
  published_date: string; // ISO string
  updated_date: string; // ISO string
  read_time: number;
  is_published: boolean;
  sources?: Source[];
  faq?: ArticleFAQItem[];
}

export interface QAItem {
  id: string;
  question: string;
  answer: string; // HTML
  category: string;
  order_index: number;
}

