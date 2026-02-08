import { Search, TrendingUp, Share2, MousePointer, FileText, Palette, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Card from '../components/Card';

export default function Services() {
  const services = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'SEO Services',
      description:
        'Boost your organic visibility with comprehensive SEO strategies. From keyword research to technical optimization, we help your business rank higher on Google and attract qualified traffic. Perfect for restaurants, hotels, and local businesses in Mallorca looking to dominate local search results.',
      benefits: [
        'Keyword research & strategy',
        'On-page optimization',
        'Local SEO for Mallorca businesses',
        'Technical SEO audits',
      ],
    },
    {
      icon: <MousePointer className="w-8 h-8" />,
      title: 'Google Ads Management',
      description:
        'Drive immediate results with strategic Google Ads campaigns. Our data-driven approach ensures maximum ROI through precise targeting, compelling ad copy, and continuous optimization. Ideal for businesses ready to scale quickly and capture high-intent customers.',
      benefits: [
        'Campaign setup & management',
        'Keyword bidding strategy',
        'A/B testing & optimization',
        'Performance tracking & reporting',
      ],
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Social Media Marketing',
      description:
        'Build authentic connections with your audience on Facebook, Instagram, TikTok, and LinkedIn. From content creation to community management, we help you establish a strong social presence that drives engagement and conversions in the Mallorca market.',
      benefits: [
        'Content strategy & creation',
        'Community management',
        'Influencer partnerships',
        'Social media advertising',
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'PPC Advertising',
      description:
        'Maximize your advertising budget with precision-targeted pay-per-click campaigns. We manage campaigns across Google, Facebook, Instagram, and other platforms to ensure every euro spent delivers measurable results for your Calvià business.',
      benefits: [
        'Multi-platform campaign management',
        'Conversion rate optimization',
        'Remarketing strategies',
        'Budget optimization',
      ],
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Content Marketing',
      description:
        'Engage your audience with compelling, SEO-optimized content that establishes your authority. From blog posts to video scripts, we create content that educates, inspires, and converts your target audience in Mallorca and beyond.',
      benefits: [
        'Blog writing & optimization',
        'Email marketing campaigns',
        'Video content strategy',
        'Content calendar management',
      ],
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Branding Services',
      description:
        'Create a memorable brand identity that resonates with affluent customers in Calvià. From logo design to brand guidelines, we help you establish a premium presence that differentiates your business in the competitive Mallorca market.',
      benefits: [
        'Logo & visual identity design',
        'Brand strategy & positioning',
        'Brand guidelines development',
        'Marketing collateral design',
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Digital Marketing Services for Mallorca Businesses"
        description="Comprehensive digital marketing services including SEO, Google Ads, social media, PPC, content marketing, and branding for businesses in Calvià and Mallorca."
        keywords="seo services mallorca, google ads mallorca, social media marketing mallorca, ppc advertising mallorca, content marketing mallorca, branding services mallorca"
      />

      <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-black mb-6">
            Digital Marketing Services
          </h1>
          <p className="text-xl text-neutral-grey leading-relaxed">
            Comprehensive solutions to grow your business in Calvià and Mallorca
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-lg text-neutral-grey max-w-3xl mx-auto">
              While our Knowledge Base provides expert insights and strategies, we also offer
              hands-on implementation through{' '}
              <a
                href="https://calvia.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:text-primary-dark"
              >
                Calvia Digital
              </a>
              . Explore our full range of services below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} hover={false} className="p-8">
                <div className="bg-primary/10 text-primary p-3 rounded-lg inline-block mb-4">
                  {service.icon}
                </div>
                <h3 className="text-title-sm font-heading font-bold text-neutral-black mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-grey mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-neutral-grey-dark">
                      <span className="text-accent mt-1">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://calvia.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  Get Started There
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>

          <div className="mt-20 bg-gradient-to-br from-accent/10 to-primary/10 p-8 md:p-12 rounded-lg text-center">
            <h2 className="text-title-md font-heading font-bold text-neutral-black mb-4">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-body text-neutral-grey mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help your business thrive in the digital landscape. Our team
              at Calvia Digital is ready to create a customized strategy for your success.
            </p>
            <a
              href="https://calvia.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-dark transition-colors"
            >
              Visit Calvia Digital
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
