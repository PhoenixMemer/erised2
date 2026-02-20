import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import LiquidPreloader from './components/LiquidPreloader';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Now safe to use here

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-navy selection:text-white overflow-x-hidden">
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
          transition={{ duration: 0.5 }}
        >
          {/* Show Navbar ONLY on Home Page if you want the Sidebar-only look on Menu */}
          {location.pathname === '/' && <Navbar />}
          
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
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