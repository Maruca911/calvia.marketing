import SEO from '../components/SEO';
import { SITE_NAME, SITE_URL } from '../lib/site';

export default function Privacy() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Privacy Policy | ${SITE_NAME}`,
    url: `${SITE_URL}/privacy`,
    inLanguage: 'en',
  } as const;

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy policy for Calvia Marketing. Learn what data we collect through forms, how we use it, and how to request deletion."
        keywords="privacy policy, calvia marketing privacy, newsletter privacy, contact form privacy"
        schema={schema}
      />

      <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-black mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-neutral-grey leading-relaxed">
            A plain-English summary of how we handle your data.
          </p>
          <p className="text-sm text-neutral-grey mt-4">Last updated: February 14, 2026</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-neutral-black prose-p:text-neutral-grey-dark">
            <h2>Who We Are</h2>
            <p>
              Calvia Marketing is a free public knowledge base about digital marketing for
              businesses in Calvià and Mallorca. This website is operated by the Calvia Marketing
              team.
            </p>

            <h2>What Data We Collect</h2>
            <p>We only collect data you choose to submit to us.</p>
            <ul>
              <li>
                <strong>Newsletter form:</strong> your email address and optional tags (for example:
                the topic you subscribed from).
              </li>
              <li>
                <strong>Contact form:</strong> your name, email address, and message.
              </li>
            </ul>

            <h2>How We Collect It</h2>
            <p>
              We use Netlify Forms to receive and store form submissions. When you submit a form,
              the information is sent to Netlify and becomes accessible to us in the Netlify
              dashboard.
            </p>

            <h2>Why We Use Your Data</h2>
            <ul>
              <li>To reply to your message or request.</li>
              <li>To send the newsletter if you opted in.</li>
              <li>To improve our content based on topic interest.</li>
            </ul>

            <h2>What We Do Not Do</h2>
            <ul>
              <li>We do not sell your personal data.</li>
              <li>We do not run user profiling for advertising on this site.</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
              We keep submissions only as long as needed to reply and maintain our newsletter list.
              You can request deletion at any time.
            </p>

            <h2>Your Rights and Requests</h2>
            <p>
              If you want to access, correct, or delete your data, contact us via the{' '}
              <a href="/contact">contact page</a>. Please include the email address you used so we
              can locate your submission.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              Netlify may process your submission as part of providing the Forms service. For their
              practices, consult Netlify’s privacy documentation.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy to reflect changes in our forms, content, or legal
              requirements. The date at the top will be updated when changes are made.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

