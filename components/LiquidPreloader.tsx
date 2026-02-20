import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LiquidPreloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds loading

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="loader">
        <div className="slider" style={{ "--i": 0 } as React.CSSProperties}></div>
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-8 font-serif text-cream text-2xl tracking-[0.3em] font-light"
      >
        ERISED
      </motion.h1>

      <style>{`
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          transform: scale(1.5); /* Make it a bit bigger */
        }

        .slider {
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.05); /* Glassy background */
          margin: 0 15px;
          height: 80px;
          width: 25px; /* Narrow pill */
          border-radius: 30px;
          box-shadow: 
            0px 0px 20px rgba(0, 0, 0, 0.2), 
            inset 0 0 10px rgba(0,0,0,0.5);
          position: relative;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .slider::before {
          content: "";
          position: absolute;
          top: 0;
          left: -20px; /* Center the wide wave horizontally relative to the narrow container */
          height: 20px;
          width: 70px; /* Wider than container to allow rotation without gaps */
          border-radius: 40%;
          
          /* The Liquid Body - Cream Color */
          box-shadow: 
            inset 0px 0px 0px rgba(0, 0, 0, 0.3), 
            0px 420px 0 400px #f8fafc, /* The milky cream liquid */
            inset 0px 0px 0px rgba(0, 0, 0, 0.1);
            
          animation: animate_liquid 2.5s ease-in-out infinite;
        }

        @keyframes animate_liquid {
          0% {
            transform: translateY(250px) rotate(-80deg);
          }
          50% {
            transform: translateY(0) rotate(0deg); /* Peaks at top */
          }
          100% {
            transform: translateY(250px) rotate(80deg);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default LiquidPreloader;