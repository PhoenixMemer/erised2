import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Timings from '../components/Timings';
import MenuCarousel from '../components/MenuCarousel';
import Reviews from '../components/Reviews';

const Home: React.FC = () => {
  const location = useLocation();

  // Handle the scroll for #about and #contact when landing from the Menu page
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        // Slight delay to ensure page render
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
      
      <div id="about">
        <Timings />
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