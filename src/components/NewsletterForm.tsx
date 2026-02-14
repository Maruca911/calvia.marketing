import { useState, FormEvent } from 'react';
import { Mail } from 'lucide-react';
import Button from './Button';

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

interface NewsletterFormProps {
  variant?: 'inline' | 'large';
  tag?: string;
  placeholder?: string;
  ctaText?: string;
}

export default function NewsletterForm({
  variant = 'inline',
  tag = '',
  placeholder = 'Enter your email',
  ctaText = 'Subscribe',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !consent) {
      setStatus('error');
      setMessage('Please enter your email and accept the terms.');
      return;
    }

    setStatus('loading');

    try {
      const payload = {
        'form-name': 'newsletter',
        email,
        consent: consent ? 'yes' : 'no',
        tag: tag || '',
      };

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm(payload),
      });

      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      setConsent(false);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Newsletter subscription error:', error);
    }
  };

  if (variant === 'large') {
    return (
      <div className="bg-neutral-grey-light p-8 md:p-12 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-accent p-4 rounded-full">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-title-md mb-4">Get Weekly Marketing Tips</h3>
          <p className="text-neutral-grey mb-6">
            Join our newsletter for exclusive insights, strategies, and trends in digital marketing.
          </p>

          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Netlify Forms: picked up from prerendered HTML */}
            <input type="hidden" name="form-name" value="newsletter" />
            <input type="hidden" name="tag" value={tag} />
            <p className="hidden">
              <label>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
            </p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full px-6 py-4 rounded-lg border border-neutral-grey/30 focus:outline-none focus:border-primary transition-colors"
              disabled={status === 'loading'}
            />

            <label className="flex items-start gap-3 text-sm text-left cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                disabled={status === 'loading'}
              />
              <span className="text-neutral-grey-dark">
                I agree to receive marketing emails and understand I can unsubscribe at any time.
                By subscribing, I accept the <a href="/privacy" className="font-semibold">privacy policy</a>.
              </span>
            </label>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : ctaText}
            </Button>

            {message && (
              <p
                className={`text-sm ${
                  status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <input type="hidden" name="tag" value={tag} />
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-lg border border-neutral-grey/30 focus:outline-none focus:border-primary transition-colors"
          disabled={status === 'loading'}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : ctaText}
        </Button>
      </div>

      <label className="flex items-start gap-2 text-xs cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-3 h-3 accent-primary cursor-pointer"
          disabled={status === 'loading'}
        />
        <span className="text-neutral-grey-dark">
          I agree to receive marketing emails and accept the{' '}
          <a href="/privacy" className="font-semibold">
            privacy policy
          </a>
          .
        </span>
      </label>

      {message && (
        <p
          className={`text-sm ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
