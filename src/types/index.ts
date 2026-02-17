export interface SliderSlide {
  id: string;
  image_url: string;
  title: string;
  subtitle?: string;
  active: boolean;
}

export interface MaintenanceTip {
  id: string;
  title: string;
  description: string;
  image_url: string;
}


export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp?: string;
  logo_url?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string[];
}

export interface Service {
  id: string;
  title: string;
  icon_name: string;
  display_order?: number;
  items: ServiceItem[];
}

export interface VehicleCategory {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
  services: Service[];
}

export interface SiteContent {
  slider: SliderSlide[];
  tips: MaintenanceTip;

  contact: ContactInfo;
  services: Service[]; // Deprecated but kept for backward compatibility if needed
  vehicleCategories: VehicleCategory[];
}
