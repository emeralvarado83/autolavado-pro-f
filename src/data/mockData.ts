import { SiteContent } from "../types";

export const initialMockData: SiteContent = {
  slider: [
    {
      id: '1',
      image_url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop',
      title: 'Lavaggio Auto Premium',
      subtitle: 'Ci prendiamo cura della tua auto come se fosse la nostra',
      active: true
    },
    {
      id: '2',
      image_url: 'https://images.unsplash.com/photo-1520340356584-299638bda950?q=80&w=2070&auto=format&fit=crop',
      title: 'Tecnologia Avanzata',
      subtitle: 'I migliori prodotti per la migliore finitura',
      active: true
    }
  ],
  tips: {
    id: '1',
    title: 'Perché incerare la tua auto?',
    description: 'La cera agisce come una barriera protettiva contro i raggi UV, la pioggia acida e lo sporco della strada. Consigliamo di incerare il veicolo almeno ogni 3 mesi per mantenere la vernice brillante e protetta più a lungo.',
    image_url: 'https://images.unsplash.com/photo-1605218427360-6961d907176d?q=80&w=2070&auto=format&fit=crop'
  },
  gallery: [
    { id: '1', url: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=800&auto=format&fit=crop', active: true },
    { id: '2', url: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop', active: true },
    { id: '3', url: 'https://images.unsplash.com/photo-1584621683833-2c990742383b?q=80&w=800&auto=format&fit=crop', active: true },
    { id: '4', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', active: true },
  ],
  contact: {
    address: 'Via Roma 123, Milano',
    phone: '+39 02 1234 5678',
    email: 'info@autolavadopro.it',
    hours: 'Lun - Dom: 8:00 - 20:00',
    whatsapp: '393930091236',
    logo_url: ''
  },
  services: []
};
