import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';

// IMPORT YOUR IMAGES HERE! Ensure the names match your files in the assets folder.
import examLeakImg from './assets/exam-leak.jpg';
import deal1Img from './assets/deal-1.jpg'; 

const Deals: React.FC = () => {
  
  // The WhatsApp API Helper Function
  const handleClaimDeal = (dealName: string) => {
    const phoneNumber = "923167059804";
    const message = `*New Deal Claim*\n\nHi Cafe Erised, I would like to claim the *${dealName}*! I am ordering directly from the website and would like some detail on it.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="deals" className="py-24 bg-white relative overflow-hidden">
      {/* Background Aesthetic Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-30"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Section Header (Sparkles Removed) */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-4">
            Limited Time Offers
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-navy mb-4">THE VAULT</h2>
          <div className="w-16 h-[2px] bg-gold mx-auto"></div>
        </div>

        {/* The Bento Box Grid (Perfectly flush 1-row grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* 1. MAIN HERO DEAL (Exam Leak) - 2 Columns wide */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => handleClaimDeal("Exam Leak Student Bundle")}
            className="md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 h-[400px] md:h-[500px]"
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
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent"></div>

            {/* The Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col justify-end h-full">
              <div>
                <div className="bg-gold text-navy text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4 shadow-lg shadow-gold/20">
                  Top Secret
                </div>
                <h3 className="font-serif text-4xl md:text-5xl text-white mb-3 leading-tight">
                  The Exam Leak Deal
                </h3>
                <p className="text-slate-300 font-sans text-sm md:text-white max-w-md mb-6 leading-relaxed">
                  Fuel your late-night study sessions with our exclusive student bundles. Bring your student ID.
                </p>
                
                {/* Call to Action Button */}
                <div className="inline-flex items-center text-gold font-bold text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300">
                  Claim Now <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. SIDE DEAL 1 (BOGO) - 1 Column wide */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => handleClaimDeal("Buy 1 Get 1 Free Iced Latte")}
            className="md:col-span-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 h-[400px] md:h-[500px]"
          >
            {/* The Image */}
            <div className="absolute inset-0 bg-cream">
              <img 
                src={deal1Img} 
                alt="Special Offer" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Rich Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-black/10 group-hover:from-navy transition-colors duration-500"></div>
            
            {/* Floating Badge */}
            <div className="absolute top-6 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Rs650
              </div>
            </div>

            {/* The Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full">
               <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
                 Buy 1 <br/>Get 1 Free
               </h3>
               <p className="text-gold font-sans text-sm tracking-wide mb-6">
                 On our most ordered Cookies & Cream milkshake.
               </p>

               {/* Interactive Claim Button */}
               <div className="flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                 <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-navy transition-all duration-300">
                   <Send size={14} />
                 </div>
                 Claim Now
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Deals;