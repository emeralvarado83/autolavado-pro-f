import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSlider } from '../components/home/HeroSlider';
import { TipsSection } from '../components/home/TipsSection';
import { Gallery } from '../components/home/Gallery';
import { Services } from '../components/home/Services';

export const Home = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Autolavado Pro | Inicio"
        description="El mejor servicio de lavado de autos. Calidad y profesionalismo para tu vehículo."
      />
      <HeroSlider />
      <TipsSection />
      <Gallery />
      <Services />
    </main>
  );
};
