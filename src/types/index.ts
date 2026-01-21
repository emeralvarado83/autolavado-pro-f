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

export interface GalleryImage {
  id: string;
  url: string;
  active: boolean;
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
  items: ServiceItem[];
}

export interface SiteContent {
  slider: SliderSlide[];
  tips: MaintenanceTip;
  gallery: GalleryImage[];
  contact: ContactInfo;
  services: Service[];
}
