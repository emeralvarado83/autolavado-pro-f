import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSlider } from '../components/home/HeroSlider';
import { TipsSection } from '../components/home/TipsSection';

import { Services } from '../components/home/Services';

export const Home = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Centro Lavaggio Mosè | Lercara Friddi Palermo"
        description="Centro Lavaggio Mosè è un autolavaggio professionale a Lercara Friddi specializzato in lavaggio auto completo, pulizia interna e trattamenti per la cura del veicolo."
      />
      <HeroSlider />
      <TipsSection />

      <Services />
    </main>
  );
};
