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
    </main>
  );
};

export default Home;