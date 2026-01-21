import { SiteContent } from "../types";

export const initialMockData: SiteContent = {
  slider: [
    {
      id: '1',
      image_url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop',
      title: 'Lavado Premium al Detalle',
      subtitle: 'Cuidamos tu auto como si fuera nuestro',
      active: true
    },
    {
      id: '2',
      image_url: 'https://images.unsplash.com/photo-1520340356584-299638bda950?q=80&w=2070&auto=format&fit=crop',
      title: 'Tecnología de Punta',
      subtitle: 'Los mejores productos para el mejor acabado',
      active: true
    }
  ],
  tips: {
    id: '1',
    title: '¿Por qué encerar tu auto?',
    description: 'La cera actúa como una barrera protectora contra los rayos UV, la lluvia ácida y la suciedad de la carretera. Recomendamos encerar tu vehículo al menos cada 3 meses para mantener la pintura brillante y protegida por más tiempo.',
    image_url: 'https://images.unsplash.com/photo-1605218427360-6961d907176d?q=80&w=2070&auto=format&fit=crop'
  },
  gallery: [
    { id: '1', url: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=800&auto=format&fit=crop', active: true },
    { id: '2', url: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop', active: true },
    { id: '3', url: 'https://images.unsplash.com/photo-1584621683833-2c990742383b?q=80&w=800&auto=format&fit=crop', active: true },
    { id: '4', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', active: true },
  ],
  contact: {
    address: 'Av. Principal 123, Ciudad de México',
    phone: '+52 55 1234 5678',
    email: 'contacto@autolavadopro.it',
    hours: 'Lun - Dom: 8:00 AM - 8:00 PM',
    whatsapp: '5512345678',
    logo_url: ''
  },
  services: []
};
