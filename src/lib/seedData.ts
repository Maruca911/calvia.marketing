import { supabase } from './supabase';
import { seoArticles, localSeoArticles } from './articles/seoArticles';
import { googleAdsArticles, ppcArticles } from './articles/adsArticles';
import { socialMediaArticles, contentMarketingArticles } from './articles/socialContentArticles';
import { brandingArticles } from './articles/brandingArticles';

const allArticles = [
  ...seoArticles,
  ...localSeoArticles,
  ...googleAdsArticles,
  ...ppcArticles,
  ...socialMediaArticles,
  ...contentMarketingArticles,
  ...brandingArticles,
];

const qaItems = [
  {
    question: 'What is digital marketing for small businesses in Mallorca?',
    answer: `<p>Digital marketing for small businesses in Mallorca involves tailored strategies like SEO, Google Ads, and social media to attract local and tourist customers. For instance, a cafe in Santa Ponsa can use "marketing for small businesses mallorca" to rank higher on Google, driving foot traffic and online orders.</p>
<p><strong>Key benefits include:</strong></p>
<ul>
<li>Increased visibility - appear when customers search for your services</li>
<li>Cost-effective targeting - reach your ideal customers without wasting budget</li>
<li>Measurable ROI - track exactly how your marketing performs</li>
<li>Competitive advantage - stand out from competitors not using digital marketing</li>
</ul>
<p><strong>Getting started:</strong></p>
<ol>
<li>Conduct keyword research using Google Keyword Planner</li>
<li>Optimize your website for target keywords</li>
<li>Claim and optimize your Google Business Profile</li>
<li>Start with a small Google Ads budget to test campaigns</li>
<li>Build a consistent social media presence</li>
</ol>
<p>For detailed guidance, check our article on <a href="/article/digital-marketing-mallorca-guide">Digital Marketing for Mallorca Businesses</a> or visit <a href="https://calvia.digital" target="_blank">Calvia Digital</a> for personalized strategies.</p>`,
    category: 'Digital Marketing',
    order_index: 1,
  },
  {
    question: 'How much does Google Ads cost for a restaurant in Mallorca?',
    answer: `<p>Google Ads costs for restaurants in Mallorca typically range from €500-2,000/month depending on competition, location, and goals. You control your budget and only pay when someone clicks your ad.</p>
<p><strong>Cost factors include:</strong></p>
<ul>
<li>Competition for keywords - popular terms like "best restaurant Palma" cost more</li>
<li>Target location - ads in tourist hotspots like Calvià tend to have higher costs</li>
<li>Seasonality - summer months see increased competition and costs</li>
<li>Ad quality - better ads get lower costs per click</li>
</ul>
<p><strong>Budget recommendations:</strong></p>
<ul>
<li>Small local restaurants: €500-1,000/month</li>
<li>Mid-size restaurants: €1,000-1,500/month</li>
<li>Large or multiple locations: €1,500-3,000/month</li>
</ul>
<p>Learn more in our guide: <a href="/article/google-ads-restaurants-mallorca">How to Run Google Ads for Restaurants</a></p>`,
    category: 'Google Ads',
    order_index: 2,
  },
  {
    question: 'What are the best social media platforms for Mallorca hotels?',
    answer: `<p>Instagram and Facebook are the best platforms for hotels in Mallorca, reaching both tourists planning trips and locals. Instagram excels for visual storytelling (78% of travelers use it for inspiration), while Facebook targets older demographics and enables direct bookings.</p>
<p><strong>Instagram strategy for hotels:</strong></p>
<ul>
<li>Post stunning property photos showcasing rooms, amenities, and views</li>
<li>Share Stories with real-time updates and behind-the-scenes content</li>
<li>Use Reels to highlight unique experiences</li>
<li>Leverage hashtags like #MallorcaHotels #CalviaLuxury</li>
<li>Partner with travel influencers for authentic promotion</li>
</ul>
<p><strong>Additional platforms to consider:</strong></p>
<ul>
<li><strong>TikTok:</strong> Growing among younger travelers (Gen Z and Millennials)</li>
<li><strong>Pinterest:</strong> Travel inspiration and planning</li>
<li><strong>LinkedIn:</strong> B2B marketing for corporate events</li>
</ul>
<p>Read more: <a href="/article/social-media-marketing-mallorca">Social Media Marketing for Mallorca Businesses</a></p>`,
    category: 'Social Media',
    order_index: 3,
  },
  {
    question: 'How long does SEO take to work in Mallorca?',
    answer: `<p>SEO typically takes 3-6 months to show initial results in Mallorca, with significant improvements appearing after 6-12 months. The timeline depends on competition, current website status, and strategy execution quality.</p>
<p><strong>Timeline breakdown:</strong></p>
<ul>
<li><strong>Months 1-2:</strong> Technical setup, keyword research, initial optimizations</li>
<li><strong>Months 3-4:</strong> First ranking improvements for low-competition keywords</li>
<li><strong>Months 5-6:</strong> Noticeable ranking gains for medium-competition keywords</li>
<li><strong>Months 7-12:</strong> Significant improvements for competitive keywords</li>
<li><strong>12+ months:</strong> Compound benefits and strong domain authority</li>
</ul>
<p><strong>Accelerating results:</strong></p>
<ol>
<li>Focus on low-competition long-tail keywords initially</li>
<li>Create comprehensive, valuable content (2000+ words)</li>
<li>Build local citations and links</li>
<li>Optimize Google Business Profile aggressively</li>
<li>Gather customer reviews consistently</li>
</ol>
<p>Learn more: <a href="/article/seo-services-mallorca">SEO Services Mallorca</a></p>`,
    category: 'SEO',
    order_index: 4,
  },
  {
    question: 'What is the ROI of digital marketing for Mallorca businesses?',
    answer: `<p>Digital marketing ROI for Mallorca businesses typically ranges from 200-500%, meaning every €1 invested generates €2-5 in revenue. ROI varies by industry, strategy, and execution quality.</p>
<p><strong>ROI by channel:</strong></p>
<ul>
<li><strong>Email Marketing:</strong> €38 return per €1 spent (highest ROI)</li>
<li><strong>SEO:</strong> €22 return per €1 spent (best long-term)</li>
<li><strong>Google Ads:</strong> €2-8 return per €1 spent (immediate results)</li>
<li><strong>Social Media Ads:</strong> €2-5 return per €1 spent</li>
<li><strong>Content Marketing:</strong> €3-6 return per €1 spent</li>
</ul>
<p><strong>Industry-specific examples in Mallorca:</strong></p>
<ul>
<li><strong>Restaurants:</strong> Google Ads generates €5-10 per €1 spent during peak season</li>
<li><strong>Hotels:</strong> SEO drives 40-60% of bookings with minimal ongoing cost</li>
<li><strong>Real Estate:</strong> Facebook Ads generate qualified leads at €15-30 per lead</li>
</ul>
<p>Explore our services: <a href="https://calvia.digital" target="_blank">Calvia Digital</a></p>`,
    category: 'Digital Marketing',
    order_index: 5,
  },
  {
    question: 'What is PPC advertising and how does it work for Mallorca businesses?',
    answer: `<p>PPC (Pay-Per-Click) advertising is a digital marketing model where you pay each time someone clicks on your ad. For Mallorca businesses, PPC provides immediate visibility on Google, Facebook, Instagram, and other platforms.</p>
<p><strong>How PPC works:</strong></p>
<ol>
<li>You bid on keywords relevant to your business (e.g., "hotel in Calvià")</li>
<li>When someone searches that keyword, your ad appears at the top of results</li>
<li>You only pay when someone clicks your ad</li>
<li>The cost per click depends on competition and ad quality</li>
</ol>
<p><strong>Benefits for Mallorca businesses:</strong></p>
<ul>
<li>Immediate visibility (unlike SEO which takes months)</li>
<li>Precise targeting by location, language, and demographics</li>
<li>Complete budget control</li>
<li>Measurable results with conversion tracking</li>
<li>Seasonal flexibility for tourism peaks</li>
</ul>
<p>Read our full guide: <a href="/article/ppc-advertising-mallorca-guide">PPC Advertising Guide for Mallorca</a></p>`,
    category: 'PPC',
    order_index: 6,
  },
  {
    question: 'How do I choose the right marketing agency in Mallorca?',
    answer: `<p>Choosing the right marketing agency in Mallorca requires evaluating their local expertise, proven results, and alignment with your business goals.</p>
<p><strong>Key factors to evaluate:</strong></p>
<ul>
<li><strong>Local expertise:</strong> Do they understand the Mallorca market, including seasonal trends?</li>
<li><strong>Proven track record:</strong> Ask for case studies and references from local businesses</li>
<li><strong>Transparent reporting:</strong> They should provide clear, regular performance reports</li>
<li><strong>Range of services:</strong> Look for agencies offering SEO, PPC, social media, and content</li>
<li><strong>Communication:</strong> Regular meetings and responsive support</li>
</ul>
<p><strong>Questions to ask:</strong></p>
<ol>
<li>What experience do you have with businesses in Calvià/Mallorca?</li>
<li>Can you share results from similar clients?</li>
<li>What tools and platforms do you use?</li>
<li>How do you measure and report success?</li>
<li>What is your contract structure and pricing model?</li>
</ol>
<p>Explore professional marketing services at <a href="https://calvia.digital" target="_blank">Calvia Digital</a>.</p>`,
    category: 'Digital Marketing',
    order_index: 7,
  },
  {
    question: 'What is local SEO and why is it important for Calvià businesses?',
    answer: `<p>Local SEO is the practice of optimizing your online presence to attract customers from specific geographic areas. For businesses in Calvià, local SEO determines whether you appear when nearby customers search for your services.</p>
<p><strong>Why local SEO matters:</strong></p>
<ul>
<li>46% of all Google searches have local intent</li>
<li>"Near me" searches have grown 500% in recent years</li>
<li>78% of local mobile searches result in an in-store visit</li>
<li>Tourists heavily rely on local search to find services</li>
</ul>
<p><strong>Key local SEO components:</strong></p>
<ul>
<li><strong>Google Business Profile:</strong> Your most important local asset</li>
<li><strong>Local citations:</strong> Consistent business listings across directories</li>
<li><strong>Reviews:</strong> Quantity and quality of Google reviews</li>
<li><strong>Local content:</strong> Pages targeting specific Mallorca locations</li>
<li><strong>NAP consistency:</strong> Identical name, address, phone across the web</li>
</ul>
<p>Read our comprehensive guide: <a href="/article/local-seo-mallorca">Local SEO Mallorca</a></p>`,
    category: 'Local SEO',
    order_index: 8,
  },
  {
    question: 'How can branding help my Mallorca business stand out?',
    answer: `<p>Strong branding differentiates your Mallorca business from competitors and creates lasting impressions that drive customer loyalty.</p>
<p><strong>Benefits of professional branding:</strong></p>
<ul>
<li><strong>Recognition:</strong> Customers instantly identify your business</li>
<li><strong>Trust:</strong> Professional branding signals quality and reliability</li>
<li><strong>Premium positioning:</strong> Strong brands command higher prices</li>
<li><strong>Customer loyalty:</strong> Emotional connections drive repeat business</li>
<li><strong>Marketing efficiency:</strong> Consistent branding makes all marketing more effective</li>
</ul>
<p><strong>Essential branding elements:</strong></p>
<ul>
<li>Logo and visual identity system</li>
<li>Color palette and typography</li>
<li>Brand voice and messaging guidelines</li>
<li>Photography and imagery style</li>
<li>Digital presence consistency</li>
</ul>
<p>Read our guide: <a href="/article/branding-guide-mallorca-luxury">Branding Guide for Mallorca Luxury Businesses</a></p>`,
    category: 'Branding',
    order_index: 9,
  },
  {
    question: 'What content should I create to attract tourists to my Mallorca business?',
    answer: `<p>Creating the right content is essential for attracting tourists to your Mallorca business. Travelers research extensively before booking, and your content needs to appear during their planning journey.</p>
<p><strong>High-performing content types:</strong></p>
<ul>
<li><strong>Destination guides:</strong> "Top 10 Things to Do in Calvià"</li>
<li><strong>Service-specific content:</strong> "Best Restaurants with Sea Views in Mallorca"</li>
<li><strong>Practical information:</strong> "Getting Around Mallorca"</li>
<li><strong>Video content:</strong> Virtual tours and experience highlights</li>
<li><strong>Visual content:</strong> High-quality photography for Instagram and Pinterest</li>
</ul>
<p><strong>Content creation tips:</strong></p>
<ol>
<li>Research what tourists search for using Google Keyword Planner</li>
<li>Create content in English, Spanish, and German</li>
<li>Publish consistently with a content calendar</li>
<li>Optimize all content for SEO with relevant keywords</li>
<li>Distribute across your website, social media, and email</li>
</ol>
<p>Read our full guide: <a href="/article/content-marketing-mallorca-tourism">Content Marketing for Mallorca Tourism</a></p>`,
    category: 'Content Marketing',
    order_index: 10,
  },
];

export const seedArticles = async () => {
  const batchSize = 10;
  const results = [];

  for (let i = 0; i < allArticles.length; i += batchSize) {
    const batch = allArticles.slice(i, i + batchSize);
    const { data, error } = await supabase.from('articles').insert(batch);

    if (error) {
      console.error(`Error seeding articles batch ${i / batchSize + 1}:`, error);
      results.push({ success: false, error, batch: i / batchSize + 1 });
    } else {
      results.push({ success: true, data, batch: i / batchSize + 1 });
    }
  }

  const allSuccess = results.every((r) => r.success);
  return { success: allSuccess, results, totalArticles: allArticles.length };
};

export const seedQAItems = async () => {
  try {
    const { data, error } = await supabase.from('qa_items').insert(qaItems);

    if (error) {
      console.error('Error seeding Q&A items:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error seeding Q&A items:', error);
    return { success: false, error };
  }
};

export const seedAll = async () => {
  const articlesResult = await seedArticles();
  const qaResult = await seedQAItems();

  return {
    articles: articlesResult,
    qa: qaResult,
  };
};
