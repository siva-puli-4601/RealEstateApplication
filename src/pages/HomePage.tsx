import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { TrendingProperties } from '../components/home/TrendingProperties';
import { FeaturedLocations } from '../components/home/FeaturedLocations';

 const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <TrendingProperties />
      <FeaturedLocations />
    </>
  );
};

export default HomePage;