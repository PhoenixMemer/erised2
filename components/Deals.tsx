import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

// IMPORT YOUR IMAGES HERE! Ensure the names match your files in the assets folder.
import examLeakImg from './assets/exam-leak.jpg';
import deal1Img from './assets/deal-1.jpg'; // Optional side deal
import deal2Img from './assets/deal-2.jpg'; // Optional side deal

const Deals: React.FC = () => {
  return (
    <section id="deals" className="py-24 bg-white relative overflow-hidden">
      {/* Background Aesthetic Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-30"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold flex items-center justify-center gap-2 mb-4">
            <Sparkles size={14} /> Limited Time Offers
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-navy mb-4">THE VAULT</h2>
          <div className="w-16 h-[2px] bg-gold mx-auto"></div>
        </div>

        {/* The Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">
          
          {/* 1. MAIN HERO DEAL (Exam Leak) - Spans 2 columns on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg border border-slate-100"
          >
            {/* The Image */}
            <div className="absolute inset-0 bg-navy">
              <img 
                src={examLeakImg} 
                alt="Exam Leak Special" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent"></div>

            {/* The Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <div className="bg-gold text-navy text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4">
                Latest Deal
              </div>
              <h3 className="font-serif text-3xl md:text-5xl text-white mb-2 leading-tight">
                The Exam Leak Deal
              </h3>
              <p className="text-slate-300 font-sans text-sm md:text-white max-w-md mb-6">
                Fuel your late-night study sessions with our exclusive student bundles. Bring your student ID.
              </p>
              
              {/* Fake Button */}
              <div className="inline-flex items-center text-gold font-bold text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                Claim Offer <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </motion.div>

          {/* 2. SIDE DEAL 1 (Right top) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg border border-slate-100"
          >
            <div className="absolute inset-0 bg-cream">
              <img 
                src={deal1Img} 
                alt="Special Offer" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute bottom-6 left-6 right-6">
               <h3 className="font-serif text-2xl text-white drop-shadow-md mb-1">Buy 1 Get 1 Free</h3>
               <p className="text-white/80 text-sm drop-shadow-sm">On all Iced Lattes.</p>
            </div>
          </motion.div>

          {/* 3. SIDE DEAL 2 (Right bottom - if you need it to span lower, adjust the grid, or just add another card) */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg bg-navy flex items-center justify-center p-8 text-center border border-gold/20"
          >
             <div className="relative z-10">
                <span className="font-serif italic text-gold text-xl block mb-2">Weekend Special</span>
                <h3 className="font-serif text-3xl text-white mb-4">20% OFF PASTRIES</h3>
                <p className="text-slate-400 text-sm mb-6">Pair any slice of cake with our signature pour-over.</p>
                <button className="px-6 py-2 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors rounded">
                   View Menu
                </button>
             </div>
             {/* Optional faint image overlay in background */}
             <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                <img src={deal2Img} alt="bg" className="w-full h-full object-cover" />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Deals;