import { useState } from 'react';
import Button from '../components/Button';
import { seedAll } from '../lib/seedData';

export default function SeedDatabase() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setStatus('loading');
    setMessage('Seeding database...');

    try {
      const result = await seedAll();

      if (result.articles.success && result.qa.success) {
        setStatus('success');
        setMessage('Database seeded successfully! Articles and Q&A items have been added.');
      } else {
        setStatus('error');
        setMessage('Some items failed to seed. Check console for details.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred while seeding the database.');
      console.error('Seed error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-grey-light py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-title-md font-heading font-bold text-neutral-black mb-4">
            Seed Database
          </h1>
          <p className="text-neutral-grey mb-8">
            Click the button below to populate the database with sample articles and Q&A items.
            This should only be done once during initial setup.
          </p>

          <Button
            onClick={handleSeed}
            variant="primary"
            size="lg"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Seeding...' : 'Seed Database'}
          </Button>

          {message && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                status === 'success'
                  ? 'bg-green-100 text-green-800'
                  : status === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {message}
            </div>
          )}

          {status === 'success' && (
            <div className="mt-6">
              <a
                href="/"
                className="text-primary font-semibold hover:text-primary-dark"
              >
                Go to Homepage →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
