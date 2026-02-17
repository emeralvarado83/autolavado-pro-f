import React, { useEffect, useRef } from 'react';
import { VehicleCategory } from '../../types';
import { X, Car, Sparkles, ShieldCheck, Droplets, Wind, Gauge } from 'lucide-react';

import * as LucideIcons from 'lucide-react';

interface ServicePopupProps {
    category: VehicleCategory | null;
    isOpen: boolean;
    onClose: () => void;
}

// Map of icon names to components (reuse from existing Services.tsx logic)
const iconMap: Record<string, React.ComponentType<any>> = {
    Car,
    Sparkles,
    ShieldCheck,
    Droplets,
    Wind,
    Gauge,
};

const getIcon = (iconName: string) => {
    if (iconMap[iconName]) {
        const IconComponent = iconMap[iconName];
        return <IconComponent className="w-6 h-6 text-blue-600" />;
    }
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
        return <IconComponent className="w-6 h-6 text-blue-600" />;
    }
    return <Car className="w-6 h-6 text-blue-600" />;
};

export const ServicePopup: React.FC<ServicePopupProps> = ({
    category,
    isOpen,
    onClose
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = React.useState<string | null>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Click outside to close
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    // Reset subcategory selection when category changes or modal closes
    useEffect(() => {
        setSelectedSubcategoryId(null);
    }, [category, isOpen]);

    if (!isOpen || !category) return null;

    // Determine what to show: Direct Services OR Subcategories OR Subcategory Services
    const showSubcategories = category.has_subcategories && !selectedSubcategoryId;
    const showSubcategoryServices = category.has_subcategories && selectedSubcategoryId;

    // Get appropriate data
    let displayServices = category.services || [];
    let activeTitle = `Servizi per ${category.name}`;
    let activeImage = category.image_url;

    if (showSubcategoryServices) {
        const subcat = category.subcategories?.find(s => s.id === selectedSubcategoryId);
        if (subcat) {
            displayServices = subcat.services || [];
            activeTitle = subcat.name;
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden"
            >
                {/* Header */}
                <div className="relative h-48 bg-slate-900 shrink-0">
                    {activeImage ? (
                        <div className="absolute inset-0 opacity-60">
                            <img
                                src={activeImage}
                                alt={activeTitle}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10"
                    >
                        <X size={24} />
                    </button>

                    <div className="absolute bottom-0 p-8 w-full">
                        {showSubcategoryServices && (
                            <button
                                onClick={() => setSelectedSubcategoryId(null)}
                                className="mb-2 text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
                            >
                                ← Torna alle categorie
                            </button>
                        )}
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {activeTitle}
                        </h2>
                        <p className="text-white/80">
                            {showSubcategories
                                ? "Seleziona una categoria per visualizzare i servizi specifici"
                                : "Scopri i pacchetti di lavaggio e manutenzione dedicati"
                            }
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50">

                    {/* SUBCATEGORY GRID */}
                    {showSubcategories && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {(category.subcategories && category.subcategories.length > 0) ? (
                                category.subcategories.map(subcat => (
                                    <button
                                        key={subcat.id}
                                        onClick={() => setSelectedSubcategoryId(subcat.id)}
                                        className="group relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all text-left"
                                    >
                                        <div className="absolute inset-0">
                                            {subcat.image_url ? (
                                                <img
                                                    src={subcat.image_url}
                                                    alt={subcat.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                                    <Car className="text-slate-400 w-12 h-12" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                                        </div>
                                        <div className="absolute bottom-0 p-4 w-full">
                                            <h3 className="text-xl font-bold text-white mb-1">{subcat.name}</h3>
                                            <span className="text-white/80 text-sm flex items-center gap-1">
                                                Cerca Servizi →
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-slate-500">
                                    Nessuna sottocategoria disponibile.
                                </div>
                            )}
                        </div>
                    )}

                    {/* SERVICES LIST (Direct or Subcategory) */}
                    {(!showSubcategories) && (
                        <>
                            {displayServices.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {displayServices.map((service) => (
                                        <div
                                            key={service.id}
                                            className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-blue-50 rounded-lg">
                                                    {getIcon(service.icon_name)}
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {service.title}
                                                </h3>
                                            </div>

                                            <ul className="space-y-4">
                                                {service.items.map((item) => (
                                                    <li key={item.id} className="border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                                                        <p className="font-medium text-slate-700 mb-1">
                                                            {item.name}
                                                        </p>
                                                        {Array.isArray(item.description) ? (
                                                            <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
                                                                {item.description.map((desc, idx) => (
                                                                    <li key={idx}>{desc}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-sm text-slate-500">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="p-4 bg-slate-100 rounded-full mb-4">
                                        <Car size={48} className="text-slate-300" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                        Nessun servizio disponibile
                                    </h3>
                                    <p className="text-slate-500 max-w-sm">
                                        Al momento non ci sono servizi configurati per questa sezione.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
