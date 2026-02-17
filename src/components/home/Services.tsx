import React, { useState } from "react";
import { useContent } from "../../context/ContentContext";
import { Loader2 } from "lucide-react";
import { VehicleCategoryGrid } from "./VehicleCategoryGrid";
import { ServicePopup } from "./ServicePopup";
import { VehicleCategory } from "../../types";

export const Services = () => {
  const { content, loading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Use vehicleCategories from content, fallback to empty array if not loaded yet
  const categories = content.vehicleCategories || [];

  const handleCategoryClick = (category: VehicleCategory) => {
    setSelectedCategory(category);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // Add small delay to clear selection after animation if needed, 
    // or keep it to prevent content flash when reopening
    setTimeout(() => setSelectedCategory(null), 200);
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            I Nostri Servizi
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Seleziona il tuo tipo di veicolo per vedere i servizi dedicati e i dettagli dei nostri trattamenti.
          </p>
        </div>

        {/* Vehicle Categories Grid */}
        {categories.length > 0 ? (
          <VehicleCategoryGrid
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">Nessuna categoria di veicoli disponibile.</p>
          </div>
        )}

        {/* Service Popup */}
        <ServicePopup
          category={selectedCategory}
          isOpen={isPopupOpen}
          onClose={closePopup}
        />

      </div>
    </section>
  );
};
