# Calvia Marketing - Premium SEO Authority Site

A high-performance, production-ready SEO blog website for www.calvia.marketing - focused on digital marketing for businesses in Calvià and Mallorca.

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
- **Individual Articles**: Full SEO-optimized articles with YouTube embeds, related posts, and newsletter CTAs
- **Q&A Section**: Accordion-style FAQ with AI search optimization
- **Contact**: Contact form with WhatsApp integration

### SEO Optimization
- Dynamic meta tags and Open Graph tags for all pages
- Structured data (JSON-LD) for Articles, FAQ, and Organization
- Image lazy loading and WebP format
- Fast loading times (<1.8s target)
- Mobile-first responsive design
- Internal linking strategy
- Canonical URLs

### Newsletter Integration
- Supabase-powered newsletter signup
- GDPR consent tracking
- Tag-based segmentation
- Multiple signup forms (homepage hero, article CTAs)

### Database
- Supabase backend with three tables:
  - `articles` - Knowledge Base content
  - `subscribers` - Newsletter subscribers
  - `qa_items` - Q&A content
- Row Level Security (RLS) enabled
- Optimized indexes for performance

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
The `.env` file is already configured with Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Seed the Database
Visit `/seed-database` in your browser to populate the database with:
- 6 comprehensive articles covering key topics
- 5 detailed Q&A items

Click the "Seed Database" button to add sample content.

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## Content Structure

### Articles
The site includes 6 pillar articles:
1. Complete Guide to Digital Marketing for Mallorca Businesses
2. How to Run Google Ads for Restaurants in Mallorca
3. SEO Services Mallorca: Boost Your Local Search Rankings
4. Social Media Marketing for Mallorca Businesses
5. Local SEO Mallorca: Dominate Local Search Results
6. Content Marketing Strategies for Mallorca Tourism Businesses

Each article is 2000-3000 words with:
- SEO-optimized meta tags
- Internal links to related content
- External links to authoritative sources
- YouTube tutorial embeds where relevant
- Newsletter signup CTAs

### Q&A Section
5 comprehensive Q&A items covering:
- Digital marketing basics for small businesses
- Google Ads costs and strategy
- Social media platform recommendations
- SEO timelines and expectations
- ROI of digital marketing

Each answer is 200-300 words with structured formatting for AI search optimization.

## Key Technologies

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Supabase** for backend and database
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

The site is ready for deployment to:
- Netlify
- Vercel
- Any static hosting provider

Configure your custom domain (www.calvia.marketing) in your hosting provider's settings.

## Future Enhancements

To expand the site, consider adding:
- Additional 30 supporting articles for long-tail keywords
- More Q&A items (targeting 30 total)
- Mailchimp API integration for newsletter automation
- Admin dashboard for content management
- Advanced analytics integration
- More interactive elements (calculators, tools)

## Support

For questions or support, visit [Calvia Digital](https://calviadigital.com).

---

Built with ❤️ for Calvia Marketing - Part of Calvia Group
