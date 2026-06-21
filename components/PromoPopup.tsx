import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { track } from '@vercel/analytics';

interface PromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoPopup: React.FC<PromoPopupProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Track that the popup was viewed
      track('promo_popup_viewed', { promo: "Fathers Day 10%" });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleClaim = () => {
    track('promo_popup_clicked', { promo: "Fathers Day 10%" });
    onClose();
    navigate('/menu');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
          />

          {/* The Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-cream rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full text-white md:text-navy md:bg-black/5 hover:bg-gold hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Side: Image (Stacks on top for mobile) */}
            <div className="w-full md:w-1/2 h-48 md:h-auto relative bg-navy">
              <img 
                src="https://cdn.discordapp.com/attachments/1272225271541530675/1518199144697827379/589622029_17855042448581032_1665473122728878646_n.jpg?ex=6a390ca2&is=6a37bb22&hm=95d986202217ba2b0e8b3eb5ea2c15e2b95038479263698be46cb3443eb627a5&" 
                alt="Father's Day Special!" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent md:bg-gradient-to-r"></div>
              
              {/* Optional Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 text-white md:hidden">
                 <h3 className="font-serif text-2xl">Happy Father's Day!</h3>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-white">
              
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                <Gift size={24} />
              </div>

              <span className="text-slate-400 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-3">
                Exclusive Weekend Offer
              </span>
              
              <h2 className="font-serif text-3xl md:text-5xl text-navy mb-4 leading-tight hidden md:block">
                Happy<br />Father's Day!
              </h2>

              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-xs">
                Treat the hero in your life. Enjoy <strong className="text-gold">10% OFF</strong> till midnight.
              </p>

              {/* Promo Code Box */}
              <div className="w-full border-2 border-dashed border-gold/30 rounded-xl p-4 mb-8 bg-gold/5 relative group cursor-pointer" onClick={() => navigator.clipboard.writeText('MARAUDER10')}>
                 <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1">Use Code at WhatsApp Checkout</span>
                 <span className="font-serif text-2xl text-navy font-bold tracking-widest group-hover:text-gold transition-colors">MARAUDER10</span>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-3">
                <button 
                  onClick={handleClaim}
                  className="w-full bg-navy text-white py-4 rounded-xl uppercase tracking-widest text-sm font-bold transition-all hover:bg-gold hover:shadow-lg hover:shadow-gold/30"
                >
                  Order Now
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-3 text-slate-400 text-xs uppercase tracking-widest font-bold hover:text-navy transition-colors"
                >
                  No thanks, continue to site
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;