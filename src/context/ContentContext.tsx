import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, SliderSlide, MaintenanceTip, GalleryImage, ContactInfo, Service } from '../types';
import { initialMockData } from '../data/mockData';
import { contentAPI, authAPI } from '../lib/api';
import toast from 'react-hot-toast';

// Helper to generate UUIDs for client-side creation
const generateUUID = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

interface ContentContextType {
  content: SiteContent;
  loading: boolean;
  updateSlider: (slides: SliderSlide[]) => Promise<void>;
  updateTips: (tips: MaintenanceTip) => Promise<void>;
  updateGallery: (images: GalleryImage[]) => Promise<void>;
  updateContact: (contact: ContactInfo) => Promise<void>;
  updateServices: (services: Service[]) => Promise<void>;
  isAdmin: boolean;
  login: () => void; // Deprecated, kept for compatibility but unused internally
  logout: () => Promise<void>;
  refreshAuth: () => void; // Nueva función para refrescar el estado de autenticación
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(initialMockData);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Función para verificar autenticación
  const checkAuth = React.useCallback(() => {
    const authenticated = authAPI.isAuthenticated();
    setIsAdmin(authenticated);
  }, []);

  // Auth State Listener
  useEffect(() => {
    checkAuth();

    // Escuchar cambios en localStorage (para cuando se hace login/logout en otra pestaña)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    // También escuchar eventos personalizados para cambios en la misma pestaña
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth-changed', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  }, [checkAuth]);

  const refreshAuth = React.useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const apiContent = await contentAPI.getContent();
        const newContent: SiteContent = { ...initialMockData };

        if (apiContent.slider && apiContent.slider.length > 0) newContent.slider = apiContent.slider;
        if (apiContent.tips) newContent.tips = apiContent.tips;
        if (apiContent.gallery && apiContent.gallery.length > 0) newContent.gallery = apiContent.gallery;
        if (apiContent.contact) newContent.contact = apiContent.contact;
        if (apiContent.services && apiContent.services.length > 0) newContent.services = apiContent.services;

        setContent(newContent);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Errore durante il caricamento del contenuto');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateSlider = async (slides: SliderSlide[]) => {
    try {
      // Generar UUIDs para slides nuevos
      const cleanSlides = slides.map(s => {
        const isTempId = s.id.length < 15 && !isNaN(Number(s.id));
        if (isTempId) {
          return { ...s, id: generateUUID() };
        }
        return s;
      });

      const data = await contentAPI.updateSlider(cleanSlides);
      // Backend returns { success: true }, so we use the data we sent
      setContent(prev => ({ ...prev, slider: cleanSlides }));
    } catch (error) {
      console.error('Error updating slider:', error);
      toast.error('Errore durante il salvataggio dello slider');
      throw error;
    }
  };

  const updateTips = async (tips: MaintenanceTip) => {
    try {
      const data = await contentAPI.updateTips(tips);
      setContent(prev => ({ ...prev, tips: tips }));
    } catch (error) {
      console.error('Error updating tips:', error);
      toast.error('Errore durante il salvataggio dei consigli');
      throw error;
    }
  };

  const updateGallery = async (images: GalleryImage[]) => {
    try {
      // Generar UUIDs para imágenes nuevas
      const cleanImages = images.map(img => {
        const isTempId = img.id.length < 15 && !isNaN(Number(img.id));
        if (isTempId) {
          return { ...img, id: generateUUID() };
        }
        return img;
      });

      const data = await contentAPI.updateGallery(cleanImages);
      setContent(prev => ({ ...prev, gallery: cleanImages }));
    } catch (error) {
      console.error('Error updating gallery:', error);
      toast.error('Errore durante il salvataggio della galleria');
      throw error;
    }
  };

  const updateContact = async (contact: ContactInfo) => {
    try {
      const data = await contentAPI.updateContact(contact);
      setContent(prev => ({ ...prev, contact: contact }));
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Errore durante il salvataggio dei contatti');
      throw error;
    }
  };

  const updateServices = async (services: Service[]) => {
    try {
      // Generar UUIDs para servicios e items nuevos
      const cleanServices = services.map(s => {
        const isTempId = s.id.length < 15 && !isNaN(Number(s.id));
        const serviceId = isTempId ? generateUUID() : s.id;

        const cleanItems = s.items.map(item => {
          const isItemTempId = item.id.length < 15 && !isNaN(Number(item.id));
          return {
            ...item,
            id: isItemTempId ? generateUUID() : item.id
          };
        });

        return {
          ...s,
          id: serviceId,
          items: cleanItems
        };
      });

      const data = await contentAPI.updateServices(cleanServices);
      setContent(prev => ({ ...prev, services: cleanServices }));
    } catch (error) {
      console.error('Error updating services:', error);
      toast.error('Errore durante il salvataggio dei servizi');
      throw error;
    }
  };

  const login = () => { }; // Handled by API now

  const logout = async () => {
    authAPI.logout();
    setIsAdmin(false);
    // Disparar evento para actualizar en otras pestañas
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <ContentContext.Provider value={{
      content,
      loading,
      updateSlider,
      updateTips,
      updateGallery,
      updateContact,
      updateServices,
      isAdmin,
      login,
      logout,
      refreshAuth
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
