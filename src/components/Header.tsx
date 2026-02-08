import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Newspaper } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Knowledge Base', path: '/knowledge-base' },
    { name: 'Q&A', path: '/qa' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-primary-dark transition-colors">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-neutral-black">
                Calvia Marketing
              </span>
              <span className="text-xs text-neutral-grey hidden sm:block">
                Digital Marketing Insights for Mallorca
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors relative ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-neutral-grey hover:text-neutral-black'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-neutral-grey hover:text-neutral-black transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-neutral-grey/20">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 font-medium rounded-lg mb-1 transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-neutral-grey hover:bg-neutral-grey-light'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
