import SEO from '../components/SEO';
import { SITE_NAME, SITE_URL } from '../lib/site';

export default function EditorialPolicy() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Editorial Policy | ${SITE_NAME}`,
    url: `${SITE_URL}/editorial-policy`,
    inLanguage: 'en',
  } as const;

  return (
    <>
      <SEO
        title="Editorial Policy"
        description="How Calvia Marketing researches, writes, cites sources, and updates content. Learn our standards for accuracy and AI-assisted writing."
        keywords="editorial policy, sources, citations, ai-assisted writing policy, marketing knowledge base standards"
        schema={schema}
      />

      <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-black mb-6">
            Editorial Policy
          </h1>
          <p className="text-xl text-neutral-grey leading-relaxed">
            Our standards for accuracy, sourcing, and helpfulness.
          </p>
          <p className="text-sm text-neutral-grey mt-4">Last updated: February 14, 2026</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-neutral-black prose-p:text-neutral-grey-dark">
            <h2>Purpose</h2>
            <p>
              Calvia Marketing is a public, free knowledge base. Our goal is to publish practical,
              implementation-ready guidance for local businesses in Calvià and Mallorca.
            </p>

            <h2>How We Create Content</h2>
            <ul>
              <li>
                <strong>Intent-first:</strong> every page is written to answer a specific question
                or task a reader has.
              </li>
              <li>
                <strong>Local context:</strong> examples are adapted to Mallorca use-cases (tourism,
                restaurants, hotels, local services).
              </li>
              <li>
                <strong>Actionable structure:</strong> we prefer checklists, templates, prompts,
                and step-by-step workflows.
              </li>
            </ul>

            <h2>Sources and Citations</h2>
            <p>
              We include a <strong>Sources</strong> section on articles and use inline citations
              for claims that depend on official documentation, platform policies, or measurable
              facts. When we reference a guideline, we link to the primary source whenever
              possible.
            </p>

            <h2>AI-Assisted Writing</h2>
            <p>
              We may use AI tools to speed up outlining, ideation, editing, and drafting. Final
              publication requires human review focused on accuracy, local relevance, and clarity.
              We do not publish content that is intentionally misleading, spammy, or designed to
              manipulate search engines.
            </p>

            <h2>Corrections and Updates</h2>
            <p>
              Marketing platforms and policies change. We aim to keep content current, but if you
              spot an error or a broken link, please contact us via <a href="/contact">Contact</a>.
              When we update an article, we update the “Last updated” date.
            </p>

            <h2>Affiliate Links and Sponsorship</h2>
            <p>
              If we ever use affiliate links or sponsored placements, we will disclose it clearly
              on the page.
            </p>

            <h2>Outreach and Services</h2>
            <p>
              Calvia Marketing is informational. For businesses that want help implementing a
              strategy, we may include a soft outbound link to our agency website (
              <a href="https://calvia.digital" target="_blank" rel="noopener noreferrer">
                calvia.digital
              </a>
              ). These links should never replace the educational purpose of the content.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

