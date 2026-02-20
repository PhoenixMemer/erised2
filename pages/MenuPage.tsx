import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Hot Potions' | 'Cold Elixirs' | 'For The Muggles';
}

// I have added placeholder descriptions to every item. 
// Just replace the text inside the quotes with your actual descriptions!
const MENU_DATA: MenuItem[] = [
  // Hot Potions
  {
    id: 'h1',
    category: 'Hot Potions',
    name: 'Butterscotch Firebolt',
    price: 480,
    description: 'A warming blend of rich butterscotch and steamed milk with a hint of cinnamon.'
  },
  {
    id: 'h2',
    category: 'Hot Potions',
    name: 'London Fog Earl Grey',
    price: 350,
    description: 'Classic Earl Grey tea steeped in steamed vanilla milk and lavender syrup.'
  },
  {
    id: 'h3',
    category: 'Hot Potions',
    name: 'Rose Vanilla Sleep Latte',
    price: 420,
    description: 'Decaffeinated espresso infused with calming rose water and sweet vanilla.'
  },
  // Cold Elixirs
  {
    id: 'c1',
    category: 'Cold Elixirs',
    name: 'Butterbeer',
    price: 710,
    description: 'The wizarding classic. Rich butterscotch cream soda topped with cold foam.'
  },
  {
    id: 'c2',
    category: 'Cold Elixirs',
    name: 'Creme Brulee Latte',
    price: 680,
    description: 'Iced espresso with caramelized sugar syrup and a torched sugar topping.'
  },
  {
    id: 'c3',
    category: 'Cold Elixirs',
    name: 'Brown Sugar Shaken Espresso',
    price: 520,
    description: 'Vigourously shaken espresso with dark brown sugar and a splash of oat milk.'
  },
  // For The Muggles
  {
    id: 'm1',
    category: 'For The Muggles',
    name: 'Spanish Latte',
    price: 520,
    description: 'A sweet, creamy classic made with sweetened condensed milk and rich espresso.'
  },
  {
    id: 'm2',
    category: 'For The Muggles',
    name: 'Chocolate Wands (5pcs)',
    price: 250,
    description: 'Crispy biscuit sticks heavily coated in premium dark Belgian chocolate.'
  }
];

const categories = ['Hot Potions', 'Cold Elixirs', 'For The Muggles'];

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Scroll spy / Active category logic
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for the fixed/sticky headers
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveCategory(id);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-navy font-sans selection:bg-gold selection:text-white cursor-default">
      <div className="flex flex-col md:flex-row min-h-screen max-w-[1400px] mx-auto">
        
        {/* Sidebar (Light Mode) */}
        <div className="w-full md:w-1/4 md:h-screen md:sticky md:top-0 bg-cream p-8 md:p-12 flex flex-col justify-between z-20">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center text-slate-500 hover:text-navy transition-colors mb-16 uppercase tracking-widest text-xs font-bold"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>

            <div className="mb-16">
               <span className="font-serif italic text-slate-400 text-sm">The</span>
               <h1 className="font-serif text-4xl text-navy mt-1 mb-4">GRIMOIRE</h1>
               <div className="h-[1px] w-12 bg-gold"></div>
            </div>

            <nav className="space-y-6 hidden md:block">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleScroll(cat)}
                  className={`block text-left font-serif text-lg transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'text-gold translate-x-2 font-bold' 
                      : 'text-slate-400 hover:text-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:block text-slate-400 text-xs tracking-widest leading-relaxed">
            <p>EST. 1996</p>
            <p>DIAGON ALLEY, LONDON</p>
          </div>
        </div>

        {/* Main Menu Content (The "Card") */}
        <div className="w-full md:w-3/4 p-4 md:p-12 md:py-16">
           
           {/* The White Menu Card */}
           <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-16 max-w-4xl mx-auto">
             
             {/* Decorative Top Line */}
             <div className="w-full flex justify-center mb-16">
               <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
             </div>

             <div className="space-y-24 pb-12">
               {categories.map((cat) => (
                 <section key={cat} id={cat} className="scroll-mt-32">
                   
                   {/* Category Header */}
                   <div className="text-center mb-12">
                     <h2 className="text-gold font-serif text-3xl md:text-4xl italic">
                        {cat}
                     </h2>
                     <div className="mt-4 flex justify-center items-center gap-2 text-gold/30">
                       <span>✧</span><span>✧</span><span>✧</span>
                     </div>
                   </div>
                   
                   {/* Menu Items List */}
                   <div className="space-y-10">
                      {MENU_DATA.filter(item => item.category === cat).map((item) => (
                          <motion.div 
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-50px" }}
                              className="group"
                          >
                              {/* Name and Price Row */}
                              <div className="flex items-baseline justify-between mb-2">
                                  <h3 className="font-serif text-xl md:text-2xl text-navy font-bold">
                                      {item.name}
                                  </h3>
                                  
                                  {/* Dotted Leader Line */}
                                  <div className="flex-grow mx-4 border-b-2 border-dotted border-slate-200 relative top-[-6px]"></div>
                                  
                                  <span className="font-serif text-gold text-lg md:text-xl font-bold">
                                      {item.price}
                                  </span>
                              </div>
                              
                              {/* Description Line */}
                              <p className="text-slate-500 font-sans font-light text-sm md:text-base pr-12 leading-relaxed">
                                  {item.description}
                              </p>
                          </motion.div>
                      ))}
                   </div>
                 </section>
               ))}
             </div>

             {/* Footer Note inside the card */}
             <div className="mt-16 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs tracking-[0.2em] uppercase">
                All prices are in local currency. Please inform us of any allergies.
             </div>
             
           </div>
        </div>

      </div>
    </div>
  );
};

export default MenuPage;