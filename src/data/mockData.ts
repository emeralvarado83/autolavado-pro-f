import { SiteContent } from "../types";

export const initialMockData: SiteContent = {
  slider: [
    {
      id: '1',
      image_url: 'https://i.imgur.com/xu5tKzY.png',
      title: 'Lavaggio Auto Premium',
      subtitle: 'Ci prendiamo cura della tua auto come se fosse la nostra',
      active: true
    }
  ],
  tips: {
    id: '1',
    title: 'Perché incerare la tua auto?',
    description: 'La cera agisce come una barriera protettiva contro i raggi UV, la pioggia acida e lo sporco della strada. Consigliamo di incerare il veicolo almeno ogni 3 mesi per mantenere la vernice brillante e protetta più a lungo.',
    image_url: 'https://i.imgur.com/rDvaIQN.jpeg'
  },

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
