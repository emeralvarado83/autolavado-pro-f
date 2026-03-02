import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ContentProvider, useContent } from './context/ContentContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/common/ScrollToTop';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useContent();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const AppLayout = ({ children, hideHeader = false }: { children: React.ReactNode, hideHeader?: boolean }) => (
  <>
    {!hideHeader && <Header />}
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <ContentProvider>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/privacy" element={<AppLayout hideHeader><PrivacyPolicy /></AppLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </ContentProvider>
  );
}

export default App;
