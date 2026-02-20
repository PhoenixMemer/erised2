import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  category: 'Hot Potions' | 'Cold Elixirs' | 'For The Muggles';
  image: string;
}

const MENU_DATA: MenuItem[] = [
  // Hot Potions
  {
    id: 'h1',
    category: 'Hot Potions',
    name: 'Butterscotch Firebolt',
    price: 480,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'h2',
    category: 'Hot Potions',
    name: 'London Fog Earl Grey',
    price: 350,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'h3',
    category: 'Hot Potions',
    name: 'Rose Vanilla Sleep Latte',
    price: 420,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b5c7fa5b?q=80&w=600&auto=format&fit=crop'
  },
  // Cold Elixirs
  {
    id: 'c1',
    category: 'Cold Elixirs',
    name: 'Butterbeer',
    price: 710,
    description: 'The wizarding classic. Rich butterscotch cream soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'c2',
    category: 'Cold Elixirs',
    name: 'Creme Brulee Latte',
    price: 680,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'c3',
    category: 'Cold Elixirs',
    name: 'Brown Sugar Shaken Espresso',
    price: 520,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop'
  },
  // For The Muggles
  {
    id: 'm1',
    category: 'For The Muggles',
    name: 'Spanish Latte',
    price: 520,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'm2',
    category: 'For The Muggles',
    name: 'Chocolate Wands (5pcs)',
    price: 250,
    image: 'https://images.unsplash.com/photo-1623942472652-32b0059f139e?q=80&w=600&auto=format&fit=crop'
  }
];

const categories = ['Hot Potions', 'Cold Elixirs', 'For The Muggles'];

const MenuPage: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Track mouse movement for the floating image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll spy / Active category logic (simplified for sticky sidebar)
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveCategory(id);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-navy text-cream font-sans selection:bg-gold selection:text-navy cursor-default">
      {/* Floating Image Cursor Effect */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: mousePosition.x + 20, 
              y: mousePosition.y - 120,
              rotate: 5
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="fixed z-50 pointer-events-none hidden md:block"
          >
            <div className="relative">
                <div className="absolute -inset-2 bg-gold/30 blur-xl rounded-full"></div>
                <img 
                src={hoveredItem.image} 
                alt={hoveredItem.name}
                className="w-48 h-64 object-cover rounded-lg shadow-2xl border-2 border-gold/50"
                />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* Sticky Sidebar */}
        <div className="w-full md:w-1/4 md:h-screen md:sticky md:top-0 bg-navy border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-between z-20">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center text-gold/70 hover:text-gold transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>

            <div className="mb-12">
               <span className="font-serif italic text-slate-500 text-sm">The</span>
               <h1 className="font-serif text-4xl text-white mt-1 mb-2">GRIMOIRE</h1>
               <div className="h-[1px] w-12 bg-gold"></div>
            </div>

            <nav className="space-y-6 hidden md:block">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleScroll(cat)}
                  className={`block text-left font-serif text-xl transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'text-gold translate-x-4' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:block text-slate-600 text-xs tracking-widest leading-relaxed">
            <p>EST. 1996</p>
            <p>DIAGON ALLEY, LONDON</p>
          </div>
        </div>

        {/* Main Menu Content */}
        <div className="w-full md:w-3/4 p-6 md:p-20 bg-navy relative">
           
           {/* Background Watermark */}
           <div className="fixed top-1/2 right-20 -translate-y-1/2 pointer-events-none opacity-[0.02]">
              <Sparkles size={600} />
           </div>

           <div className="max-w-3xl mx-auto space-y-24 pb-20">
             {categories.map((cat) => (
               <section key={cat} id={cat} className="scroll-mt-24">
                 <h2 className="text-gold font-serif text-3xl md:text-5xl mb-12 flex items-center">
                    <span className="mr-4 opacity-50 text-2xl">✦</span> 
                    {cat}
                 </h2>
                 
                 <div className="space-y-12">
                    {MENU_DATA.filter(item => item.category === cat).map((item) => (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="group relative cursor-pointer"
                        >
                            <div className="flex items-baseline justify-between border-b border-white/5 pb-4 transition-all duration-500 group-hover:border-gold/30">
                                <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-gold transition-colors duration-300">
                                    {item.name}
                                </h3>
                                <div className="flex-grow mx-4 border-b border-dotted border-white/20 relative top-[-6px]"></div>
                                <span className="font-mono text-gold text-lg md:text-xl">
                                    {item.price}
                                </span>
                            </div>
                            
                            {item.description && (
                                <p className="mt-2 text-slate-400 font-light italic text-sm md:text-base group-hover:text-slate-300 transition-colors">
                                    {item.description}
                                </p>
                            )}
                        </motion.div>
                    ))}
                 </div>
               </section>
             ))}
           </div>
           
           <div className="mt-24 text-center text-slate-600 text-xs tracking-[0.3em]">
              All prices in Galleons (or local currency equivalent).
           </div>
        </div>

      </div>
    </div>
  );
};

export default MenuPage;