import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Homepage from './pages/Homepage';
import About from './pages/About';
import Services from './pages/Services';
import KnowledgeBase from './pages/KnowledgeBase';
import Category from './pages/Category';
import Article from './pages/Article';
import QA from './pages/QA';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import EditorialPolicy from './pages/EditorialPolicy';

export default function AppShell() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/category/:categorySlug" element={<Category />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/qa" element={<QA />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

