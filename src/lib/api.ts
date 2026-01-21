import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
console.log('DEBUG: API_URL is:', API_URL); // Debugging line

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // No sobrescribir Content-Type si es multipart/form-data (para subida de archivos)
  if (config.headers['Content-Type']?.includes('multipart/form-data')) {
    delete config.headers['Content-Type'];
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      // Disparar evento personalizado para notificar el cambio
      window.dispatchEvent(new Event('auth-changed'));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    // Disparar evento personalizado para notificar el cambio
    window.dispatchEvent(new Event('auth-changed'));
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },
};

export const contentAPI = {
  getContent: async () => {
    const response = await api.get('/content');
    return response.data;
  },
  updateSlider: async (slides: any[]) => {
    const response = await api.put('/slider', slides);
    return response.data;
  },
  updateTips: async (tips: any) => {
    const response = await api.put('/tips', tips);
    return response.data;
  },
  updateGallery: async (images: any[]) => {
    const response = await api.put('/gallery', images);
    return response.data;
  },
  updateContact: async (contact: any) => {
    const response = await api.put('/contact', contact);
    return response.data;
  },
  updateServices: async (services: any[]) => {
    const response = await api.put('/services', services);
    return response.data;
  },
};

export default api;
