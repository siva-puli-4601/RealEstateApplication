import React from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedProperties } from './components/home/FeaturedProperties';
import { TrendingProperties } from './components/home/TrendingProperties';
import { FeaturedLocations } from './components/home/FeaturedLocations';
import { Footer } from './components/layout/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <TrendingProperties />
        <FeaturedLocations />
      </main>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;