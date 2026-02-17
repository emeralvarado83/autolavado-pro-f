import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import {
  Trash2, Plus, Save, Loader2, ChevronUp, ChevronDown, LogOut,
  Layout, ImageIcon, Settings, Car
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../../lib/utils';
import { SEO } from '../../components/common/SEO';
import { ImageUpload } from '../../components/admin/ImageUpload';

const Tabs = ['Slider', 'Consigli', 'Contatti', 'Categorie Veicoli'] as const;

// Helper Component for Service Management to avoid duplication
interface ServiceManagerProps {
  services: any[];
  onUpdate: (newServices: any[]) => void;
  titlePrefix?: string;
}

const ServiceManager: React.FC<ServiceManagerProps> = ({ services, onUpdate, titlePrefix = 'Servizio' }) => {
  return (
    <div className="space-y-4">
      {(!services || services.length === 0) ? (
        <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
          <p className="text-slate-500 text-sm">Nessun servizio aggiunto.</p>
        </div>
      ) : (
        services.map((service, serviceIdx) => (
          <div key={service.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <div className="flex justify-between items-start mb-4">
              <h5 className="font-medium text-slate-700">{titlePrefix} #{serviceIdx + 1}</h5>
              <button
                onClick={() => {
                  const newServices = services.filter(s => s.id !== service.id);
                  onUpdate(newServices);
                }}
                className="text-red-500 hover:bg-red-50 p-1 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Titolo Servizio</label>
                <input
                  value={service.title}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[serviceIdx] = { ...newServices[serviceIdx], title: e.target.value };
                    onUpdate(newServices);
                  }}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Icona (lucide-react)</label>
                <input
                  value={service.icon_name}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[serviceIdx] = { ...newServices[serviceIdx], icon_name: e.target.value };
                    onUpdate(newServices);
                  }}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Es: Car, Sparkles, ShieldCheck"
                />
              </div>
            </div>

            {/* Service Items */}
            <div className="space-y-3 pl-4 border-l-2 border-slate-200">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-500">Dettagli / Pacchetti</label>
                <button
                  onClick={() => {
                    const newServices = [...services];
                    if (!newServices[serviceIdx].items) newServices[serviceIdx].items = [];
                    newServices[serviceIdx].items.push({
                      id: Date.now().toString(),
                      name: 'Nuovo Pacchetto',
                      description: ['']
                    });
                    onUpdate(newServices);
                  }}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Plus size={12} /> Aggiungi Pacchetto
                </button>
              </div>

              {service.items && service.items.map((item: any, itemIdx: number) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded p-3 text-sm">
                  <div className="flex justify-between mb-2">
                    <input
                      value={item.name}
                      onChange={(e) => {
                        const newServices = [...services];
                        newServices[serviceIdx].items[itemIdx].name = e.target.value;
                        onUpdate(newServices);
                      }}
                      className="font-medium text-slate-700 bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:ring-0 w-full px-0 py-0.5"
                      placeholder="Nome pacchetto"
                    />
                    <button
                      onClick={() => {
                        const newServices = [...services];
                        newServices[serviceIdx].items = newServices[serviceIdx].items.filter((i: any) => i.id !== item.id);
                        onUpdate(newServices);
                      }}
                      className="text-red-400 hover:text-red-600 ml-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <textarea
                    value={Array.isArray(item.description) ? item.description.join('\n') : item.description}
                    onChange={(e) => {
                      const newServices = [...services];
                      newServices[serviceIdx].items[itemIdx].description = e.target.value.split('\n');
                      onUpdate(newServices);
                    }}
                    className="w-full p-2 border rounded text-xs text-slate-600 h-16"
                    placeholder="Caratteristiche (una per riga)"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export const Dashboard = () => {
  const { content, loading, updateSlider, updateTips, updateContact, updateVehicleCategories, logout } = useContent();
  // ... (rest of state hooks remain same)
  const [activeTab, setActiveTab] = useState('Slider');
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  // Local state for forms
  const [sliderData, setSliderData] = useState(content.slider);
  const [tipsData, setTipsData] = useState(content.tips);

  const [contactData, setContactData] = useState(content.contact);
  const [categoriesData, setCategoriesData] = useState(content.vehicleCategories || []);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Sync local state when content loads from DB
  useEffect(() => {
    setSliderData(content.slider);
    setTipsData(content.tips);

    setContactData(content.contact);
    setCategoriesData(content.vehicleCategories || []);
  }, [content]);

  // ... (handleLogout, handleSave, toggleCategoryExpand remain same)
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

  const toggleCategoryExpand = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  }

  // Force title update when activeTab changes
  useEffect(() => {
    document.title = `Admin ${activeTab} | Autolavado Pro`;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* ... (Sidebar and minimal code structure remains same until Vehicle Categories) */}
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
              {tab === 'Categorie Veicoli' && <Car size={20} />}
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

          {/* ... (Slider, Tips, Contact Editors remain identical) ... */}
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

          {/* VEHICLE CATEGORIES EDITOR */}
          {activeTab === 'Categorie Veicoli' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm mb-6">
                <p>
                  Qui puoi gestire le categorie di veicoli (Moto, Auto, ecc.).
                  Per ogni categoria, puoi caricare un'immagine di copertina e gestire i servizi specifici.
                  Puoi anche abilitare le <strong>sottocategorie</strong> (es. Camion → Leggero, Pesante).
                </p>
              </div>

              {categoriesData.map((category, catIdx) => (
                <div key={category.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-sm">#{catIdx + 1}</span>
                      {category.name || 'Nuova Categoria'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCategoryExpand(category.id)}
                        className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        {expandedCategory === category.id ? (
                          <>
                            <ChevronUp size={16} /> Nascondi Dettagli
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} /> Gestisci Contenuto
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setCategoriesData(categoriesData.filter(c => c.id !== category.id))}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Elimina Categoria"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nome Categoria</label>
                      <input
                        value={category.name}
                        onChange={(e) => {
                          const newCats = [...categoriesData];
                          newCats[catIdx].name = e.target.value;
                          setCategoriesData(newCats);
                        }}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Es: SUV, Moto, Furgone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Ordine</label>
                      <input
                        type="number"
                        value={category.display_order || 0}
                        onChange={(e) => {
                          const newCats = [...categoriesData];
                          newCats[catIdx].display_order = parseInt(e.target.value) || 0;
                          setCategoriesData(newCats);
                        }}
                        className="w-full p-2 border rounded-lg"
                      />
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer mt-3 bg-slate-50 p-2 rounded border border-slate-100">
                        <input
                          type="checkbox"
                          checked={category.has_subcategories || false}
                          onChange={(e) => {
                            const newCats = [...categoriesData];
                            newCats[catIdx].has_subcategories = e.target.checked;
                            setCategoriesData(newCats);
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        Abilita Sottocategorie
                      </label>
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Immagine Copertina</label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <ImageUpload
                            value={category.image_url}
                            onChange={(url) => {
                              const newCats = [...categoriesData];
                              newCats[catIdx].image_url = url;
                              setCategoriesData(newCats);
                            }}
                          />
                        </div>
                        {category.image_url && (
                          <div className="w-16 h-10 bg-slate-100 rounded border border-slate-200 overflow-hidden shrink-0">
                            <img src={category.image_url} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Services/Subcategories Section */}
                  {expandedCategory === category.id && (
                    <div className="border-t border-slate-100 pt-6 mt-6 animate-in fade-in slide-in-from-top-2 duration-200">

                      {category.has_subcategories ? (
                        // SUBCATEGORIES UI
                        <div className="space-y-6">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-slate-700">Sottocategorie per {category.name}</h4>
                            <button
                              onClick={() => {
                                const newCats = [...categoriesData];
                                if (!newCats[catIdx].subcategories) newCats[catIdx].subcategories = [];
                                newCats[catIdx].subcategories!.push({
                                  id: Date.now().toString(),
                                  name: 'Nuova Sottocategoria',
                                  image_url: '',
                                  display_order: newCats[catIdx].subcategories!.length + 1,
                                  services: []
                                });
                                setCategoriesData(newCats);
                              }}
                              className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm font-medium"
                            >
                              <Plus size={16} /> Aggiungi Sottocategoria
                            </button>
                          </div>

                          {(!category.subcategories || category.subcategories.length === 0) ? (
                            <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                              <p className="text-slate-500 text-sm">Nessuna sottocategoria aggiunta.</p>
                            </div>
                          ) : (
                            category.subcategories.map((subcat, subIdx) => (
                              <div key={subcat.id} className="border border-purple-100 bg-purple-50/30 rounded-lg p-5">
                                <div className="flex justify-between items-start mb-4">
                                  <h5 className="font-bold text-purple-800">Sottocategoria #{subIdx + 1}</h5>
                                  <button
                                    onClick={() => {
                                      const newCats = [...categoriesData];
                                      newCats[catIdx].subcategories = newCats[catIdx].subcategories!.filter(s => s.id !== subcat.id);
                                      setCategoriesData(newCats);
                                    }}
                                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Nome</label>
                                    <input
                                      value={subcat.name}
                                      onChange={(e) => {
                                        const newCats = [...categoriesData];
                                        newCats[catIdx].subcategories![subIdx].name = e.target.value;
                                        setCategoriesData(newCats);
                                      }}
                                      className="w-full p-2 border rounded text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Immagine (Opzionale)</label>
                                    <div className="flex gap-2">
                                      <div className="flex-1">
                                        <ImageUpload
                                          value={subcat.image_url || ''}
                                          onChange={(url) => {
                                            const newCats = [...categoriesData];
                                            newCats[catIdx].subcategories![subIdx].image_url = url;
                                            setCategoriesData(newCats);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Services inside Subcategory */}
                                <div className="bg-white rounded-lg p-4 border border-slate-100">
                                  <div className="flex justify-between items-center mb-4">
                                    <h6 className="text-sm font-semibold text-slate-600">Servizi per {subcat.name}</h6>
                                    <button
                                      onClick={() => {
                                        const newCats = [...categoriesData];
                                        if (!newCats[catIdx].subcategories![subIdx].services) newCats[catIdx].subcategories![subIdx].services = [];
                                        newCats[catIdx].subcategories![subIdx].services.push({
                                          id: Date.now().toString(),
                                          title: 'Nuovo Servizio',
                                          icon_name: 'Car',
                                          display_order: newCats[catIdx].subcategories![subIdx].services.length + 1,
                                          items: []
                                        });
                                        setCategoriesData(newCats);
                                      }}
                                      className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                                    >
                                      <Plus size={14} /> Aggiungi Servizio
                                    </button>
                                  </div>

                                  <ServiceManager
                                    services={subcat.services}
                                    onUpdate={(newServices) => {
                                      const newCats = [...categoriesData];
                                      newCats[catIdx].subcategories![subIdx].services = newServices;
                                      setCategoriesData(newCats);
                                    }}
                                    titlePrefix="Offerta"
                                  />
                                </div>
                              </div>
                            ))
                          )}

                        </div>
                      ) : (
                        // DIRECT SERVICES UI
                        <>
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-slate-700">Servizi per {category.name}</h4>
                            <button
                              onClick={() => {
                                const newCats = [...categoriesData];
                                if (!newCats[catIdx].services) newCats[catIdx].services = [];
                                newCats[catIdx].services.push({
                                  id: Date.now().toString(),
                                  title: 'Nuovo Servizio',
                                  icon_name: 'Car',
                                  display_order: newCats[catIdx].services.length + 1,
                                  items: []
                                });
                                setCategoriesData(newCats);
                              }}
                              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                            >
                              <Plus size={16} /> Aggiungi Servizio
                            </button>
                          </div>

                          <ServiceManager
                            services={category.services}
                            onUpdate={(newServices) => {
                              const newCats = [...categoriesData];
                              newCats[catIdx].services = newServices;
                              setCategoriesData(newCats);
                            }}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex gap-4">
                <button
                  onClick={() => setCategoriesData([...categoriesData, {
                    id: Date.now().toString(),
                    name: 'Nuova Categoria',
                    image_url: '',
                    display_order: categoriesData.length + 1,
                    services: []
                  }])}
                  className="flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  <Plus size={20} /> Aggiungi Categoria
                </button>
                <button
                  onClick={() => handleSave(() => updateVehicleCategories(categoriesData), 'Categorie aggiornate')}
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
