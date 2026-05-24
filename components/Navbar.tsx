import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSidebar from './CartSidebar';

interface NavLink { label: string; href: string; }

const LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/#about' }, 
  { label: 'Contact', href: '/#contact' },
];

const NavItem: React.FC<{ link: NavLink; isActive: boolean }> = ({ link, isActive }) => (
  <div className="relative group overflow-hidden">
    <Link to={link.href} className={`relative z-10 text-xs md:text-sm tracking-widest uppercase transition-colors duration-500 ${isActive ? 'text-navy font-bold' : 'text-slate-500 group-hover:text-navy'}`}>
      {link.label}
    </Link>
    <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold transform transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
  </div>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const location = useLocation();
  const { itemCount } = useCart();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-3 md:py-4 bg-cream/90 backdrop-blur-md shadow-sm' : 'py-5 md:py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          <div className="flex-1 flex items-center justify-start">
            <button className="md:hidden text-navy p-1" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon size={28} />
            </button>
            <div className="hidden md:flex items-center space-x-8">
              {LINKS.slice(0, 2).map((link) => (
                <NavItem key={link.label} link={link} isActive={location.pathname === link.href} />
              ))}
            </div>
          </div>

          <Link to="/" className="flex-shrink-0 text-center group flex flex-col items-center justify-center">
            <span className="font-serif italic text-sm md:text-base text-slate-500 leading-none">cafe</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy tracking-widest leading-none mt-1 group-hover:text-gold transition-colors duration-500">
              ERISED
            </h1>
          </Link>

          <div className="flex-1 flex items-center justify-end gap-6 md:gap-8">
            <div className="hidden md:flex items-center space-x-8">
              {LINKS.slice(2).map((link) => (
                <NavItem key={link.label} link={link} isActive={location.hash === link.href.replace('/', '')} />
              ))}
            </div>
            
            <button onClick={() => setIsCartOpen(true)} className="relative group p-1">
              <ShoppingBag className="w-6 h-6 md:w-5 md:h-5 text-navy transition-transform group-hover:scale-110" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 bg-gold text-[10px] md:text-xs text-white flex items-center justify-center rounded-full shadow-lg">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* THE NEW CINEMATIC MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} // Heavy Apple-style curve
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
              <X size={36} />
            </button>

            {/* Glowing Center Logo inside menu */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              className="mb-12 text-center"
            >
              <span className="font-serif italic text-gold/60 text-lg">cafe</span>
              <h2 className="font-serif text-5xl text-gold tracking-widest mt-1">ERISED</h2>
              <div className="w-12 h-1 bg-white/20 mx-auto mt-6 rounded-full"></div>
            </motion.div>
            
            {/* Staggered Links */}
            <div className="space-y-8 text-center w-full">
              {LINKS.map((link, index) => (
                <motion.div 
                  key={link.label} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link to={link.href} className="block font-serif text-4xl text-cream hover:text-gold transition-colors tracking-wide">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom Contact Hook in Mobile Menu */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="absolute bottom-12 text-center"
            >
               <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2">Connect with us</p>
               <div className="flex gap-4 justify-center text-gold">
                  <a href="https://wa.me/923167059804" className="p-2 border border-white/10 rounded-full"><ShoppingBag size={18} /></a>
               </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;