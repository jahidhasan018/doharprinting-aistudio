export type PrintMethod = 'DTF' | 'Screen' | 'DTG' | 'UV' | 'Sublimation' | 'Embroidery';

export interface ProductVariant {
  colorName: string;
  colorHex: string;
  inStock: boolean;
}

export interface QuantityTier {
  range: string;
  minQty: number;
  maxQty?: number;
  pricePerUnit: number;
  discountPercent: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: 'apparel' | 'drinkware' | 'bags' | 'headwear' | 'office' | 'gifting' | 'uniforms';
  categoryLabel: string;
  basePrice: number;
  currency: 'AED';
  badge?: 'Best Seller' | 'Eco Friendly' | 'No MOQ' | 'New' | 'Express 24h';
  specs: string; // e.g. "XS–3XL · 240 GSM"
  moq: number; // 1 for no MOQ, 10 for bulk
  supportedMethods: PrintMethod[];
  variants: ProductVariant[];
  description: string;
  material: string;
  leadTime: string; // e.g. "24h Express in Dubai · 48h UAE wide"
  tierPricing: QuantityTier[];
  image: string; // Real studio photographic product image path
  illustrationType: 'tshirt' | 'hoodie' | 'bottle' | 'tote' | 'cap' | 'mug' | 'notebook' | 'giftbox' | 'vest';
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductVariant;
  selectedSize: string;
  selectedMethod: PrintMethod;
  quantity: number;
  unitPrice: number;
  customDesignText?: string;
  customDesignImage?: string;
}

export interface QuoteRequestData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  emirate: 'Dubai' | 'Abu Dhabi' | 'Sharjah' | 'Ajman' | 'Other UAE';
  productCategory: string;
  estimatedQuantity: number;
  requiredDate: string;
  brandingTechnique: PrintMethod;
  notes: string;
}

export interface OrderTrackResult {
  orderNumber: string;
  customerName: string;
  itemsSummary: string;
  currentStatus: 'Artwork Approved' | 'In Production' | 'Quality Control' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  deliveryCity: string;
  timeline: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current: boolean;
  }[];
}
