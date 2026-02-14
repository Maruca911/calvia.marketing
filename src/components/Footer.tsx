import { Link } from 'react-router-dom';
import { Newspaper, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-black text-neutral-grey-light mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="bg-primary p-2 rounded-lg group-hover:bg-primary-dark transition-colors">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Calvia Marketing
              </span>
            </Link>
            <p className="text-sm mb-4 max-w-md">
              Expert digital marketing insights for businesses in Calvià and Mallorca. Part of the
              Calvia Group ecosystem, empowering local businesses with strategic digital tools.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/Calvia.group"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-grey hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/knowledge-base" className="hover:text-primary transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="/qa" className="hover:text-primary transition-colors">
                  Q&A
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/editorial-policy" className="hover:text-primary transition-colors">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Calvia Group</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://calvia.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Calvia.group
                </a>
              </li>
              <li>
                <a
                  href="https://calvia.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Calvia.digital
                </a>
              </li>
              <li>
                <a
                  href="https://calvia.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Calvia.app
                </a>
              </li>
              <li>
                <a
                  href="https://calvia.health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Calvia.health
                </a>
              </li>
              <li>
                <a
                  href="https://calvia.realestate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Calvia.realestate
                </a>
              </li>
              <li>
                <a
                  href="https://calvia.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Calvia.blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-grey/20 pt-8 text-sm text-center md:text-left">
          <p>
            &copy; {currentYear} Calvia Marketing. Part of{' '}
            <a href="https://calvia.group" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Calvia Group</a>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
