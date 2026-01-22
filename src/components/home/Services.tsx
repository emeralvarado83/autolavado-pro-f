import {
  Car,
  Sparkles,
  ShieldCheck,
  Droplets,
  Wind,
  Gauge,
  Loader2
} from "lucide-react";
import { useContent } from "../../context/ContentContext";
import * as LucideIcons from "lucide-react";

// Mapeo de nombres de iconos a componentes
const iconMap: Record<string, React.ComponentType<any>> = {
  Car,
  Sparkles,
  ShieldCheck,
  Droplets,
  Wind,
  Gauge,
};

// Función para obtener el icono por nombre
const getIcon = (iconName: string) => {
  // Primero intentar con el mapa directo
  if (iconMap[iconName]) {
    const IconComponent = iconMap[iconName];
    return <IconComponent className="w-8 h-8 text-blue-600" />;
  }

  // Si no está en el mapa, intentar obtenerlo dinámicamente de lucide-react
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) {
    return <IconComponent className="w-8 h-8 text-blue-600" />;
  }

  // Fallback a Car si no se encuentra
  return <Car className="w-8 h-8 text-blue-600" />;
};

export const Services = () => {
  const { content, loading } = useContent();
  const services = content.services || [];

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

  if (services.length === 0) {
    return (
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900">
              Nuestros Servicios
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              No hay servicios disponibles en este momento.
            </p>
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
            Offriamo soluzioni complete per la cura e la manutenzione del tuo veicolo,
            dai lavaggi base ai servizi specializzati.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-cards">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8"
            >
              {/* Title */}
              <div className="flex items-center gap-4 mb-6">
                {getIcon(service.icon_name)}
                <h3 className="text-xl font-semibold text-slate-900">
                  {service.title}
                </h3>
              </div>

              {/* Items */}
              <ul className="space-y-4">
                {service.items.map((item) => (
                  <li key={item.id}>
                    <p className="font-medium text-slate-800">
                      {item.name}
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm mt-1 space-y-1">
                      {item.description.map((desc, j) => (
                        <li key={j}>{desc}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
