import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LiquidPreloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const duration = 2200; // 2.2 seconds for the counter to hit 100
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Switch to the massive logo reveal
        setStage(2);
        // Wait 2 seconds to let the logo shine, then lift the curtain
        setTimeout(() => {
          onComplete();
        }, 2000); 
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy overflow-hidden"
      // The Cinematic "Curtain Reveal" swipe up
      exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }} 
    >
      {/* Ambient Magical Gold Glow in the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-gold/5 blur-[100px] md:blur-[150px] rounded-full animate-pulse"></div>
      </div>

      <AnimatePresence mode="wait">
        {stage === 1 ? (
          <motion.div
            key="counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} // Blurs out like magic
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center relative z-10 w-full px-8"
          >
            {/* The Number Counter */}
            <div className="font-serif text-gold text-6xl md:text-8xl font-light mb-8 tabular-nums">
              {progress}
            </div>
            
            {/* The Razor-thin Gold Progress Line */}
            <div className="w-48 md:w-80 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="mt-8 text-xs md:text-sm font-sans tracking-[0.5em] text-slate-400 uppercase">
              Revealing Magic
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="logo"
            // Emerges from the shadows scaled down and blurry
            initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center relative z-10 flex flex-col items-center justify-center w-full"
          >
            <motion.span 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4, duration: 1 }}
               className="block font-serif italic text-gold/70 text-xl md:text-3xl mb-2 md:mb-4"
            >
              The Magic of
            </motion.span>
            
            {/* MASSIVE TYPOGRAPHY */}
            <h1 className="font-serif text-white text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[11rem] tracking-[0.15em] font-bold leading-none pl-[0.15em] drop-shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              ERISED
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LiquidPreloader;