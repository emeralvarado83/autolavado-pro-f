import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { SEO } from '../../components/common/SEO';
import { Trash2, Plus, Save, Image as ImageIcon, Layout, Settings, LogOut, Loader2, Wrench } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ImageUpload } from '../../components/admin/ImageUpload';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Tabs = ['Slider', 'Consigli', 'Contatti', 'Servizi'];

export const Dashboard = () => {
  const { content, loading, updateSlider, updateTips, updateContact, updateServices, logout } = useContent();
  const [activeTab, setActiveTab] = useState('Slider');
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  // Local state for forms
  const [sliderData, setSliderData] = useState(content.slider);
  const [tipsData, setTipsData] = useState(content.tips);

  const [contactData, setContactData] = useState(content.contact);
  const [servicesData, setServicesData] = useState(content.services);

  // Sync local state when content loads from DB
  useEffect(() => {
    setSliderData(content.slider);
    setTipsData(content.tips);

    setContactData(content.contact);
    setServicesData(content.services);
  }, [content]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSave = async (fn: () => Promise<void>, successMsg: string) => {
    setSaving(true);
    try {
      await fn();
      toast.success(successMsg);
    } catch (error) {
      // Error handled in context
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  }

  // Force title update when activeTab changes
  useEffect(() => {
    document.title = `Admin ${activeTab} | Autolavado Pro`;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <SEO title={`Admin ${activeTab} | Autolavado Pro`} />
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg fixed h-full z-10 hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          {Tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3",
                activeTab === tab ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {tab === 'Slider' && <Layout size={20} />}
              {tab === 'Consigli' && <ImageIcon size={20} />}

              {tab === 'Contatti' && <Settings size={20} />}
              {tab === 'Servizi' && <Wrench size={20} />}
              {tab}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Esci
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Gestione {activeTab}</h1>
            <div className="md:hidden">
              <button onClick={handleLogout} className="text-red-600">
                <LogOut size={24} />
              </button>
            </div>
          </div>

          {/* SLIDER EDITOR */}
          {activeTab === 'Slider' && (
            <div className="space-y-6">
              {sliderData.map((slide, idx) => (
                <div key={slide.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-semibold text-slate-700">Slide #{idx + 1}</h3>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={slide.active}
                          onChange={(e) => {
                            const newSlides = [...sliderData];
                            newSlides[idx].active = e.target.checked;
                            setSliderData(newSlides);
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        Attivo
                      </label>
                      <button
                        onClick={() => setSliderData(sliderData.filter(s => s.id !== slide.id))}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Titolo</label>
                        <input
                          value={slide.title}
                          onChange={(e) => {
                            const newSlides = [...sliderData];
                            newSlides[idx].title = e.target.value;
                            setSliderData(newSlides);
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Sottotitolo</label>
                        <input
                          value={slide.subtitle || ''}
                          onChange={(e) => {
                            const newSlides = [...sliderData];
                            newSlides[idx].subtitle = e.target.value;
                            setSliderData(newSlides);
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Immagine</label>
                        <ImageUpload
                          value={slide.image_url}
                          onChange={(url) => {
                            const newSlides = [...sliderData];
                            newSlides[idx].image_url = url;
                            setSliderData(newSlides);
                          }}
                        />
                      </div>
                    </div>
                    <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                      {slide.image_url ? (
                        <img src={slide.image_url} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-slate-400 text-sm">Nessuna immagine</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                <button
                  onClick={() => setSliderData([...sliderData, {
                    id: Date.now().toString(),
                    image_url: '',
                    title: 'Nuovo Slide',
                    active: true
                  }])}
                  className="flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  <Plus size={20} /> Aggiungi Slide
                </button>
                <button
                  onClick={() => handleSave(() => updateSlider(sliderData), 'Slider aggiornato')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  Salva Modifiche
                </button>
              </div>
            </div>
          )}

          {/* TIPS EDITOR */}
          {activeTab === 'Consigli' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Titolo Sezione</label>
                <input
                  value={tipsData.title}
                  onChange={(e) => setTipsData({ ...tipsData, title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descrizione</label>
                <textarea
                  value={tipsData.description}
                  onChange={(e) => setTipsData({ ...tipsData, description: e.target.value })}
                  className="w-full p-2 border rounded-lg h-32"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Immagine Decorativa</label>
                <div className="flex gap-4 flex-col md:flex-row">
                  <div className="flex-1">
                    <ImageUpload
                      value={tipsData.image_url}
                      onChange={(url) => setTipsData({ ...tipsData, image_url: url })}
                    />
                  </div>
                  <div className="w-full md:w-48 aspect-video bg-slate-100 rounded overflow-hidden shrink-0">
                    {tipsData.image_url && (
                      <img src={tipsData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleSave(() => updateTips(tipsData), 'Consigli aggiornati')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  Salva Modifiche
                </button>
              </div>
            </div>
          )}


          {/* CONTACT EDITOR */}
          {activeTab === 'Contatti' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Indirizzo</label>
                  <input
                    value={contactData.address}
                    onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefono</label>
                  <input
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp (Opzionale)</label>
                  <input
                    value={contactData.whatsapp || ''}
                    onChange={(e) => setContactData({ ...contactData, whatsapp: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Orari di Apertura</label>
                  <input
                    value={contactData.hours}
                    onChange={(e) => setContactData({ ...contactData, hours: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Logo (Header e Footer)</label>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="w-full md:w-64">
                      <ImageUpload
                        value={contactData.logo_url || ''}
                        onChange={(url) => setContactData({ ...contactData, logo_url: url })}
                      />
                    </div>
                    {contactData.logo_url && (
                      <div className="w-32 h-16 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                        <img
                          src={contactData.logo_url}
                          alt="Logo preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Questo logo verrà mostrato nell'intestazione e nel piè di pagina del sito. Formato consigliato: PNG o SVG con sfondo trasparente.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleSave(() => updateContact(contactData), 'Contatti aggiornati')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  Salva Modifiche
                </button>
              </div>
            </div>
          )}

          {/* SERVICES EDITOR */}
          {activeTab === 'Servizi' && (
            <div className="space-y-6">
              {servicesData.map((service, serviceIdx) => (
                <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-700">Servizio #{serviceIdx + 1}</h3>
                    <button
                      onClick={() => setServicesData(servicesData.filter(s => s.id !== service.id))}
                      className="text-red-500 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Titolo</label>
                      <input
                        value={service.title}
                        onChange={(e) => {
                          const newServices = [...servicesData];
                          newServices[serviceIdx].title = e.target.value;
                          setServicesData(newServices);
                        }}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Icona (nome di lucide-react)</label>
                      <input
                        value={service.icon_name}
                        onChange={(e) => {
                          const newServices = [...servicesData];
                          newServices[serviceIdx].icon_name = e.target.value;
                          setServicesData(newServices);
                        }}
                        placeholder="Es: Car, Sparkles, ShieldCheck"
                        className="w-full p-2 border rounded-lg"
                      />
                      <p className="mt-1 text-xs text-slate-500">
                        Usa nomi di icone di lucide-react (Car, Sparkles, ShieldCheck, etc.)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-slate-700">Elementi del Servizio</label>
                      <button
                        onClick={() => {
                          const newServices = [...servicesData];
                          newServices[serviceIdx].items.push({
                            id: Date.now().toString(),
                            name: 'Nuovo Elemento',
                            description: ['']
                          });
                          setServicesData(newServices);
                        }}
                        className="flex items-center gap-2 px-3 py-1 text-sm border border-dashed border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                      >
                        <Plus size={16} /> Aggiungi Elemento
                      </button>
                    </div>

                    {service.items.map((item, itemIdx) => (
                      <div key={item.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-slate-700">Elemento #{itemIdx + 1}</h4>
                          <button
                            onClick={() => {
                              const newServices = [...servicesData];
                              newServices[serviceIdx].items = newServices[serviceIdx].items.filter(i => i.id !== item.id);
                              setServicesData(newServices);
                            }}
                            className="text-red-500 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                          <input
                            value={item.name}
                            onChange={(e) => {
                              const newServices = [...servicesData];
                              newServices[serviceIdx].items[itemIdx].name = e.target.value;
                              setServicesData(newServices);
                            }}
                            className="w-full p-2 border rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Descrizioni (una per riga)</label>
                          <textarea
                            value={item.description.join('\n')}
                            onChange={(e) => {
                              const newServices = [...servicesData];
                              newServices[serviceIdx].items[itemIdx].description = e.target.value.split('\n').filter(d => d.trim());
                              setServicesData(newServices);
                            }}
                            className="w-full p-2 border rounded-lg h-24"
                            placeholder="Acqua ad alta pressione + sapone&#10;Risciacquo e asciugatura"
                          />
                          <p className="mt-1 text-xs text-slate-500">
                            Scrivi ogni descrizione su una riga separata
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                <button
                  onClick={() => setServicesData([...servicesData, {
                    id: Date.now().toString(),
                    title: 'Nuovo Servizio',
                    icon_name: 'Car',
                    items: []
                  }])}
                  className="flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  <Plus size={20} /> Aggiungi Servizio
                </button>
                <button
                  onClick={() => handleSave(() => updateServices(servicesData), 'Servizi aggiornati')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  Salva Modifiche
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
