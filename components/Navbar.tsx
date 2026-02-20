import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSidebar from './CartSidebar';

interface NavLink {
  label: string;
  href: string;
}

const LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/#about' }, // Hash link for scrolling
  { label: 'Contact', href: '/#contact' },
];

const NavItem: React.FC<{ link: NavLink; isActive: boolean }> = ({ link, isActive }) => {
  return (
    <div className="relative group overflow-hidden">
      {/* Use Link for everything. 
         If it's a hash link (like /#about), React Router handles the path change 
         and the browser handles the scroll.
      */}
      <Link 
        to={link.href}
        className={`relative z-10 text-sm tracking-widest uppercase transition-colors duration-500 ${
          isActive ? 'text-navy font-bold' : 'text-slate-600 group-hover:text-navy'
        }`}
      >
        {link.label}
      </Link>
      
      {/* The "Strikethrough" Hover Effect */}
      <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold transform transition-transform duration-500 origin-left ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}></span>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'py-4 bg-cream/80 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* 1. Left Links */}
          <div className="hidden md:flex items-center space-x-12">
            {LINKS.slice(0, 2).map((link) => (
              <NavItem 
                key={link.label} 
                link={link} 
                isActive={location.pathname === link.href} 
              />
            ))}
          </div>

          {/* 2. Logo (Centered) */}
          <Link to="/" className="text-center group">
            <h1 className="font-serif text-3xl md:text-4xl text-navy tracking-tighter">
              cafe
              <span className="block text-4xl md:text-5xl font-bold -mt-2 group-hover:text-gold transition-colors duration-500">
                ERISED
              </span>
            </h1>
          </Link>

          {/* 3. Right Links */}
          <div className="hidden md:flex items-center space-x-12">
            {LINKS.slice(2).map((link) => (
              <NavItem 
                key={link.label} 
                link={link} 
                isActive={location.hash === link.href.replace('/', '')} 
              />
            ))}
            
          {/* Bag Icon */}
        <button 
        onClick={() => setIsCartOpen(true)} // <-- ADD THIS
        className="relative group"
>
       <ShoppingBag className="w-5 h-5 text-navy transition-transform group-hover:scale-110" />
         {itemCount > 0 && (
         <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-[10px] text-white flex items-center justify-center rounded-full animate-bounce">
           {itemCount}
         </span>
              )}
        </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-navy"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white"
            >
              <X size={32} />
            </button>
            
            <div className="space-y-8 text-center">
              {LINKS.map((link) => (
                <div key={link.label} onClick={() => setMobileMenuOpen(false)}>
                  <Link 
                    to={link.href}
                    className="block font-serif text-4xl text-cream hover:text-gold transition-colors"
                  >
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

const [isCartOpen, setIsCartOpen] = useState(false);

export default Navbar;