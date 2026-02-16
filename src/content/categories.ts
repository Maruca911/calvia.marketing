export interface Category {
  slug: string;
  name: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'ai-marketing',
    name: 'AI Marketing',
    description:
      'Practical AI workflows, prompts, and automation ideas for Mallorca businesses.',
  },
  {
    slug: 'seo',
    name: 'SEO',
    description: 'Search engine optimization strategies tailored for Mallorca businesses.',
  },
  {
    slug: 'local-seo',
    name: 'Local SEO',
    description: 'Google Maps, Google Business Profile, reviews, and local visibility tactics.',
  },
  {
    slug: 'google-ads',
    name: 'Google Ads',
    description: 'Paid search strategies and account setup guides for local and tourism demand.',
  },
  {
    slug: 'ppc',
    name: 'PPC',
    description: 'Pay-per-click strategy across platforms, tracking, and optimization.',
  },
  {
    slug: 'social-media',
    name: 'Social Media',
    description: 'Organic and paid social strategies for Mallorca hospitality and local services.',
  },
  {
    slug: 'content-marketing',
    name: 'Content Marketing',
    description: 'Content planning, writing, distribution, and compounding SEO growth.',
  },
  {
    slug: 'branding',
    name: 'Branding',
    description: 'Positioning, brand identity, and premium storytelling for Mallorca businesses.',
  },
];

export function categoryNameToSlug(name: string): string | null {
  const match = CATEGORIES.find((c) => c.name.toLowerCase() === name.toLowerCase());
  return match?.slug ?? null;
}

export function categorySlugToName(slug: string): string | null {
  const match = CATEGORIES.find((c) => c.slug === slug);
  return match?.name ?? null;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
