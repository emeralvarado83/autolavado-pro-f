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
        title="Autolavaggio Pro | Home"
        description="Il miglior servizio di lavaggio auto. Qualità e professionalità per il tuo veicolo."
      />
      <HeroSlider />
      <TipsSection />
      <Gallery />
      <Services />
    </main>
  );
};
