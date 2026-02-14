# Calvia Marketing - Public SEO + AI Search Knowledge Base

A high-performance, production-ready SEO knowledge base for `https://www.calvia.marketing` focused on digital marketing for businesses in Calvià and Mallorca.

This repo is intentionally <strong>informational-intent</strong>. Outbound links to `calvia.digital` are kept as soft CTAs only.

## Features

### Design
- Clean, professional design with white backgrounds, black headings, blue accents, and orange highlights
- Custom typography using Inter and Montserrat fonts
- Responsive layout optimized for all devices
- Smooth animations and hover effects
- Maximum loading speed with optimized images

### Pages
- **Homepage**: Hero section with featured articles and newsletter signup
- **About**: Calvia Group vision and mission statement
- **Services**: Six core digital marketing services
- **Knowledge Base**: Filterable article archive with search and pagination
- **Category Hubs**: Topic hub pages (AI Marketing, SEO, Local SEO, Google Ads, etc.)
- **Individual Articles**: Full SEO-optimized articles with YouTube embeds, related posts, and newsletter CTAs
- **Q&A Section**: Accordion-style FAQ with AI search optimization
- **Contact**: Contact form with WhatsApp integration
- **Privacy** + **Editorial Policy**: Compliance + sourcing standards

### SEO Optimization
- Dynamic meta tags and Open Graph tags for all pages (per-route, prerendered)
- Structured data (JSON-LD) for Articles, FAQ, and Organization
- Image lazy loading and WebP format
- Fast loading times (<1.8s target)
- Mobile-first responsive design
- Internal linking strategy
- Canonical URLs
- `robots.txt`, `sitemap.xml`, `rss.xml`, and `llms.txt`

### Newsletter Integration
- Netlify Forms powered newsletter signup (no database writes)
- Multiple signup forms (homepage + article CTAs)
- Contact form via Netlify Forms

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
No environment variables are required for local development.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production (SSG/Prerender)
```bash
npm run build
```

## Content Structure

### Articles
Articles live in the repo and render statically. Key files:
- `src/lib/articles/*` (article content)
- `src/content/articles.ts` (aggregator)
- `src/content/categories.ts` (category hubs)

Each article supports:
- `meta_title`, `meta_description`, `focus_keyword`
- `sources[]` + inline footnote citations (for important claims)
- optional `faq[]` for on-page FAQs and FAQ schema

### Q&A Section
Q&A items live in `src/content/qa.ts`.

## Key Technologies

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Helmet Async** for SEO meta tags
- **Lucide React** for icons
- **Date-fns** for date formatting

## Performance Features

- Image lazy loading
- Code splitting by route
- Optimized bundle size
- WebP image format (target <80KB per image)
- CSS and JS minification
- Browser caching
- Fast page transitions

## SEO Features

- Semantic HTML structure
- Proper heading hierarchy (H1-H6)
- Alt text for all images
- Canonical URLs
- Open Graph and Twitter Card tags
- Structured data (Schema.org)
- Fast Core Web Vitals
- Mobile-first design

## Deployment

Netlify recommended.

Build pipeline:
1. Generate `public/sitemap.xml` and `public/robots.txt`
2. Generate `public/rss.xml`
3. `vite build`
4. `scripts/prerender.ts` writes fully-rendered HTML per route into `dist/`

## Supabase Folder (Template Only)

This repo contains a `supabase/` folder with SQL migrations as a dormant template. It is not used at runtime and does nothing unless you manually apply migrations to a Supabase project. Production deploys publish `dist/`, so the template does not ship to the website.

## Future Enhancements

To expand the site, consider adding:
- Additional 30 supporting articles for long-tail keywords
- More Q&A items (targeting 30 total)
- Optional translations + hreflang
- Advanced analytics integration
- More interactive elements (calculators, tools)

## Support

For implementation help, visit [Calvia Digital](https://calvia.digital).

---

Built for Calvia Marketing - Part of Calvia Group
