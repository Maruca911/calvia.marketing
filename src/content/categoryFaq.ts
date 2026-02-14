import type { ArticleFAQItem } from './types';

export const CATEGORY_FAQ: Record<string, ArticleFAQItem[]> = {
  'ai-marketing': [
    {
      question: 'What is AI marketing?',
      answer:
        'AI marketing is the use of machine learning and generative AI tools to research, plan, create, personalize, and optimize marketing tasks (for example: ad copy testing, review replies, content planning, and lead qualification).',
    },
    {
      question: 'Will AI-generated content hurt my SEO?',
      answer:
        'AI can help you produce useful content faster, but quality still matters. Focus on originality, accuracy, and satisfying the search intent. Add real examples, local context, and citations to sources.',
    },
    {
      question: 'Which AI tasks are best for Mallorca local businesses?',
      answer:
        'High-impact tasks include: Google Business Profile posts, review-reply templates, localized landing-page outlines, email segmentation drafts, and ad testing ideas.',
    },
    {
      question: 'Do I need coding skills to use AI in marketing?',
      answer:
        'No. Most workflows can be done with prompts, checklists, and simple spreadsheets. The key is having clear inputs (offer, audience, constraints) and a review process.',
    },
  ],
  seo: [
    {
      question: 'What is SEO and why does it matter for local businesses?',
      answer:
        'SEO helps your website and pages show up when people search on Google. For local businesses, SEO drives calls, directions, and bookings from high-intent searches.',
    },
    {
      question: 'How long does SEO take to work?',
      answer:
        'SEO is a compounding channel. Some pages can rank within weeks, but meaningful, stable growth often takes months depending on competition, content quality, and technical health.',
    },
    {
      question: 'What are the most important on-page SEO elements?',
      answer:
        'Start with a clear page topic, a strong title tag, one H1, descriptive headings, internal links, and content that answers the query better than competitors.',
    },
    {
      question: 'Do external links help SEO?',
      answer:
        'Linking to relevant, reputable sources can help users and improve trust signals. Use external links when they genuinely support the reader.',
    },
  ],
  'local-seo': [
    {
      question: 'What is local SEO?',
      answer:
        'Local SEO is the process of improving visibility in local results like Google Maps and the local pack. It focuses on your Google Business Profile, reviews, citations, and location signals.',
    },
    {
      question: 'What is NAP consistency and why is it important?',
      answer:
        'NAP means Name, Address, and Phone number. Keeping it consistent across directories reduces confusion for users and platforms that match business entities.',
    },
    {
      question: 'How important are Google reviews?',
      answer:
        'Reviews affect conversion and can influence local visibility. A steady flow of genuine reviews and thoughtful responses builds trust and improves click-through rates.',
    },
    {
      question: 'Should I post on my Google Business Profile?',
      answer:
        'Yes. Posts help you publish updates, offers, and events directly in your profile. They are especially useful for seasonal tourism businesses.',
    },
  ],
  'google-ads': [
    {
      question: 'Is Google Ads worth it for local businesses?',
      answer:
        'Google Ads can be effective because it captures demand when people are actively searching. The key is tracking conversions and focusing on profitable queries.',
    },
    {
      question: 'What should I track as a conversion?',
      answer:
        'Track business outcomes like calls, form submissions, bookings, purchases, and qualified leads. Avoid optimizing only for clicks or impressions.',
    },
    {
      question: 'How do I improve ad performance quickly?',
      answer:
        'Start by tightening targeting, improving landing pages, adding negative keywords, and using experiments to test ad copy and bidding strategies.',
    },
    {
      question: 'Do I need a large budget to start?',
      answer:
        'No. You can start small and scale based on measured ROI. The most important thing is accurate conversion tracking and focused campaigns.',
    },
  ],
  ppc: [
    {
      question: 'What is PPC marketing?',
      answer:
        'PPC (pay-per-click) is advertising where you pay when someone clicks. It includes platforms like Google Ads and paid social campaigns.',
    },
    {
      question: 'What is ROAS?',
      answer:
        'ROAS means return on ad spend. It measures how much revenue you generate for each euro you spend on ads.',
    },
    {
      question: 'What is remarketing?',
      answer:
        'Remarketing shows ads to people who previously visited your website or interacted with your brand. It often improves conversion rates because the audience already knows you.',
    },
    {
      question: 'What is the biggest PPC mistake?',
      answer:
        'Running campaigns without reliable conversion tracking. Without tracking, you cannot optimize for profit.',
    },
  ],
  'social-media': [
    {
      question: 'Which social platform is best for Mallorca tourism businesses?',
      answer:
        'It depends on your audience and offer. Instagram is strong for visual discovery, TikTok can generate organic reach quickly, and Facebook remains useful for local communities and ads.',
    },
    {
      question: 'How often should a business post?',
      answer:
        'Consistency matters more than volume. Start with a sustainable cadence and scale once you have a repeatable content workflow.',
    },
    {
      question: 'Should I use paid social ads?',
      answer:
        'Paid social can help you reach tourists and niche audiences with strong targeting. Combine it with clear creative, offers, and landing pages.',
    },
    {
      question: 'Do hashtags still matter?',
      answer:
        'They can help a little, but the biggest drivers are content quality, watch time, saves, shares, and strong hooks.',
    },
  ],
  'content-marketing': [
    {
      question: 'What is a content cluster?',
      answer:
        'A content cluster is a hub page plus supporting articles. Internal links connect them, helping search engines understand topical authority.',
    },
    {
      question: 'How long should blog posts be?',
      answer:
        'Length is not a goal on its own. Write long enough to fully answer the query. For competitive topics, comprehensive posts often perform better.',
    },
    {
      question: 'How do I choose content topics?',
      answer:
        'Start with customer questions, sales objections, and local search demand. Then map topics to categories and publish consistently.',
    },
    {
      question: 'Can AI help with content marketing?',
      answer:
        'Yes, especially for outlines, checklists, and variations. You still need human review, local context, and clear sourcing for factual claims.',
    },
  ],
  branding: [
    {
      question: 'What is branding in marketing?',
      answer:
        'Branding is how people perceive your business, including positioning, identity, messaging, and experience. Strong branding improves recall and pricing power.',
    },
    {
      question: 'Is branding only for luxury businesses?',
      answer:
        'No. Any business benefits from clear positioning and consistent communication. It makes marketing more effective and reduces confusion.',
    },
    {
      question: 'What is positioning?',
      answer:
        'Positioning is the clear reason a customer should choose you. It combines your audience, promise, proof, and differentiation.',
    },
    {
      question: 'How do I make my brand consistent?',
      answer:
        'Create a simple brand guide: voice, visual rules, messaging pillars, and example posts. Then use checklists and templates to enforce consistency.',
    },
  ],
};

