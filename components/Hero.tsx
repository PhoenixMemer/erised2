import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import matchaImg from './assets/matcha-drink.png';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 md:pt-32 overflow-hidden">
      
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0">
        <h1 className="text-[8rem] md:text-[18rem] font-serif text-navy/5 leading-none tracking-widest select-none">
          MATCHA
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8"
          >
            <h2 className="text-xs md:text-sm tracking-[0.3em] uppercase text-slate-500 font-bold">
              Drink to your heart's desire
            </h2>
            <h1 className="text-5xl md:text-8xl font-serif text-navy relative">
              MATCHA
            </h1>
            <p className="max-w-md text-slate-600 text-base md:text-lg leading-relaxed font-light px-4 md:px-0">
              The superfood green tea. Matcha is a vibrant, finely milled powder known for delivering a focused, calm energy and a wealth of antioxidants.
            </p>
            <button onClick={() => navigate('/menu')} className="px-8 md:px-10 py-4 bg-navy text-white font-sans uppercase tracking-widest text-xs md:text-sm btn-animate hover:bg-gold hover:text-navy hover:border-gold">
              View Full Menu
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center relative w-full"
          >
            {/* SHRUNK CONTAINER & OBJECT CONTAIN */}
            <div className="relative w-56 h-72 md:w-[22rem] md:h-[28rem] flex items-center justify-center">
               <div className="absolute inset-0 bg-navy/20 blur-3xl rounded-full scale-75 translate-y-8"></div>
               <motion.img 
                src={matchaImg}
                alt="Premium Matcha Drink" 
                className="relative w-full h-full object-contain drop-shadow-2xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;