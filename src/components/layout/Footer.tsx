import React from 'react';
import { useContent } from '../../context/ContentContext';
import { MapPin, Phone, Clock, Mail, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const { content } = useContent();
  const { contact } = content;

  return (
    <footer id="contacto" className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            {contact.logo_url ? (
              <div className="h-12 flex items-center">
                <img
                  src={contact.logo_url}
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
            ) : (
              <h3 className="text-2xl font-bold text-white">
                AutoLavaggio<span className="text-blue-500">Pro</span>
              </h3>
            )}
            <p className="text-slate-400">
              La migliore cura per il tuo veicolo con prodotti di alta qualità e personale esperto.
            </p>
            <h4 className="text-lg font-semibold text-white">Orari di Apertura</h4>
            <div className="flex items-start gap-3">
              <Clock className="text-blue-500 shrink-0 mt-1" size={20} />
              <span>{contact.hours}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contatti</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 shrink-0 mt-1" size={20} />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-blue-500 shrink-0" size={20} />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-500 shrink-0" size={20} />
                <span>{contact.email}</span>
              </li>
              {contact.whatsapp && (
                <li className="flex items-center gap-3">
                  <MessageCircle className="text-green-500 shrink-0" size={20} />
                  <span>WhatsApp: {contact.whatsapp}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Posizione</h4>
            <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.7916328468696!2d13.6123668!3d37.7245685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1310a8dc5eaaaaab%3A0x2cfd6a7aa17f00f!2sCentro%20Lavaggio%20Mose&#39;!5e0!3m2!1ses-419!2sit!4v1767953094090!5m2!1ses-419!2sit" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} AutoLavaggioPro. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};
