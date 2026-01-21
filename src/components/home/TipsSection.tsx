import React from 'react';
import { useContent } from '../../context/ContentContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const TipsSection = () => {
  const { content } = useContent();
  const { tips } = content;

  return (
    <section id="consejos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 px-4 py-2 rounded-full">
              <Sparkles size={20} />
              <span>Consejos de Mantenimiento</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {tips.title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {tips.description}
            </p>
            <div className="pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-2">Protección UV</h3>
                  <p className="text-sm text-slate-500">Evita el desgaste prematuro de la pintura.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-2">Brillo Duradero</h3>
                  <p className="text-sm text-slate-500">Mantén tu auto como nuevo por más tiempo.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img 
                src={tips.image_url} 
                alt="Car maintenance" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600 rounded-full -z-10 opacity-20" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-400 rounded-full -z-10 opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
