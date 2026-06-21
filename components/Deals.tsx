import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { track } from '@vercel/analytics';

// IMPORT YOUR IMAGES HERE! 
// Just change the file names to match the images you drop in your assets folder
import deal1Img from './assets/deal-1.jpg'; // For Buy 1 Get 1 Free
import deal2Img from './assets/deal-2.jpg'; // For the Cookies & Cream deal
import deal3Img from './assets/deal-3.jpg'; // For the 3rd deal

const Deals: React.FC = () => {
  
  const handleClaimDeal = (dealName: string) => {
    // Analytics tracking for your Vercel Dashboard
    track('claim_deal_click', { deal: dealName });

    const phoneNumber = "923167059804";
    const message = `*✨ New Deal Claim ✨*\n\nHi Cafe Erised, I would like to claim the *${dealName}*!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="deals" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-30"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-4">
            Limited Time Offers
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-navy mb-4">THE VAULT</h2>
          <div className="w-16 h-[2px] bg-gold mx-auto"></div>
        </div>

        {/* Changed to a perfectly balanced 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* DEAL 1 (Cookies & Cream) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => handleClaimDeal("Chocolate Wands Special")}
            className="md:col-span-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 h-[400px] md:h-[500px]"
          >
            <div className="absolute inset-0 bg-cream">
              <img 
                src={deal2Img} 
                alt="Chocolate Wands" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-black/10 group-hover:from-navy transition-colors duration-500"></div>
            
            <div className="absolute top-6 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                New Arrival
              </div>
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full">
               <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
                 Chocolate<br/>Wands
               </h3>
               <p className="text-gold font-sans text-sm tracking-wide mb-6">
                 Discover your magic.
               </p>

               <div className="flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                 <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-navy transition-all duration-300">
                   <Send size={14} />
                 </div>
                 Claim Now
               </div>
            </div>
          </motion.div>

          {/* DEAL 2 (Placeholder for your other new deal) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => handleClaimDeal("Summer Refresh Deal")}
            className="md:col-span-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 h-[400px] md:h-[500px]"
          >
            <div className="absolute inset-0 bg-cream">
              <img 
                src={deal3Img} 
                alt="Summer Refresh" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-black/10 group-hover:from-navy transition-colors duration-500"></div>
            
            <div className="absolute top-6 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Limited Time
              </div>
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full">
               <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
                 Summer<br/>Refresh
               </h3>
               <p className="text-gold font-sans text-sm tracking-wide mb-6">
                 Cool off with our iced classics.
               </p>

               <div className="flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                 <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-navy transition-all duration-300">
                   <Send size={14} />
                 </div>
                 Claim Now
               </div>
            </div>
          </motion.div>

          {/* DEAL 3 (The original Buy 1 Get 1 Free) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => handleClaimDeal("Buy 1 Get 1 Free Iced Latte")}
            className="md:col-span-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 h-[400px] md:h-[500px]"
          >
            <div className="absolute inset-0 bg-cream">
              <img 
                src={deal1Img} 
                alt="BOGO Offer" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-black/10 group-hover:from-navy transition-colors duration-500"></div>
            
            <div className="absolute top-6 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Weekend Only
              </div>
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full">
               <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
                 Buy 1 <br/>Get 1 Free
               </h3>
               <p className="text-gold font-sans text-sm tracking-wide mb-6">
                 On all signature Iced Lattes.
               </p>

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