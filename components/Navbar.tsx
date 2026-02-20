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
          
          {/* LEFT: Hamburger (Mobile) OR Links (Desktop) */}
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

          {/* CENTER: Logo */}
          <Link to="/" className="flex-shrink-0 text-center group flex flex-col items-center justify-center">
            <span className="font-serif italic text-sm md:text-base text-slate-500 leading-none">cafe</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy tracking-widest leading-none mt-1 group-hover:text-gold transition-colors duration-500">
              ERISED
            </h1>
          </Link>

          {/* RIGHT: Links (Desktop) AND Cart (Mobile + Desktop) */}
          <div className="flex-1 flex items-center justify-end gap-6 md:gap-8">
            <div className="hidden md:flex items-center space-x-8">
              {LINKS.slice(2).map((link) => (
                <NavItem key={link.label} link={link} isActive={location.hash === link.href.replace('/', '')} />
              ))}
            </div>
            
            {/* The Cart is now visible on BOTH mobile and desktop */}
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

      {/* GLASSMORPHIC Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 bg-navy/80 flex flex-col items-center justify-center"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
              <X size={36} />
            </button>
            <div className="space-y-10 text-center">
              {LINKS.map((link) => (
                <div key={link.label} onClick={() => setMobileMenuOpen(false)}>
                  <Link to={link.href} className="block font-serif text-4xl text-cream hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;