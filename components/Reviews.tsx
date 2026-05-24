import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    text: "Hello ERISED Cafe! At the pop up I had the brownies and the chocolate wands and they were absolutely amazing <3 Loved the bow and the taste!"
  },
  {
    id: 2,
    text: "I ordered the chocolate iced latte and the cookies and cream milkshake and I'm kind of speechless, both were so flavourful. The Cookies and Cream milkshake was honestly just the right ratio of sweetness and taste. My absolute fave 10/10"
  },
  {
    id: 3,
    text: "The notes were SO yum and the packaging was so adorbs toog i really felt like it was curated with so much hardwork, insanely worth it, reasonable price and awesome work! loved the presentation"
  },
  {
    id: 4,
    text: "A frnd of mine ordered from u guys and he wouldnt shut up abt it so i wanted to to try it asw."
  }
];

const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-24 bg-cream relative overflow-hidden border-t border-slate-200/50">
      
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Testimonials</h2>
        <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-slate-300"></div>
            {/* Font size adjusted to be comparable but slightly smaller than Menu's 6xl */}
            <h3 className="text-3xl md:text-5xl font-serif text-navy">THEY LOVED OUR COFFEE</h3>
            <div className="h-px w-8 bg-slate-300"></div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-6xl mx-auto h-[400px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {REVIEWS.map((review, index) => {
            // Calculate offset for positioning
            let offset = index - activeIndex;
            
            // Handle wrapping for infinite feel
            if (offset < -1) offset += REVIEWS.length;
            if (offset > 1) offset -= REVIEWS.length;
            
            if (REVIEWS.length > 3) {
                const len = REVIEWS.length;
                if (Math.abs(index - activeIndex) > len / 2) {
                   offset = (index - activeIndex) > 0 
                     ? (index - activeIndex) - len 
                     : (index - activeIndex) + len;
                } else {
                   offset = index - activeIndex;
                }
            }

            const isActive = offset === 0;

            if (Math.abs(offset) > 1 && !isActive) return null;

            return (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : 0.6, // Increased from 0.4
                  scale: isActive ? 1 : 0.85,
                  x: offset * (window.innerWidth < 768 ? 0 : 380),
                  zIndex: isActive ? 10 : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(0.5px)', // Decreased from 2px
                  rotateY: isActive ? 0 : offset * 15,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                // Reduced width and height for a smaller box look
                className={`absolute w-[80%] md:w-[380px] bg-white p-8 md:p-10 rounded-2xl shadow-xl flex flex-col justify-center items-center h-[280px] md:h-[300px] cursor-pointer border border-slate-100`}
                onClick={() => setActiveIndex(index)}
                style={{ 
                    display: window.innerWidth < 768 && !isActive ? 'none' : 'flex'
                }}
              >
                <div className="text-center">
                   <Quote className="text-blue-100 w-10 h-10 mb-4 mx-auto" fill="currentColor" />
                   <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light italic">
                     "{review.text}"
                   </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-6 mt-4">
        <button 
            onClick={handlePrev}
            className="p-3 rounded-full bg-white text-navy shadow-md hover:bg-navy hover:text-white transition-all hover:scale-110"
        >
            <ChevronLeft size={20} />
        </button>
        
        <div className="flex space-x-3">
            {REVIEWS.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`transition-all duration-300 rounded-full ${
                        idx === activeIndex ? 'w-8 h-2 bg-blue-400' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                />
            ))}
        </div>

        <button 
            onClick={handleNext}
            className="p-3 rounded-full bg-white text-navy shadow-md hover:bg-navy hover:text-white transition-all hover:scale-110"
        >
            <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Reviews;