import { supabase } from './supabase';

export const authAPI = {
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    // Supabase handles the session automatically in the client
    // We can still trigger the event for backward compatibility if needed
    window.dispatchEvent(new Event('auth-changed'));
    return { token: data.session?.access_token };
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.dispatchEvent(new Event('auth-changed'));
  },
  isAuthenticated: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },
};

export const contentAPI = {
  getContent: async () => {
    const [
      { data: slider },
      { data: tips },
      { data: contact },
      { data: categories },
      { data: subcategories },
      { data: services },
      { data: serviceItems },
    ] = await Promise.all([
      supabase.from('slider').select('*').order('created_at', { ascending: false }),
      supabase.from('tips').select('*').limit(1).single(),
      supabase.from('contact').select('*').limit(1).single(),
      supabase.from('vehicle_categories').select('*').order('display_order', { ascending: true }),
      supabase.from('vehicle_subcategories').select('*').order('display_order', { ascending: true }),
      supabase.from('services').select('*').order('display_order', { ascending: true }),
      supabase.from('service_items').select('*').order('display_order', { ascending: true }),
    ]);

    // Build the nested structure for vehicle categories
    const categoriesWithServices = (categories || []).map(category => {
      const categoryData: any = {
        ...category,
        services: [],
        subcategories: []
      };

      if (category.has_subcategories) {
        const catSubcategories = (subcategories || []).filter(s => s.category_id === category.id);
        categoryData.subcategories = catSubcategories.map(subcat => {
          const subcatServices = (services || []).filter(s => s.subcategory_id === subcat.id);
          return {
            ...subcat,
            services: subcatServices.map(service => ({
              ...service,
              items: (serviceItems || []).filter(i => i.service_id === service.id)
            }))
          };
        });
      } else {
        const catServices = (services || []).filter(s => s.category_id === category.id && !s.subcategory_id);
        categoryData.services = catServices.map(service => ({
          ...service,
          items: (serviceItems || []).filter(i => i.service_id === service.id)
        }));
      }

      return categoryData;
    });

    return {
      slider: slider || [],
      tips: tips || null,
      contact: contact || null,
      services: [], // Deprecated: included for type compatibility
      vehicleCategories: categoriesWithServices
    };
  },

  updateSlider: async (slides: any[]) => {
    // Strategy: Delete all and insert new
    await supabase.from('slider').delete().not('id', 'is', null);
    const { data, error } = await supabase.from('slider').insert(slides);
    if (error) throw error;
    return data;
  },

  updateTips: async (tips: any) => {
    const { data, error } = await supabase.from('tips').upsert(tips);
    if (error) throw error;
    return data;
  },

  updateContact: async (contact: any) => {
    const { data, error } = await supabase.from('contact').upsert(contact);
    if (error) throw error;
    return data;
  },

  updateServices: async (services: any[]) => {
    // This is more complex because of nested items. 
    // For simplicity, we can replicate the "delete and re-insert" logic if that's what the UI sends.
    // However, the existing API logic specifically deleted all and re-inserted.

    // First, flatten items
    const allItems: any[] = [];
    const flatServices = services.map(s => {
      if (s.items) allItems.push(...s.items.map((i: any) => ({ ...i, service_id: s.id })));
      const { items, ...rest } = s;
      return rest;
    });

    await supabase.from('service_items').delete().not('id', 'is', null);
    await supabase.from('services').delete().not('id', 'is', null);

    await supabase.from('services').insert(flatServices);
    if (allItems.length > 0) {
      await supabase.from('service_items').insert(allItems);
    }
    return { success: true };
  },

  updateVehicleCategories: async (categories: any[]) => {
    // Full hierarchical update
    const allSubcategories: any[] = [];
    const allServices: any[] = [];
    const allItems: any[] = [];

    const flatCategories = categories.map(cat => {
      const { subcategories, services, ...rest } = cat;

      if (cat.has_subcategories && subcategories) {
        subcategories.forEach((sub: any) => {
          const { services: subServices, ...subRest } = sub;
          allSubcategories.push({ ...subRest, category_id: cat.id });
          if (subServices) {
            subServices.forEach((ser: any) => {
              const { items: serItems, ...serRest } = ser;
              allServices.push({ ...serRest, category_id: cat.id, subcategory_id: sub.id });
              if (serItems) {
                serItems.forEach((itm: any) => {
                  allItems.push({ ...itm, service_id: ser.id });
                });
              }
            });
          }
        });
      } else if (services) {
        services.forEach((ser: any) => {
          const { items: serItems, ...serRest } = ser;
          allServices.push({ ...serRest, category_id: cat.id, subcategory_id: null });
          if (serItems) {
            serItems.forEach((itm: any) => {
              allItems.push({ ...itm, service_id: ser.id });
            });
          }
        });
      }
      return rest;
    });

    // Transaction-like sequential delete/insert (Supabase handles batch inserts well)
    await supabase.from('service_items').delete().not('id', 'is', null);
    await supabase.from('services').delete().not('id', 'is', null);
    await supabase.from('vehicle_subcategories').delete().not('id', 'is', null);
    await supabase.from('vehicle_categories').delete().not('id', 'is', null);

    await supabase.from('vehicle_categories').insert(flatCategories);
    if (allSubcategories.length > 0) await supabase.from('vehicle_subcategories').insert(allSubcategories);
    if (allServices.length > 0) await supabase.from('services').insert(allServices);
    if (allItems.length > 0) await supabase.from('service_items').insert(allItems);

    return { success: true };
  },
};

export default supabase;
