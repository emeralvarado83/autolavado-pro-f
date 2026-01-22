import React from 'react';
import { useContent } from '../../context/ContentContext';
import { motion } from 'framer-motion';

export const Gallery = () => {
  const { content, loading } = useContent();
  const images = content.gallery.filter(img => img.active);

  if (loading) {
    return (
      <section id="galeria" className="py-20 bg-slate-50 min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  return (
    <section id="galeria" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestra Galería</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Resultados reales de nuestros servicios de lavado y detallado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, idx) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md cursor-pointer"
            >
              <img
                src={image.url}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
