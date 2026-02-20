import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden">
      
      {/* Background Decorative Text */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0">
        <h1 className="text-[12rem] md:text-[18rem] font-serif text-navy/5 leading-none tracking-widest select-none">
          MATCHA
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
          >
            <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-slate-500 font-bold">
              Drink to your heart's desire
            </h2>
            
            <h1 className="text-6xl md:text-8xl font-serif text-navy relative">
              MATCHA
            </h1>
            
            <p className="max-w-md text-slate-600 text-lg leading-relaxed font-light">
              The superfood green tea. Matcha is a vibrant, finely milled powder known for delivering a focused, calm energy and a wealth of antioxidants.
            </p>
            
            <button 
              onClick={() => navigate('/menu')}
              className="px-10 py-4 bg-navy text-white font-sans uppercase tracking-widest text-sm btn-animate hover:bg-gold hover:text-navy hover:border-gold"
            >
              View Full Menu
            </button>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center relative"
          >
            {/* Image Placeholder */}
            <div className="relative w-72 h-96 md:w-[28rem] md:h-[36rem]">
               {/* Shadow/Glow effect */}
               <div className="absolute inset-0 bg-navy/20 blur-3xl rounded-full scale-75 translate-y-12"></div>
               <img 
                src="https://images.unsplash.com/photo-1582650085442-d6210f96e4b9?q=80&w=800&auto=format&fit=crop" 
                alt="Premium Matcha Drink" 
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-navy/20"></div>
      </motion.div>
    </section>
  );
};

export default Hero;