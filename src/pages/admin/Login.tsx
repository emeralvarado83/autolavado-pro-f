import React, { useState } from 'react';
import { SEO } from '../../components/common/SEO';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../lib/api';
import { useContent } from '../../context/ContentContext';
import { Lock, User, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshAuth } = useContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authAPI.login(email, password);
      // Actualizar el estado de autenticación inmediatamente
      refreshAuth();
      toast.success('Bienvenido Administrador');
      // Pequeño delay para asegurar que el estado se actualice
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 100);
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Error al iniciar sesión';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <SEO title="Admin Login | Centro Lavaggio Mosè" />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Pannello di Amministrazione</h1>
          <p className="text-slate-500">Accedi per gestire i contenuti</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="admin@ejemplo.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Accedi'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Credenziali predefinite: admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  );
};
