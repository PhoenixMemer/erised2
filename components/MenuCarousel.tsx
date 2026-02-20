import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { MenuItem } from '../types';

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    title: 'Cold Coffee',
    description: 'Our signature brew, perfectly cooled and ready to refresh.',
    price: 'Rs3000',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Oreo Milkshake',
    description: 'Crushed Oreos blended into a creamy, dreamy classic.',
    price: 'Rs5000',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Cinnamon Roll Latte',
    description: 'Espresso, steamed milk, and cinnamon vanilla goodness.',
    price: 'Rs4500',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Hot Chocolate',
    description: 'A classic comfort drink: creamy, decadent, and utterly satisfying.',
    price: 'Rs3500',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop'
  }
];

const MenuCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MENU_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
  };

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="menu" className="py-24 bg-cream min-h-screen flex flex-col justify-center relative">
      
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-serif text-navy mb-4">CHOOSE YOUR ORDER</h2>
        <div className="w-16 h-1 bg-navy mx-auto"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center overflow-hidden">
        
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-12 z-20 p-3 rounded-full bg-white/80 hover:bg-white text-navy shadow-lg transition-all"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-12 z-20 p-3 rounded-full bg-white/80 hover:bg-white text-navy shadow-lg transition-all"
        >
          <ChevronRight size={32} />
        </button>

        <div className="flex items-center justify-center perspective-1000 h-full w-full">
           <AnimatePresence mode="popLayout">
             {MENU_ITEMS.map((item, index) => {
               let offset = index - activeIndex;
               if (offset < -1) offset += MENU_ITEMS.length;
               if (offset > 1) offset -= MENU_ITEMS.length;

               const isActive = offset === 0;
               const isVisible = isActive || offset === -1 || offset === 1;
               const isLiked = likedItems.has(item.id);

               if (!isVisible) return null;

               return (
                 <motion.div
                    key={item.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: isActive ? 1.1 : 0.9,
                      opacity: isActive ? 1 : 0.5,
                      x: offset * (window.innerWidth < 768 ? 150 : 350),
                      zIndex: isActive ? 10 : 1,
                      backgroundColor: isActive ? '#0f172a' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#334155',
                    }}
                    whileHover={!isActive ? { 
                      scale: 0.95, 
                      opacity: 0.8,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)"
                    } : {}}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`absolute w-[280px] md:w-[320px] rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-between h-[450px] md:h-[500px] cursor-pointer`}
                    onClick={() => setActiveIndex(index)}
                 >
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 border-4 border-cream shadow-md -mt-16 bg-white">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="text-center flex-grow flex flex-col justify-center">
                       {isActive && (
                         <div className="mb-2">
                           <span className="font-serif italic text-xs tracking-widest opacity-70">cafe</span>
                           <h3 className="font-serif text-xl tracking-widest">ERISED</h3>
                         </div>
                       )}

                       <h3 className={`font-serif font-bold mb-4 leading-tight ${isActive ? 'text-3xl' : 'text-2xl'}`}>
                         {item.title.split(' ').map((word, i) => (
                           <span key={i} className="block">{word}</span>
                         ))}
                       </h3>

                       <p className={`text-sm mb-6 ${isActive ? 'text-gray-300' : 'text-slate-500'}`}>
                         {item.description}
                       </p>
                    </div>

                    {isActive && (
                      <div className="w-full flex justify-between items-center mt-4">
                        <span className="bg-white text-navy px-4 py-2 text-lg font-bold rounded">
                          {item.price}
                        </span>
                        <motion.button 
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => toggleLike(item.id, e)}
                          className={`transition-colors duration-300 ${isLiked ? 'text-pink-500' : 'text-white hover:text-pink-300'}`}
                        >
                          <motion.div
                            animate={isLiked ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : {}}
                            transition={{ duration: 0.4 }}
                          >
                            <Heart 
                              size={28} 
                              fill={isLiked ? "currentColor" : "none"} 
                              strokeWidth={isLiked ? 0 : 2}
                            />
                          </motion.div>
                        </motion.button>
                      </div>
                    )}
                 </motion.div>
               );
             })}
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MenuCarousel;    