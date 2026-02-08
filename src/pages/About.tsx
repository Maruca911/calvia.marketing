import { Building2, Target, Users, Zap } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="About Calvia Marketing - Part of Calvia Group"
        description="Learn about Calvia Marketing's mission to empower Calvià businesses with practical digital marketing strategies. Part of the Calvia Group ecosystem."
      />

      <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-black mb-6">
            About Calvia Marketing
          </h1>
          <p className="text-xl text-neutral-grey leading-relaxed">
            Your trusted source for digital marketing insights in Mallorca
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-title-md font-heading font-bold text-neutral-black mb-6">
              Our Vision
            </h2>
            <p className="text-body text-neutral-grey mb-6 leading-relaxed">
              Calvia Marketing is a Calvia Group initiative, dedicated to delivering real-life
              benefits like time savings and growth for local businesses. We believe in connecting
              businesses with affluent residents and tourists through strategic digital tools while
              the broader Calvia Group ecosystem—including our app, health services, real estate
              solutions, and more—enhances community connections and privacy.
            </p>
            <p className="text-body text-neutral-grey mb-6 leading-relaxed">
              As part of the{' '}
              <a href="https://calvia.group" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark font-semibold">
                Calvia Group
              </a>
              , we are the parent ecosystem empowering high-net-worth individuals who own second
              homes in Calvià with tools for effortless luxury living. Our mission extends beyond
              just providing services—we create an integrated experience where every component works
              together to enhance the quality of life for residents and support local businesses.
            </p>

            <h2 className="text-title-md font-heading font-bold text-neutral-black mb-6 mt-12">
              Our Mission
            </h2>
            <p className="text-body text-neutral-grey mb-6 leading-relaxed">
              Empowering Calvià businesses with practical marketing strategies that save time and
              drive sustainable growth. We provide in-depth, actionable insights that help local
              businesses thrive in the digital landscape, connecting them with the right audience at
              the right time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-neutral-grey-light p-8 rounded-lg">
              <div className="bg-primary p-3 rounded-lg inline-block mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-title-sm font-heading font-bold text-neutral-black mb-3">
                Strategic Focus
              </h3>
              <p className="text-neutral-grey">
                We focus on high-impact digital marketing strategies that deliver measurable results
                for businesses in Calvià and Mallorca.
              </p>
            </div>

            <div className="bg-neutral-grey-light p-8 rounded-lg">
              <div className="bg-accent p-3 rounded-lg inline-block mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-title-sm font-heading font-bold text-neutral-black mb-3">
                Community First
              </h3>
              <p className="text-neutral-grey">
                We believe in building strong connections between local businesses and the affluent
                community we serve.
              </p>
            </div>

            <div className="bg-neutral-grey-light p-8 rounded-lg">
              <div className="bg-primary p-3 rounded-lg inline-block mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-title-sm font-heading font-bold text-neutral-black mb-3">
                Actionable Insights
              </h3>
              <p className="text-neutral-grey">
                Every piece of content we create is designed to be practical, implementable, and
                results-driven.
              </p>
            </div>

            <div className="bg-neutral-grey-light p-8 rounded-lg">
              <div className="bg-accent p-3 rounded-lg inline-block mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-title-sm font-heading font-bold text-neutral-black mb-3">
                Part of Calvia Group
              </h3>
              <p className="text-neutral-grey">
                Leveraging the full ecosystem of Calvia Group services to create integrated,
                premium experiences.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-12 rounded-lg">
            <h3 className="text-title-md font-heading font-bold text-neutral-black mb-4">
              Ready to Grow Your Business?
            </h3>
            <p className="text-body text-neutral-grey mb-6">
              Explore our comprehensive services at Calvia Digital, where we turn insights into
              action.
            </p>
            <a
              href="https://calvia.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-dark transition-colors"
            >
              Visit Calvia Digital
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
