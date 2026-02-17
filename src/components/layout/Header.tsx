import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useContent } from '../../context/ContentContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAdmin, content } = useContent();

  const isHome = location.pathname === '/';
  const isServices = location.pathname === '/services';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inizio', href: '/', type: 'scroll' },
    { name: 'Consigli', href: '#consejos', type: 'scroll' },
    { name: 'Servizi', href: '#services', type: 'scroll' },
    { name: 'Contatto', href: '#contacto', type: 'scroll' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    if (id === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white shadow-md py-2"
          : isServices
            ? "bg-slate-900 py-4"
            : "bg-transparent py-4"
      )}
    >

      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          {content.contact.logo_url ? (
            <div className="h-10 flex items-center">
              <img
                src={content.contact.logo_url}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
          ) : (
            <>
              <div
                className={cn(
                  "p-2 rounded-full transition-colors",
                  scrolled ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                )}
              >
                <Car size={24} />
              </div>
              <span
                className={cn(
                  "font-bold text-xl tracking-tight transition-colors",
                  scrolled ? "text-slate-800" : "text-white"
                )}
              >
                AutoLavaggio<span className="text-blue-500">Pro</span>
              </span>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks
            .filter(link => link.type === 'route' || isHome)
            .map(link =>
              link.type === 'route' ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "font-medium text-sm transition-colors",
                    location.pathname === link.href
                      ? "text-blue-600 font-semibold"
                      : scrolled
                        ? "text-slate-600 hover:text-blue-500"
                        : isServices
                          ? "text-white hover:text-blue-400"
                          : "text-white/90 hover:text-blue-400"
                  )}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "font-medium text-sm transition-colors",
                    scrolled
                      ? "text-slate-600 hover:text-blue-500"
                      : "text-white/90 hover:text-blue-400"
                  )}
                >
                  {link.name}
                </button>
              )
            )}

          {isAdmin ? (
            <Link
              to="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Settings size={16} />
              Pannello
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors border admin-desktop",
                scrolled
                  ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                  : "border-white text-white hover:bg-white/10"
              )}
            >
              Amm.
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={scrolled ? "text-slate-800" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-slate-800" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
          <div className="flex flex-col p-4 gap-4">
            {navLinks
              .filter(link => link.type === 'route' || isHome)
              .map(link =>
                link.type === 'route' ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-left font-medium py-2",
                      location.pathname === link.href
                        ? "text-blue-600 font-semibold"
                        : "text-slate-600 hover:text-blue-600"
                    )}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left font-medium text-slate-600 hover:text-blue-600 py-2"
                  >
                    {link.name}
                  </button>
                )
              )}

            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="text-center bg-blue-600 text-white py-3 rounded-lg font-medium admin-mobile"
            >
              Accesso Amm.
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

