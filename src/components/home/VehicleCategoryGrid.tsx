import React from 'react';
import { VehicleCategory } from '../../types';
import { Car } from 'lucide-react';
import { cn } from '../../lib/utils';

interface VehicleCategoryGridProps {
    categories: VehicleCategory[];
    onCategoryClick: (category: VehicleCategory) => void;
}

export const VehicleCategoryGrid: React.FC<VehicleCategoryGridProps> = ({
    categories,
    onCategoryClick
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryClick(category)}
                    className="group relative h-64 w-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                        {category.image_url ? (
                            <img
                                src={category.image_url}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                <Car className="w-16 h-16 text-slate-400" />
                            </div>
                        )}
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/50" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end text-center">
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                            {category.name}
                        </h3>
                        <span className="inline-flex items-center text-sm font-medium text-white/90 bg-blue-600/90 px-3 py-1 rounded-full opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            Vedi Servizi
                        </span>
                    </div>
                </button>
            ))}
        </div>
    );
};
