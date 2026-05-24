import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle } from 'lucide-react'; // <-- Added icons

import Navbar from './components/Navbar';
import LiquidPreloader from './components/LiquidPreloader';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import { CartProvider } from './context/CartContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans selection:bg-navy selection:text-white overflow-x-hidden">
      <ScrollToTop />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <LiquidPreloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col flex-grow"
        >
          <Navbar /> 
          
          <main className="flex-grow">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
            </Routes>
          </main>

          {/* THE NEW SOLID DARK NAVY FOOTER */}
          <footer id="contact" className="bg-navy py-16 px-6 relative border-t-[6px] border-gold overflow-hidden">
            <div className="container mx-auto max-w-4xl flex flex-col items-center">
              
              <h2 className="font-serif text-3xl md:text-4xl text-gold mb-8 italic text-center">
                Manage Mischief With Us
              </h2>
              
              {/* Interactive Contact Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                 <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-slate-500/50 flex items-center justify-center text-slate-300 hover:border-gold hover:text-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all bg-slate-800/20">
                   <Instagram size={24} />
                 </a>
                 <a href="mailto:info@cafeerised.com" className="w-14 h-14 rounded-full border border-slate-500/50 flex items-center justify-center text-slate-300 hover:border-gold hover:text-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all bg-slate-800/20">
                   <Mail size={24} />
                 </a>
                 <a href="https://wa.me/923167059804" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-slate-500/50 flex items-center justify-center text-slate-300 hover:border-emerald-400 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all bg-slate-800/20">
                   <MessageCircle size={24} />
                 </a>
              </div>

              {/* Cafe Branding Info */}
              <div className="text-center text-xs tracking-[0.2em] text-slate-500 space-y-3 uppercase font-bold">
                 <p>EST. 1996 • DIAGON ALLEY, LONDON</p>
                 <p>&copy; {new Date().getFullYear()} CAFE ERISED. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
          
        </motion.div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
};

export default App;