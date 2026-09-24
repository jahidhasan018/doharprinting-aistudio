import React, { useState } from 'react';
import { PRODUCTS, FAQ_ITEMS } from '../data/mockData';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import {
  Sparkles,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Truck,
  Layers,
  Building2,
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  Calendar,
  Mail,
  Zap,
  Gift,
  Star,
  Check,
  Flame,
  Award,
  Clock,
  Compass
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, categoryFilter?: string) => void;
  onCustomizeProduct: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onCustomizeProduct,
  onSelectProduct
}) => {
  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick B2B Estimator state
  const [b2bProduct, setB2bProduct] = useState<'tees' | 'hoodies' | 'bottles' | 'gifts'>('tees');
  const [b2bQuantity, setB2bQuantity] = useState(50);

  const calculateB2BPrice = () => {
    let base = 38;
    if (b2bProduct === 'hoodies') base = 78;
    if (b2bProduct === 'bottles') base = 42;
    if (b2bProduct === 'gifts') base = 120;

    let discount = 1.0;
    if (b2bQuantity >= 250) discount = 0.65; // 35% off
    else if (b2bQuantity >= 100) discount = 0.75; // 25% off
    else if (b2bQuantity >= 50) discount = 0.85; // 15% off

    const unitPrice = Math.round(base * discount);
    return {
      unitPrice,
      total: unitPrice * b2bQuantity,
      discountPct: Math.round((1 - discount) * 100)
    };
  };

  const b2bEstimates = calculateB2BPrice();

  const handleWhatsApp = (topic = 'General Inquiry') => {
    const text = encodeURIComponent(
      `Hello DOHAR UAE Team! I'm reaching out regarding: ${topic}. Please share your pricing, digital mockup assistance, and UAE delivery schedule.`
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // 14 Category Cards inspired by the competitor's grid, but cleaner and more elegant
  const CATEGORY_GRID = [
    {
      id: 'apparel',
      name: 'T-SHIRTS & POLOS',
      sub: '240 GSM Combed Cotton',
      price: 'From AED 38',
      image: '/products/heavyweight-tee.jpg',
      bgTone: 'bg-[#FDF8F3] hover:bg-[#FAF0E6]',
      borderTone: 'border-[#F2E5D5]'
    },
    {
      id: 'hoodies',
      name: 'HOODIES & JACKETS',
      sub: '380 GSM Heavy Terry Fleece',
      price: 'From AED 78',
      image: '/products/french-terry-hoodie.jpg',
      bgTone: 'bg-[#FAF3F0] hover:bg-[#F5E8E1]',
      borderTone: 'border-[#EEDCD3]'
    },
    {
      id: 'jerseys',
      name: 'JERSEYS & SPORTSWEAR',
      sub: 'Breathable Moisture-Wick',
      price: 'From AED 45',
      image: '/products/jerseys-sports.jpg',
      bgTone: 'bg-[#FCF7ED] hover:bg-[#F7EED9]',
      borderTone: 'border-[#EFE1C5]'
    },
    {
      id: 'uniforms',
      name: 'UNIFORMS & WORKWEAR',
      sub: 'EN ISO Certified Hi-Vis',
      price: 'From AED 16',
      image: '/products/safety-vest.jpg',
      bgTone: 'bg-[#F0F6FA] hover:bg-[#E3EFF7]',
      borderTone: 'border-[#D2E4F0]'
    },
    {
      id: 'headwear',
      name: 'CAPS & HATS',
      sub: '3D Puff & Flat Embroidery',
      price: 'From AED 28',
      image: '/products/washed-dad-cap.jpg',
      bgTone: 'bg-[#F2F7F4] hover:bg-[#E5EFE9]',
      borderTone: 'border-[#D5E5DC]'
    },
    {
      id: 'drinkware',
      name: 'BOTTLES & MUGS',
      sub: 'Vacuum Insulated 304 Steel',
      price: 'From AED 42',
      image: '/products/insulated-bottle.jpg',
      bgTone: 'bg-[#FBF9F5] hover:bg-[#F5F0E8]',
      borderTone: 'border-[#EBE4D8]'
    },
    {
      id: 'bags',
      name: 'BAGS & BACKPACKS',
      sub: '12oz GOTS Organic Canvas',
      price: 'From AED 18',
      image: '/products/canvas-tote.jpg',
      bgTone: 'bg-[#F8F3F5] hover:bg-[#F2E8EB]',
      borderTone: 'border-[#E9DCE1]'
    },
    {
      id: 'packaging',
      name: 'BOXES & PACKAGING',
      sub: 'Rigid Presentation Boxes',
      price: 'From AED 22',
      image: '/products/boxes-packaging.jpg',
      bgTone: 'bg-[#F1F8F5] hover:bg-[#E3F2EC]',
      borderTone: 'border-[#D4EADA]'
    },
    {
      id: 'office',
      name: 'OFFICE & STATIONERY',
      sub: 'Debossed PU Journals & Pens',
      price: 'From AED 25',
      image: '/products/executive-notebook.jpg',
      bgTone: 'bg-[#FAF6F0] hover:bg-[#F3ECE0]',
      borderTone: 'border-[#EADECF]'
    },
    {
      id: 'tech',
      name: 'TRAVEL & TECH',
      sub: 'Power Banks & Smart Devices',
      price: 'From AED 55',
      image: '/products/travel-tech.jpg',
      bgTone: 'bg-[#F2F6F6] hover:bg-[#E5ECEC]',
      borderTone: 'border-[#D5E1E1]'
    },
    {
      id: 'gifting',
      name: 'CORPORATE GIFTING',
      sub: 'Curated Onboarding Hampers',
      price: 'From AED 120',
      image: '/products/vip-gift-set.jpg',
      bgTone: 'bg-[#FAF3EB] hover:bg-[#F4E7DA]',
      borderTone: 'border-[#EDDBCA]'
    },
    {
      id: 'giveaways',
      name: 'PROMOTIONAL GIVEAWAYS',
      sub: 'Bulk Lanyards, Keychains & Badges',
      price: 'From AED 6',
      image: '/products/promo-giveaways.jpg',
      bgTone: 'bg-[#F4F4F8] hover:bg-[#EAEAF2]',
      borderTone: 'border-[#DCDBE8]'
    },
    {
      id: 'eco',
      name: 'ECO FRIENDLY',
      sub: 'Bamboo, Wheat Straw & Organic',
      price: 'From AED 32',
      image: '/products/eco-friendly.jpg',
      bgTone: 'bg-[#F4F7F2] hover:bg-[#E7EFE3]',
      borderTone: 'border-[#D8E6D3]'
    },
    {
      id: 'ceramic',
      name: 'CERAMIC DRINKWARE',
      sub: 'Matte Stoneware Coffee Mugs',
      price: 'From AED 24',
      image: '/products/ceramic-mug.jpg',
      bgTone: 'bg-[#F9F7F5] hover:bg-[#F2EFEA]',
      borderTone: 'border-[#E7E2DA]'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO BANNER: Inspired by competitor flatlay layout, but modern, spacious & elevated */}
      <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-[#E8E5DD] py-12 lg:py-20">
        {/* Soft background grid accent */}
        <div className="absolute inset-0 bg-halftone-pattern opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bold Value Proposition & Action Buttons */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Regional Authority Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E8E5DD] rounded-full text-xs font-mono text-[#524F49] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span className="font-semibold text-[#211f1f]">MADE & PRINTED IN THE UAE</span>
                <span className="text-[#8C877D]">·</span>
                <span className="text-[#706E68]">ZERO MINIMUMS</span>
              </div>

              {/* Dominant Headline */}
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#211f1f] tracking-tight leading-[1.05]">
                Custom T-shirts, <br className="hidden sm:inline" />
                <span className="relative inline-block text-[#211f1f]">
                  Merch & Gifts.
                  <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-[#faec1c]/80 -z-0 transform -rotate-1 rounded-xs" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#524F49] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                1,000+ premium products. No minimum orders. Express dispatch across Dubai, Abu Dhabi, and Sharjah in 24–48 hours.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#211f1f] hover:bg-[#383636] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#faec1c]" />
                  <span>CUSTOMIZE NOW</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'all')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#FAF9F6] text-[#211f1f] border border-[#E8E5DD] hover:border-[#211f1f] rounded-full font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Browse 1,000+ Items</span>
                  <ArrowRight className="w-4 h-4 text-[#706E68]" />
                </button>
              </div>

              {/* Trust Subtext */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#706E68]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Free 1:1 Proof on WhatsApp</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Free UAE Delivery on AED 250+</span>
                </div>
              </div>
            </div>

            {/* Right Column: Beautiful Interactive Merchandise Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-white border border-[#E8E5DD] p-3 sm:p-4 shadow-lg overflow-hidden group">
                <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-xl overflow-hidden bg-[#FAF9F6]">
                  <img
                    src="/products/hero-merchandise.jpg"
                    alt="Custom T-shirts, Merchandise and Corporate Gifts printed in UAE"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />

                  {/* Floating Imprint Badges to make it look like real branded merch */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-[#E8E5DD] px-3 py-1.5 rounded-lg shadow-sm text-left">
                    <span className="text-[10px] font-mono text-[#706E68] uppercase block">Heavyweight Cotton</span>
                    <span className="text-xs font-bold text-[#211f1f]">240 GSM Oversized Tee</span>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-[#211f1f]/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg shadow-sm text-left">
                    <span className="text-[10px] font-mono text-[#faec1c] uppercase block">Rotary Laser Engraved</span>
                    <span className="text-xs font-semibold">Stainless Steel Tumbler</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs border border-[#E8E5DD] px-3 py-1.5 rounded-lg shadow-sm text-left">
                    <span className="text-[10px] font-mono text-[#25D366] uppercase block">Zero Minimums</span>
                    <span className="text-xs font-bold text-[#211f1f]">Ready in 24 Hours</span>
                  </div>

                  {/* Center Overlay Tag */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border border-dashed border-white/70 bg-black/45 backdrop-blur-xs px-4 py-2 rounded-xl text-center shadow-lg">
                      <span className="font-display font-black text-white text-base tracking-wider uppercase block">
                        YOUR DESIGN HERE
                      </span>
                      <span className="font-mono text-[10px] text-[#faec1c]">
                        DTF · UV · EMBROIDERY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive thumbnail pills */}
                <div className="grid grid-cols-4 gap-2 mt-3 pt-2 border-t border-[#F4F2EB]">
                  {[
                    { title: 'T-Shirts', price: 'AED 38', img: '/products/heavyweight-tee.jpg' },
                    { title: 'Hoodies', price: 'AED 78', img: '/products/french-terry-hoodie.jpg' },
                    { title: 'Drinkware', price: 'AED 42', img: '/products/insulated-bottle.jpg' },
                    { title: 'Gift Hampers', price: 'AED 120', img: '/products/vip-gift-set.jpg' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onNavigate('shop', 'all')}
                      className="flex items-center gap-2 p-1.5 rounded-lg bg-[#FAF9F6] border border-[#E8E5DD] hover:border-[#211f1f] cursor-pointer transition-colors"
                    >
                      <img src={item.img} alt={item.title} className="w-8 h-8 rounded object-cover" />
                      <div className="min-w-0 hidden sm:block">
                        <div className="text-[11px] font-bold text-[#211f1f] truncate">{item.title}</div>
                        <div className="text-[10px] text-[#706E68] font-mono">{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FIVE-PILLAR VALUE PROPOSITION STRIP (Exact equivalent of competitor trust bar) */}
      <section className="bg-white border-b border-[#E8E5DD] py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#F4F2EB]">
          {/* 1. Google 50k Happy Customers */}
          <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E8E5DD] flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[#FBBC05] fill-[#FBBC05]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-sm text-[#211f1f]">50,000+ Clients</span>
              </div>
              <p className="text-[11px] text-[#706E68]">Google 4.9★ in Dubai & GCC</p>
            </div>
          </div>

          {/* 2. 1,000+ Custom Products */}
          <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E8E5DD] flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-[#29abe1]" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-[#211f1f]">1,000+ Products</span>
              <p className="text-[11px] text-[#706E68]">High quality. No minimums!</p>
            </div>
          </div>

          {/* 3. Affordable Prices */}
          <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E8E5DD] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#e80f8a]" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-[#211f1f]">Affordable Prices</span>
              <p className="text-[11px] text-[#706E68]">Up to 40% bulk discounts!</p>
            </div>
          </div>

          {/* 4. Fast & Free UAE Shipping */}
          <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E8E5DD] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-[#211f1f]">Fast UAE Shipping</span>
              <p className="text-[11px] text-[#706E68]">Free delivery on AED 250+</p>
            </div>
          </div>

          {/* 5. Worry Free Guarantee */}
          <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4 col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E8E5DD] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#211f1f]" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-[#211f1f]">100% Worry Free</span>
              <p className="text-[11px] text-[#706E68]">Free 1:1 proof before print</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SHOWCASE: "Create Custom Products, Super Fast 🚀" (Matching competitor structure) */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#E8E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF9F6] border border-[#E8E5DD] rounded-full text-xs font-mono text-[#706E68] mb-3">
              <Flame className="w-3.5 h-3.5 text-[#e80f8a]" />
              <span>EXPLORE ALL CATEGORIES</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#211f1f] tracking-tight">
              Create Custom Products, Super Fast 🚀
            </h2>
            <p className="text-sm text-[#706E68] mt-2">
              Select your category below to launch the online design customizer or view bulk pricing.
            </p>
          </div>

          {/* Multi-Category Responsive Grid (14 Tiles) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {CATEGORY_GRID.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('shop', cat.id)}
                className={`group rounded-xl border ${cat.borderTone} ${cat.bgTone} p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-md cursor-pointer`}
              >
                {/* Photo Stage */}
                <div className="aspect-square w-full rounded-lg bg-white overflow-hidden border border-black/5 shadow-2xs mb-3 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs font-mono text-[10px] font-bold text-[#211f1f] px-2 py-0.5 rounded shadow-2xs">
                    {cat.price}
                  </div>
                </div>

                {/* Details */}
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xs sm:text-sm text-[#211f1f] tracking-tight uppercase leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#706E68] mt-0.5 line-clamp-1">
                      {cat.sub}
                    </p>
                  </div>

                  {/* Clean Pill Button */}
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('shop', cat.id);
                      }}
                      className="w-full py-1.5 px-3 bg-[#211f1f] group-hover:bg-[#383636] text-white rounded text-xs font-bold tracking-wider uppercase transition-colors"
                    >
                      CUSTOMIZE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Catalog Banner Link */}
          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('shop', 'all')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF9F6] hover:bg-[#F4F2EB] text-[#211f1f] border border-[#E8E5DD] hover:border-[#211f1f] rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>View Full 1,000+ Product Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. "CUSTOMIZE WORLD-LEADING BRANDS" STRIP (Exact equivalent of competitor retail brand bar) */}
      <section className="py-10 bg-[#FAF9F6] border-b border-[#E8E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center font-display font-bold text-xs uppercase tracking-widest text-[#706E68] mb-6">
            Customize World-Leading Blanks & Premium Retail Brands
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {[
              { name: 'NIKE', font: 'font-display font-black text-2xl tracking-tighter' },
              { name: 'AS COLOUR', font: 'font-sans font-extrabold text-lg tracking-widest' },
              { name: 'STANLEY 1913', font: 'font-display font-bold text-xl tracking-tight' },
              { name: 'MOLESKINE', font: 'font-serif font-bold text-lg tracking-widest' },
              { name: 'NEW ERA', font: 'font-display font-black text-xl tracking-wider' },
              { name: 'SWISS PEAK', font: 'font-sans font-bold text-base tracking-wide' },
              { name: 'YUPOONG', font: 'font-mono font-black text-lg tracking-tight' },
              { name: 'BELLA+CANVAS', font: 'font-sans font-semibold text-base tracking-tight' }
            ].map((brand) => (
              <div
                key={brand.name}
                className={`text-[#211f1f] hover:text-[#29abe1] transition-colors cursor-default select-none ${brand.font}`}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HIGH-IMPACT CORPORATE / B2B PROMOTIONAL BANNER */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#E8E5DD] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-[#D5EFEA] via-[#E8F6F3] to-[#FDF8EE] border border-[#C5E5DD] p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Team & Real Garments Photo */}
              <div className="lg:col-span-4 order-2 lg:order-1">
                <div className="relative rounded-xl overflow-hidden border border-white/60 shadow-md">
                  <img
                    src="/products/corporate-team.jpg"
                    alt="Corporate team wearing custom branded UAE uniforms"
                    className="w-full aspect-4/3 object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#211f1f]/85 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[10px] font-mono">
                    Staff Uniforms & Event Merch
                  </div>
                </div>
              </div>

              {/* Center Column: Dominant B2B Message & Fast Estimator */}
              <div className="lg:col-span-8 order-1 lg:order-2 space-y-5 text-center lg:text-left">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#211f1f]">
                    Enterprise & Wholesale Inquiries
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-[#211f1f] uppercase tracking-tight mt-1">
                    Elevate Your Company With Custom Promotional Merchandise
                  </h3>
                  <p className="text-xs sm:text-sm text-[#524F49] mt-2 max-w-xl">
                    Equip your workforce, onboard new hires with VIP welcome boxes, and stand out at GITEX, Arab Health, and ADIPEC.
                  </p>
                </div>

                {/* Interactive Instant B2B Price Estimator */}
                <div className="bg-white/90 backdrop-blur-xs border border-[#C5E5DD] rounded-xl p-4 max-w-xl shadow-xs">
                  <div className="text-xs font-bold text-[#211f1f] mb-3 flex items-center justify-between">
                    <span>Quick B2B Volume Estimator</span>
                    <span className="text-[#25D366] font-mono">
                      {b2bEstimates.discountPct > 0 ? `${b2bEstimates.discountPct}% Bulk Savings Applied` : 'Standard Tier'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    {[
                      { id: 'tees', label: 'T-Shirts' },
                      { id: 'hoodies', label: 'Hoodies' },
                      { id: 'bottles', label: 'Tumblers' },
                      { id: 'gifts', label: 'VIP Hampers' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setB2bProduct(type.id as any)}
                        className={`py-1.5 px-2 rounded text-xs font-medium border transition-colors ${
                          b2bProduct === type.id
                            ? 'bg-[#211f1f] text-white border-[#211f1f]'
                            : 'bg-white text-[#524F49] border-[#E8E5DD] hover:border-[#211f1f]'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>

                  {/* Quantity Range */}
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs text-[#706E68]">
                      <span>Quantity: <strong className="text-[#211f1f]">{b2bQuantity} units</strong></span>
                      <span className="font-mono text-[10px]">Tier: 25 - 500+</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="500"
                      step="25"
                      value={b2bQuantity}
                      onChange={(e) => setB2bQuantity(Number(e.target.value))}
                      className="w-full accent-[#211f1f] cursor-pointer"
                    />
                  </div>

                  {/* Estimated Output Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F4F2EB]">
                    <div>
                      <span className="text-[11px] text-[#706E68]">Estimated Rate:</span>
                      <div className="font-display font-black text-lg text-[#211f1f]">
                        AED {b2bEstimates.unitPrice} <span className="text-xs font-normal text-[#706E68]">/ unit</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleWhatsApp(`B2B Inquiry for ${b2bQuantity}x ${b2bProduct} @ AED ${b2bEstimates.unitPrice}/unit`)}
                      className="py-2 px-4 bg-[#211f1f] hover:bg-[#383636] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Request Official PDF Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "TRUSTED BY 1000'S OF COMPANIES" CLIENT LOGOS STRIP */}
      <section className="py-12 bg-[#FAF9F6] border-b border-[#E8E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="font-display font-black text-xl sm:text-2xl text-[#211f1f] uppercase tracking-tight">
            Trusted by 1,000's of Companies in the UAE
          </h3>
          <p className="text-xs text-[#706E68] mt-1 max-w-md mx-auto">
            From regional unicorns to government entities, leading brands trust DOHAR for on-time delivery.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-6 sm:gap-10 mt-8 items-center justify-center opacity-80">
            {[
              'EMAAR',
              'AMAZON MENA',
              'CAREEM',
              'DUBAI FUTURE FOUNDATION',
              'CHALHOUB GROUP',
              'NOON',
              'WEWORK UAE',
              'DISNEY GCC',
              'COCA-COLA',
              'e& (ETISALAT)'
            ].map((client) => (
              <div
                key={client}
                className="font-display font-black text-base sm:text-lg text-[#524F49] hover:text-[#211f1f] transition-colors tracking-wider"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BRAND VALUE PROMISE & MERCH PORTFOLIO GALLERY */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#E8E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-bold text-[#29abe1] uppercase tracking-wider">
                Partner, Not Just a Supplier
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#211f1f] leading-tight">
                High Quality. Fast Delivery. Great Prices.
              </h2>
              <p className="text-sm text-[#524F49] leading-relaxed">
                Work with a dedicated UAE production partner who handles everything under one roof: design proofs, garment blank sourcing, screen printing, rotary UV, and Tajima embroidery.
              </p>

              <div className="space-y-2 pt-2 text-xs text-[#211f1f]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Free digital proof and mockup review before production</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Physical swatch samples available for enterprise projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Strict CMYK pantone matching & OEKO-TEX certified inks</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('corporate')}
                  className="px-6 py-3 bg-[#211f1f] hover:bg-[#383636] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore B2B Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Merch Spread Image */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-[#E8E5DD] shadow-md bg-[#FAF9F6]">
                <img
                  src="/products/hero-merchandise.jpg"
                  alt="Real printed corporate merchandise samples"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MULTI-CHANNEL CONCIERGE STRIP (The 4 big contact boxes from competitor) */}
      <section className="py-14 bg-[#FAF9F6] border-b border-[#E8E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#211f1f] uppercase tracking-tight">
              Ready to Bring Your Merchandise to Life?
            </h3>
            <p className="text-xs sm:text-sm text-[#706E68] mt-1">
              Choose your preferred communication channel to speak directly with our UAE production team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Box 1: WhatsApp */}
            <a
              href="https://wa.me/971504928812"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-[#E8E5DD] hover:border-[#25D366] p-6 text-center transition-all duration-200 hover:shadow-md group block"
            >
              <div className="w-12 h-12 rounded-full bg-[#EBF7EE] text-[#25D366] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 fill-[#25D366]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#211f1f]">WhatsApp</h4>
              <p className="font-mono text-xs font-semibold text-[#25D366] mt-1">+971 50 492 8812</p>
              <p className="text-[11px] text-[#706E68] mt-1">Instant replies in ~30s</p>
            </a>

            {/* Box 2: Call Hotline */}
            <a
              href="tel:+971504928812"
              className="bg-white rounded-xl border border-[#E8E5DD] hover:border-[#211f1f] p-6 text-center transition-all duration-200 hover:shadow-md group block"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] text-[#211f1f] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform border border-[#E8E5DD]">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-base text-[#211f1f]">Call Us</h4>
              <p className="font-mono text-xs font-semibold text-[#211f1f] mt-1">800-DOHAR (Toll Free)</p>
              <p className="text-[11px] text-[#706E68] mt-1">Mon - Sat: 8am – 8pm</p>
            </a>

            {/* Box 3: Showroom Meeting */}
            <div
              onClick={() => onNavigate('contact')}
              className="bg-white rounded-xl border border-[#E8E5DD] hover:border-[#29abe1] p-6 text-center transition-all duration-200 hover:shadow-md group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#EBF4FA] text-[#29abe1] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-base text-[#211f1f]">Meet In Person</h4>
              <p className="font-mono text-xs font-semibold text-[#29abe1] mt-1">Al Quoz Showroom</p>
              <p className="text-[11px] text-[#706E68] mt-1">Touch real blanks & fabrics</p>
            </div>

            {/* Box 4: Email RFQ */}
            <a
              href="mailto:orders@doharprint.ae"
              className="bg-white rounded-xl border border-[#E8E5DD] hover:border-[#e80f8a] p-6 text-center transition-all duration-200 hover:shadow-md group block"
            >
              <div className="w-12 h-12 rounded-full bg-[#FCEBF5] text-[#e80f8a] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-base text-[#211f1f]">Email RFQ</h4>
              <p className="font-mono text-xs font-semibold text-[#e80f8a] mt-1">orders@doharprint.ae</p>
              <p className="text-[11px] text-[#706E68] mt-1">Tenders & large batch quotes</p>
            </a>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section className="py-14 bg-white border-b border-[#E8E5DD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-[#706E68] uppercase tracking-wider">Help & Guidelines</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#211f1f] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="border border-[#E8E5DD] rounded-xl bg-[#FAF9F6] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-display font-bold text-base text-[#211f1f]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#706E68] shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? 'rotate-180 text-[#211f1f]' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#524F49] leading-relaxed border-t border-[#E8E5DD]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
