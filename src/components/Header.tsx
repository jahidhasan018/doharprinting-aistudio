import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import {
  Search,
  ShoppingBag,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  ChevronDown,
  Building2,
  Printer,
  PackageCheck,
  Compass,
  ArrowRight,
  Flame,
  Shirt,
  Shield,
  Trophy,
  Coffee,
  HardHat,
  Briefcase,
  Gift,
  Laptop
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, categoryFilter?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

const CATEGORIES_MENU = [
  { id: 'apparel', label: 'T-Shirts & Tops', count: '12 items', desc: 'Heavyweight, oversized & ring-spun cotton' },
  { id: 'hoodies', label: 'Hoodies & Fleece', count: '8 items', desc: 'Premium 380 GSM fleece with DTF or embroidery' },
  { id: 'uniforms', label: 'Uniforms & Workwear', count: '10 items', desc: 'Hi-vis vests, chef coats, hospitality polos' },
  { id: 'headwear', label: 'Caps & Headwear', count: '6 items', desc: 'Structured dad caps, trucker hats & beanies' },
  { id: 'drinkware', label: 'Bottles & Mugs', count: '9 items', desc: 'Rotary UV insulated tumblers & ceramic mugs' },
  { id: 'bags', label: 'Tote & Duffle Bags', count: '7 items', desc: 'Organic cotton & heavy canvas shopper totes' },
  { id: 'office', label: 'Office & Journals', count: '8 items', desc: 'Embossed PU notebooks & executive metal pens' },
  { id: 'gifting', label: 'Corporate Gifting', count: '14 sets', desc: 'Curated VIP welcome sets & onboarding boxes' }
];

const QUICK_CATEGORY_RIBBON = [
  { id: 'all', label: 'Best Sellers', icon: Flame, isHot: true },
  { id: 'all', label: 'New Arrivals', icon: Sparkles, isNew: true },
  { id: 'apparel', label: 'T-Shirts', icon: Shirt },
  { id: 'hoodies', label: 'Hoodies', icon: Shirt },
  { id: 'uniforms', label: 'Uniforms', icon: Shield },
  { id: 'jerseys', label: 'Sportswear', icon: Trophy },
  { id: 'drinkware', label: 'Bottles & Mugs', icon: Coffee },
  { id: 'headwear', label: 'Caps', icon: HardHat },
  { id: 'bags', label: 'Bags', icon: Briefcase },
  { id: 'office', label: 'Office', icon: Briefcase },
  { id: 'gifting', label: 'Gifting', icon: Gift },
  { id: 'tech', label: 'Tech & Travel', icon: Laptop }
];

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('AED');
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCategory = (catId: string) => {
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
    onNavigate('shop', catId);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E8E5DD] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* 1. Top Announcement & Utility Bar (Inspired by competitor layout, elevated and clean) */}
      <div className="bg-[#211f1f] text-[#E8E5DD] text-[11px] py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Currency / Language Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-white/70 hidden sm:inline">UAE</span>
            <select
              value={selectedCurrency}
              aria-label="Currency"
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-transparent text-white font-mono text-[11px] border border-white/20 rounded px-1.5 py-0.5 cursor-pointer focus:outline-none"
            >
              <option value="AED" className="bg-[#211f1f] text-white">AED (د.إ)</option>
              <option value="USD" className="bg-[#211f1f] text-white">USD ($)</option>
              <option value="SAR" className="bg-[#211f1f] text-white">SAR (﷼)</option>
            </select>
          </div>

          {/* Center: Promotional Drop Code Pill */}
          <div className="flex items-center gap-1.5 text-center">
            <span className="bg-[#faec1c] text-[#211f1f] font-black px-1.5 py-0.2 rounded text-[10px] uppercase tracking-wide">
              50% Price Drop
            </span>
            <span className="text-white font-medium hidden md:inline">
              Extra 20% OFF with code
            </span>
            <span className="font-mono font-bold text-[#faec1c] underline tracking-wider">
              DOHAR20
            </span>
          </div>

          {/* Right: Quick Links & Hotline */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <button
              onClick={() => onNavigate('track')}
              className="text-white/80 hover:text-[#faec1c] transition-colors cursor-pointer flex items-center gap-1"
            >
              <PackageCheck className="w-3 h-3 text-[#29abe1]" />
              <span className="hidden sm:inline">Track Order</span>
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a
              href="tel:+971504928812"
              className="flex items-center gap-1.5 text-white/90 hover:text-[#faec1c] transition-colors font-mono"
            >
              <PhoneCall className="w-3 h-3 text-[#faec1c]" />
              <span className="font-medium text-[11px]">800-DOHAR</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-6">
          {/* Left: Primary Section Links */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#211f1f] hover:bg-[#F4F2EB] rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <nav className="hidden lg:flex items-center gap-5 text-xs font-bold tracking-wider uppercase text-[#211f1f]">
              <button
                onClick={() => onNavigate('studio')}
                className={`hover:text-[#29abe1] transition-colors cursor-pointer ${
                  currentTab === 'studio' ? 'text-[#29abe1] underline underline-offset-8' : ''
                }`}
              >
                Customize
              </button>
              <button
                onClick={() => onNavigate('corporate')}
                className={`hover:text-[#29abe1] transition-colors cursor-pointer ${
                  currentTab === 'corporate' ? 'text-[#29abe1] underline underline-offset-8' : ''
                }`}
              >
                Corporate
              </button>
              <button
                onClick={() => onNavigate('shop', 'gifting')}
                className="hover:text-[#29abe1] transition-colors cursor-pointer"
              >
                Gifting
              </button>
              <button
                onClick={() => onNavigate('methods')}
                className={`hover:text-[#29abe1] transition-colors cursor-pointer text-[#706E68] ${
                  currentTab === 'methods' ? 'text-[#211f1f]' : ''
                }`}
              >
                Techniques
              </button>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex justify-center flex-1 lg:flex-none">
            <button
              onClick={() => onNavigate('home')}
              className="text-left cursor-pointer focus:outline-none py-1"
            >
              <BrandLogo variant="full" size="md" />
            </button>
          </div>

          {/* Right: Search Box, Cart, and Studio Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF9F6] border border-[#E8E5DD] hover:border-[#211f1f] rounded-full text-xs text-[#706E68] transition-colors shadow-2xs group w-44 md:w-60 justify-between"
              aria-label="Search Products"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#59554E] group-hover:text-[#211f1f] transition-colors" />
                <span className="text-xs truncate">Search 1,000+ Products...</span>
              </div>
              <kbd className="hidden md:inline-block font-mono text-[9px] bg-white px-1.5 py-0.5 rounded text-[#706E68] border border-[#E8E5DD]">
                ⌘K
              </kbd>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2 rounded-full hover:bg-[#FAF9F6] text-[#211f1f] transition-colors cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#211f1f]" />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#211f1f] text-[#faec1c] font-mono text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] rounded-full bg-[#E8E5DD] text-[#59554E] font-mono text-[9px] font-medium flex items-center justify-center">
                  0
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Secondary Category Ribbon (Matching the icon strip from the competitor) */}
      <div className="border-t border-[#E8E5DD] bg-white py-1.5 px-4 sm:px-6 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {QUICK_CATEGORY_RIBBON.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <button
                  key={`${cat.id}-${idx}`}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer ${
                    cat.isHot
                      ? 'bg-[#faec1c]/20 border-[#faec1c] text-[#211f1f] font-semibold'
                      : cat.isNew
                      ? 'bg-[#EBF7EE] border-[#25D366]/40 text-[#1E7E34] font-semibold'
                      : 'bg-[#FAF9F6] hover:bg-white text-[#524F49] hover:text-[#211f1f] border-[#E8E5DD] hover:border-[#211f1f]'
                  }`}
                >
                  <Icon className={`w-3 h-3 ${cat.isHot ? 'text-[#e80f8a]' : cat.isNew ? 'text-[#25D366]' : 'text-[#706E68]'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Customize Action Button */}
          <button
            onClick={() => onNavigate('studio')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#211f1f] hover:bg-[#383636] text-white rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-transform active:scale-95 shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-[#faec1c]" />
            <span>Customize Now</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E5DD] bg-white px-5 py-5 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#F4F2EB]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('studio');
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#211f1f] text-white font-bold text-xs rounded-lg"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#faec1c]" />
                <span>Customize Studio</span>
              </button>
              <button
                onClick={() => {
                  const text = encodeURIComponent('Hello DOHAR! Requesting quotation & product catalog.');
                  window.open(`https://wa.me/971504928812?text=${text}`, '_blank');
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] text-white font-bold text-xs rounded-lg"
              >
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 text-sm font-semibold text-[#211f1f] hover:text-[#29abe1]"
              >
                <span>Home</span>
                <Compass className="w-4 h-4 text-[#8C877D]" />
              </button>

              <button
                onClick={() => {
                  onNavigate('shop', 'all');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 text-sm font-semibold text-[#211f1f] hover:text-[#29abe1]"
              >
                <span>Shop All Catalogue</span>
                <span className="text-xs font-mono text-[#8C877D]">1,000+ Items</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('corporate');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 text-sm font-semibold text-[#211f1f] hover:text-[#29abe1]"
              >
                <span>Corporate & Bulk B2B</span>
                <Building2 className="w-4 h-4 text-[#8C877D]" />
              </button>

              <button
                onClick={() => {
                  onNavigate('methods');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 text-sm font-semibold text-[#211f1f] hover:text-[#29abe1]"
              >
                <span>Print Techniques Guide</span>
                <Printer className="w-4 h-4 text-[#8C877D]" />
              </button>

              <button
                onClick={() => {
                  onNavigate('track');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 text-sm font-semibold text-[#211f1f] hover:text-[#29abe1]"
              >
                <span>Track UAE Delivery</span>
                <PackageCheck className="w-4 h-4 text-[#8C877D]" />
              </button>
            </nav>

            {/* Category Quick Links for Mobile */}
            <div className="pt-3 border-t border-[#F4F2EB]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C877D] block mb-2">
                Popular Categories
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES_MENU.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className="text-xs px-2.5 py-1 bg-[#FAF9F6] border border-[#E8E5DD] hover:border-[#211f1f] rounded text-[#59554E]"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
