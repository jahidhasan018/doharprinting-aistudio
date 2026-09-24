import React, { useState, useMemo } from 'react';
import { PRODUCTS, FAQ_ITEMS } from '../data/mockData';
import { Product, PrintMethod } from '../types';
import { ProductCard } from '../components/ProductCard';
import {
  SlidersHorizontal,
  ChevronDown,
  Check,
  Star,
  Truck,
  RotateCcw,
  Sparkles,
  MessageSquare,
  PhoneCall,
  Calendar,
  Mail
} from 'lucide-react';

interface ShopPageProps {
  initialCategory?: string;
  onCustomizeProduct: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'apparel', label: 'T-Shirts & Polos' },
  { id: 'hoodies', label: 'Hoodies & Fleece' },
  { id: 'uniforms', label: 'Workwear & Vests' },
  { id: 'headwear', label: 'Caps & Beanies' },
  { id: 'drinkware', label: 'Bottles & Mugs' },
  { id: 'bags', label: 'Tote Bags' },
  { id: 'office', label: 'Office & Stationery' },
  { id: 'gifting', label: 'Corporate Gifting' }
];

const PRINT_TECHNIQUES: { id: PrintMethod; label: string }[] = [
  { id: 'DTF', label: 'Direct-to-Film (DTF)' },
  { id: 'Screen', label: 'Screen Printing' },
  { id: 'Embroidery', label: 'Precision Embroidery' },
  { id: 'UV', label: 'Rotary UV Printing' },
  { id: 'Sublimation', label: 'Sublimation' }
];

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  onCustomizeProduct,
  onSelectProduct,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTechniques, setSelectedTechniques] = useState<PrintMethod[]>([]);
  const [noMoqOnly, setNoMoqOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [visibleCount, setVisibleCount] = useState(9);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleTechnique = (tech: PrintMethod) => {
    setSelectedTechniques((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'bestsellers') {
        result = result.filter((p) => p.badge === 'Best Seller');
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    if (selectedTechniques.length > 0) {
      result = result.filter((p) =>
        p.supportedMethods.some((m) => selectedTechniques.includes(m))
      );
    }

    if (noMoqOnly) {
      result = result.filter((p) => p.moq === 1);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedTechniques, noMoqOnly, sortBy]);

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      'Hello DOHAR UAE! I am browsing your online catalogue and would like assistance with bulk pricing and sample proofs.'
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* 1. Category Hero Banner */}
      <section className="bg-white border-b border-[#E8E5DD] py-10 md:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-halftone-pattern opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#706E68] mb-1">
                <span>DOHAR CATALOGUE</span>
                <span>/</span>
                <span className="uppercase text-[#211f1f] font-bold">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'All Products'}
                </span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-[#211f1f] tracking-tight">
                Custom Printed Gear & Corporate Merchandise
              </h1>
              <p className="text-xs sm:text-sm text-[#524F49] mt-2 max-w-2xl">
                Select your blank garment or promotional item. Customize with Direct-to-Film (DTF), UV curing, or 3D embroidery with transparent volume pricing in AED.
              </p>
            </div>

            <button
              onClick={() => onNavigate('studio')}
              className="py-2.5 px-4 bg-[#211f1f] text-white rounded text-xs font-bold tracking-wider uppercase hover:bg-[#383636] transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#faec1c]" />
              <span>Open 3D Mockup Studio</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip under Hero (from reference anatomy) */}
      <div className="bg-[#F4F2EB] border-b border-[#E8E5DD] py-3.5 px-4 sm:px-6 text-xs text-[#211f1f]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-[#faec1c] text-[#faec1c]" />
            <span className="font-semibold">4.9/5 Rating (500+ UAE Reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs bg-white px-1.5 py-0.5 rounded border border-[#E8E5DD]">
              1,000+
            </span>
            <span>Custom Products Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#29abe1]" />
            <span>Up to 52% Bulk Volume Discount</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#211f1f]" />
            <span>Fast Same-Day / 24h UAE Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#25D366]" />
            <span>100% Prepress Proof Guarantee</span>
          </div>
        </div>
      </div>

      {/* 3. Main Catalogue Layout: Sidebar + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Filter Sidebar (1 col) */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-lg border border-[#E8E5DD] space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-[#F4F2EB]">
                <h3 className="font-display font-bold text-base text-[#211f1f] uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#211f1f]" />
                  <span>Filters</span>
                </h3>
                {(selectedCategory !== 'all' || selectedTechniques.length > 0 || noMoqOnly) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedTechniques([]);
                      setNoMoqOnly(false);
                    }}
                    className="text-[11px] text-[#e80f8a] hover:underline font-mono"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Category Radio / List */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider mb-2.5">
                  Categories
                </h4>
                <div className="space-y-1 text-xs">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between py-1.5 px-2 rounded transition-colors text-left ${
                        selectedCategory === cat.id
                          ? 'bg-[#211f1f] text-white font-bold'
                          : 'text-[#524F49] hover:bg-[#F4F2EB] hover:text-[#211f1f]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Print Technique Filter */}
              <div className="pt-4 border-t border-[#F4F2EB]">
                <h4 className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider mb-2.5">
                  Print Technique
                </h4>
                <div className="space-y-1.5 text-xs">
                  {PRINT_TECHNIQUES.map((tech) => {
                    const isChecked = selectedTechniques.includes(tech.id);
                    return (
                      <label
                        key={tech.id}
                        className="flex items-center gap-2 cursor-pointer text-[#524F49] hover:text-[#211f1f]"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleTechnique(tech.id)}
                          className="rounded border-[#E8E5DD] text-[#211f1f] focus:ring-0"
                        />
                        <span>{tech.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* MOQ Toggle */}
              <div className="pt-4 border-t border-[#F4F2EB]">
                <h4 className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider mb-2.5">
                  Minimum Order (MOQ)
                </h4>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#524F49] hover:text-[#211f1f]">
                  <input
                    type="checkbox"
                    checked={noMoqOnly}
                    onChange={(e) => setNoMoqOnly(e.target.checked)}
                    className="rounded border-[#E8E5DD] text-[#211f1f] focus:ring-0"
                  />
                  <span>No Minimums (Order 1 Piece)</span>
                </label>
              </div>

              {/* WhatsApp Help Card in Sidebar */}
              <div className="p-3.5 bg-[#FAF9F6] border border-[#E8E5DD] rounded text-xs space-y-2">
                <span className="font-display font-bold text-xs uppercase text-[#211f1f] block">
                  Need a custom print quote?
                </span>
                <p className="text-[11px] text-[#706E68]">
                  Share your artwork with our prepress team for instant feasibility and quote.
                </p>
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-1.5 px-2 bg-[#25D366] text-white rounded font-bold text-[11px] flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3 h-3 fill-white" />
                  <span>WhatsApp Specialist</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area (3 cols) */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Product count & Sort dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white border border-[#E8E5DD] rounded-lg text-xs">
              <div className="flex items-center gap-2 text-[#706E68]">
                <span>Showing</span>
                <strong className="text-[#211f1f] font-mono">{filteredProducts.length}</strong>
                <span>products</span>
                {selectedCategory !== 'all' && (
                  <span className="bg-[#F4F2EB] px-2 py-0.5 rounded text-[11px] font-mono text-[#211f1f]">
                    in {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#706E68]">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-[#FAF9F6] border border-[#E8E5DD] rounded px-3 py-1.5 pr-8 text-xs font-semibold text-[#211f1f] outline-none cursor-pointer"
                  >
                    <option value="featured">Featured / Best Sellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Customer Rating</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#706E68] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 3-Column Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E8E5DD] rounded-lg p-12 text-center space-y-3">
                <p className="text-sm font-semibold text-[#211f1f]">
                  No products matched your exact filter combination.
                </p>
                <p className="text-xs text-[#706E68]">
                  Try clearing your technique or minimum order filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedTechniques([]);
                    setNoMoqOnly(false);
                  }}
                  className="py-2 px-4 bg-[#211f1f] text-white text-xs font-bold rounded"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCustomize={onCustomizeProduct}
                    onSelect={onSelectProduct}
                  />
                ))}
              </div>
            )}

            {/* Load More Control (as required in prompt) */}
            {filteredProducts.length > 0 && (
              <div className="pt-6 pb-2 text-center space-y-3 border-t border-[#E8E5DD]">
                <div className="text-xs font-mono text-[#706E68]">
                  Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} products
                </div>
                {visibleCount < filteredProducts.length ? (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="py-2.5 px-6 bg-white hover:bg-[#F4F2EB] text-[#211f1f] border border-[#E8E5DD] rounded text-xs font-bold tracking-wider uppercase transition-colors"
                  >
                    Load More Products ({filteredProducts.length - visibleCount} remaining)
                  </button>
                ) : (
                  <div className="text-xs text-[#8C877D] font-mono">
                    All matching catalogue items loaded
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4. SEO Text Block with Read-More Toggle */}
      <section className="bg-white border-t border-b border-[#E8E5DD] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-2xl text-[#211f1f] uppercase tracking-tight mb-3">
            Best Custom Merchandise & Corporate Printing in Dubai & UAE
          </h2>
          <div className="text-xs sm:text-sm text-[#524F49] leading-relaxed space-y-3">
            <p>
              At DOHAR TEXTILES PRINTING L.L.C, our merchandise collections represent the highest quality on-demand garment and rigid substrate printing across Dubai, Abu Dhabi, Sharjah, and Ajman. Whether you are launching a streetwear capsule, outfitting an F&B hospitality staff, or executing 2,000 corporate welcome packages for an international conference, we combine Japanese printing precision with dependable local UAE fulfillment.
            </p>
            {seoExpanded && (
              <div className="space-y-3 pt-2">
                <h3 className="font-display font-bold text-base text-[#211f1f] uppercase">
                  Why UAE Businesses Partner with DOHAR
                </h3>
                <p>
                  Unlike online print brokers who outsource to anonymous third parties, DOHAR operates in-house Direct-to-Film (DTF), rotary UV flatbeds, and computerized multi-head embroidery stations in our UAE production centers. Every order undergoes rigorous prepress file inspections, ensuring crisp Pantone color fidelity, accurate CMYK registration, and durable heat-press curing designed to endure the high-heat climate and frequent industrial laundering.
                </p>
                <p>
                  With flexible payment options including UAE Corporate Net-30 invoicing, TRN Tax registration, and express courier dispatch across all 7 Emirates, DOHAR is the premier merchandise printing partner for brands that refuse to compromise on quality or deadlines.
                </p>
              </div>
            )}
            <button
              onClick={() => setSeoExpanded(!seoExpanded)}
              className="text-xs font-bold text-[#29abe1] hover:underline pt-1 inline-block"
            >
              {seoExpanded ? 'Show Less' : 'Read Full Production Overview →'}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Closing Trust Banner & 4 Contact Cards */}
      <section className="py-14 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display font-black text-3xl uppercase text-[#211f1f] tracking-tight">
              High Quality. Fast Delivery. Great Prices.
            </h2>
            <p className="text-xs sm:text-sm text-[#706E68] mt-1">
              Need custom apparel, packaging, or bulk orders? Connect directly with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={handleWhatsAppInquiry}
              className="p-5 bg-white border border-[#E8E5DD] hover:border-[#25D366] rounded-xl cursor-pointer transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#EBF7EE] flex items-center justify-center text-[#25D366] mb-3">
                <MessageSquare className="w-5 h-5 fill-[#25D366]" />
              </div>
              <h3 className="font-display font-bold text-base text-[#211f1f] uppercase">WhatsApp Us</h3>
              <p className="text-xs text-[#706E68] mt-1">+971 50 492 8812</p>
            </div>

            <a
              href="tel:+97143809221"
              className="p-5 bg-white border border-[#E8E5DD] hover:border-[#211f1f] rounded-xl cursor-pointer transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4F2EB] flex items-center justify-center text-[#211f1f] mb-3">
                <PhoneCall className="w-5 h-5 text-[#211f1f]" />
              </div>
              <h3 className="font-display font-bold text-base text-[#211f1f] uppercase">Call Factory</h3>
              <p className="text-xs text-[#706E68] mt-1">+971 4 380 9221</p>
            </a>

            <div
              onClick={() => onNavigate('contact')}
              className="p-5 bg-white border border-[#E8E5DD] hover:border-[#211f1f] rounded-xl cursor-pointer transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4F2EB] flex items-center justify-center text-[#211f1f] mb-3">
                <Calendar className="w-5 h-5 text-[#211f1f]" />
              </div>
              <h3 className="font-display font-bold text-base text-[#211f1f] uppercase">Meet at Showroom</h3>
              <p className="text-xs text-[#706E68] mt-1">Al Quoz 3, Dubai</p>
            </div>

            <a
              href="mailto:orders@doharprint.ae"
              className="p-5 bg-white border border-[#E8E5DD] hover:border-[#211f1f] rounded-xl cursor-pointer transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4F2EB] flex items-center justify-center text-[#211f1f] mb-3">
                <Mail className="w-5 h-5 text-[#211f1f]" />
              </div>
              <h3 className="font-display font-bold text-base text-[#211f1f] uppercase">Email Inquiries</h3>
              <p className="text-xs text-[#706E68] mt-1">orders@doharprint.ae</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
