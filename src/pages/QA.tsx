import { useEffect, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function QA() {
  const [qaItems, setQaItems] = useState<QAItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<QAItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQAItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [qaItems, searchQuery]);

  const loadQAItems = async () => {
    try {
      const { data, error } = await supabase
        .from('qa_items')
        .select('*')
        .eq('language', 'en')
        .order('order_index');

      if (error) throw error;
      setQaItems(data || []);
    } catch (error) {
      console.error('Error loading Q&A items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = qaItems.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(qaItems);
    }
  };

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filteredItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Frequently Asked Questions - Digital Marketing Q&A"
        description="Get answers to common questions about digital marketing, SEO, Google Ads, social media marketing, and more for businesses in Calvià and Mallorca."
        keywords="digital marketing faq, seo questions, google ads help, marketing questions mallorca"
        schema={faqSchema}
      />

      <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-black mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-neutral-grey leading-relaxed">
            Find answers to common digital marketing questions
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-grey" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-neutral-grey/30 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse bg-neutral-grey-light h-20 rounded-lg" />
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-neutral-grey/20 rounded-lg overflow-hidden transition-all hover:border-primary/50"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-start justify-between gap-4 p-6 text-left bg-white hover:bg-neutral-grey-light/50 transition-colors"
                  >
                    <span className="font-heading font-bold text-lg text-neutral-black flex-1">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                        openId === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openId === item.id && (
                    <div className="p-6 pt-0 bg-neutral-grey-light/30">
                      <div
                        className="prose prose-lg max-w-none text-neutral-grey"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-grey">
                No questions found. Try a different search term.
              </p>
            </div>
          )}

          <div className="mt-16 bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg text-center">
            <h3 className="text-title-md font-heading font-bold text-neutral-black mb-4">
              Didn't Find Your Answer?
            </h3>
            <p className="text-body text-neutral-grey mb-6">
              Contact us directly and our team will be happy to help you with your digital
              marketing questions.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-dark transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
