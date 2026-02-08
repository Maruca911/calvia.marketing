import { useState, FormEvent } from 'react';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      if (error) throw error;
      setStatus('success');
      setStatusMessage('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setStatusMessage('Something went wrong. Please try again.');
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Hi! I would like to learn more about your digital marketing services.'
    );
    window.open(`https://wa.me/4915127578246?text=${message}`, '_blank');
  };

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch with Calvia Marketing"
        description="Contact Calvia Marketing for digital marketing inquiries, consulting, and support. Reach us via email, phone, or WhatsApp."
        keywords="contact calvia marketing, digital marketing contact mallorca, marketing inquiry calvia"
      />

      <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-black mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-neutral-grey leading-relaxed">
            Have questions? We're here to help you grow your business
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-title-md font-heading font-bold text-neutral-black mb-6">
                Send Us a Message
              </h2>
              <p className="text-neutral-grey mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-black mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-grey/30 focus:outline-none focus:border-primary transition-colors"
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-black mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-grey/30 focus:outline-none focus:border-primary transition-colors"
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-neutral-black mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-grey/30 focus:outline-none focus:border-primary transition-colors"
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-black mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-grey/30 focus:outline-none focus:border-primary transition-colors resize-none"
                    disabled={status === 'loading'}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>

                {statusMessage && (
                  <p
                    className={`text-sm ${
                      status === 'success' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>

            <div>
              <h2 className="text-title-md font-heading font-bold text-neutral-black mb-6">
                Contact Information
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-black mb-1">Email</h3>
                    <a
                      href="mailto:office@calvia.group"
                      className="text-neutral-grey hover:text-primary transition-colors"
                    >
                      office@calvia.group
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-black mb-1">Phone</h3>
                    <a
                      href="tel:+4915127578246"
                      className="text-neutral-grey hover:text-primary transition-colors"
                    >
                      +49 151 2757 8246
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-black mb-1">Location</h3>
                    <p className="text-neutral-grey">
                      Calvià, Mallorca
                      <br />
                      Balearic Islands, Spain
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-8 h-8 text-accent" />
                  <h3 className="text-title-sm font-heading font-bold text-neutral-black">
                    Chat on WhatsApp
                  </h3>
                </div>
                <p className="text-neutral-grey mb-6">
                  Get instant answers to your questions. Chat with us on WhatsApp for quick
                  support.
                </p>
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full"
                  onClick={handleWhatsAppClick}
                >
                  Start WhatsApp Chat
                </Button>
              </div>

              <div className="mt-8 bg-neutral-grey-light p-6 rounded-lg">
                <h3 className="font-semibold text-neutral-black mb-2">Business Hours</h3>
                <p className="text-neutral-grey text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 2:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
