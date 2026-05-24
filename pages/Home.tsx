import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
// IMPORT DEALS INSTEAD OF TIMINGS
import Deals from '../components/Deals'; 
import MenuCarousel from '../components/MenuCarousel';
import Reviews from '../components/Reviews';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main>
      <div id="home">
        <Hero />
      </div>
      
      {/* REPLACE TIMINGS WITH DEALS */}
      <div id="deals">
        <Deals />
      </div>
      
      <div id="featured">
        <MenuCarousel />
      </div>

<div id="reviews">
        <Reviews />
      </div>

      {/* THE NEW ABOUT SECTION */}
      <section id="about" className="py-32 bg-white relative">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-4">
            Established 2025
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-8">
            THE MAGIC BEHIND THE MUG
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-8"></div>
          <p className="text-slate-500 font-sans text-lg md:text-xl leading-relaxed font-light">
            Hidden away from the bustling Muggle streets, Cafe Erised was founded on a simple principle: to brew coffee that reflects your deepest, most desperate desires. Whether you need a midnight study potion or a morning elixir, our cauldrons are always warm.
          </p>
        </div>
      </section>

    </main>
  );
};


export default Home;