import React, { useState, useMemo } from 'react';
import { Product, PrintMethod, ProductVariant } from '../types';
import { ProductArtworkMockup } from '../components/ProductArtworkMockup';
import {
  Sparkles,
  MessageSquare,
  ShoppingBag,
  ArrowLeft,
  Check,
  Truck,
  ShieldCheck,
  Upload,
  Layers,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: {
    product: Product;
    selectedColor: ProductVariant;
    selectedSize: string;
    selectedMethod: PrintMethod;
    quantity: number;
    unitPrice: number;
    customDesignText?: string;
  }) => void;
  onOpenStudioWithProduct: (product: Product) => void;
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onOpenStudioWithProduct
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductVariant>(
    product.variants[0] || { colorName: 'Jet Black', colorHex: '#1F2022', inStock: true }
  );
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedMethod, setSelectedMethod] = useState<PrintMethod>(
    product.supportedMethods[0] || 'DTF'
  );
  const [quantity, setQuantity] = useState(15);
  const [customText, setCustomText] = useState('YOUR LOGO HERE');
  const [artworkFile, setArtworkFile] = useState<string | null>(null);
  const [deliveryEmirate, setDeliveryEmirate] = useState<'Dubai' | 'Abu Dhabi' | 'Sharjah'>('Dubai');
  const [addedToast, setAddedToast] = useState(false);
  const [viewMode, setViewMode] = useState<'photo' | 'proof'>('photo');

  // Compute unit price based on tiered quantity
  const unitPrice = useMemo(() => {
    for (const tier of product.tierPricing) {
      if (quantity >= tier.minQty && (tier.maxQty === undefined || quantity <= tier.maxQty)) {
        return tier.pricePerUnit;
      }
    }
    return product.basePrice;
  }, [product, quantity]);

  const totalPrice = unitPrice * quantity;
  const originalTotalPrice = product.basePrice * quantity;
  const totalSavings = originalTotalPrice - totalPrice;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setArtworkFile(url);
      setCustomText(file.name.replace(/\.[^/.]+$/, '').slice(0, 15));
    }
  };

  const handleAdd = () => {
    onAddToCart({
      product,
      selectedColor,
      selectedSize,
      selectedMethod,
      quantity,
      unitPrice,
      customDesignText: customText
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hello DOHAR UAE! I want a quote for:
Item: ${product.title}
Quantity: ${quantity} units
Color: ${selectedColor.colorName}
Size: ${selectedSize}
Print Method: ${selectedMethod}
Artwork Text: "${customText}"
Target Delivery: ${deliveryEmirate}, UAE
Calculated Estimate: AED ${totalPrice.toFixed(2)}`
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#706E68] mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1 hover:text-[#211f1f] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Catalogue</span>
          </button>
          <span>/</span>
          <span className="uppercase">{product.categoryLabel}</span>
          <span>/</span>
          <span className="text-[#211f1f] font-bold truncate max-w-xs">{product.title}</span>
        </div>

        {/* Main Grid: Left Gallery/Mockup & Right Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Stage (Real Product Photography + Digital Proof Toggle) */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white border border-[#E8E5DD] rounded-xl p-5 shadow-2xs overflow-hidden relative">
              {/* Stage Header with View Toggle */}
              <div className="flex items-center justify-between text-xs pb-3 mb-3 border-b border-[#F4F2EB]">
                <div className="flex items-center gap-1 p-0.5 bg-[#FAF9F6] border border-[#E8E5DD] rounded-md">
                  <button
                    type="button"
                    onClick={() => setViewMode('photo')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                      viewMode === 'photo'
                        ? 'bg-[#211f1f] text-white shadow-2xs'
                        : 'text-[#706E68] hover:text-[#211f1f]'
                    }`}
                  >
                    Studio Photography
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('proof')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                      viewMode === 'proof'
                        ? 'bg-[#211f1f] text-white shadow-2xs'
                        : 'text-[#706E68] hover:text-[#211f1f]'
                    }`}
                  >
                    Digital Print Proof
                  </button>
                </div>
                <span className="font-mono text-[11px] text-[#706E68]">
                  METHOD: <strong className="text-[#211f1f]">{selectedMethod}</strong>
                </span>
              </div>

              {/* Product Display Container */}
              <div className="aspect-square w-full bg-[#FAF9F6] rounded-lg border border-[#E8E5DD] overflow-hidden relative group">
                {viewMode === 'photo' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs border border-[#E8E5DD] px-2.5 py-1 rounded text-[11px] font-mono text-[#211f1f]">
                      Physical Blank Item Sample
                    </div>
                  </div>
                ) : (
                  <ProductArtworkMockup
                    type={product.illustrationType}
                    colorHex={selectedColor.colorHex}
                    customText={customText}
                    customLogoUrl={artworkFile || undefined}
                    printTechnique={selectedMethod}
                    showRegistrationMarks={true}
                  />
                )}
              </div>

              {/* Color Swatch Indicator Bar below image */}
              <div className="mt-4 pt-3 border-t border-[#F4F2EB] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#706E68]">Colorway:</span>
                  <span className="text-xs font-bold text-[#211f1f]">{selectedColor.colorName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.colorName}
                      type="button"
                      onClick={() => setSelectedColor(v)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        selectedColor.colorName === v.colorName
                          ? 'ring-2 ring-[#211f1f] ring-offset-2 scale-110'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: v.colorHex }}
                      title={v.colorName}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Link to Studio */}
            <div className="p-4 bg-[#F4F2EB] border border-[#E8E5DD] rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#faec1c]" />
                <span className="font-medium text-[#211f1f]">
                  Want multi-zone positioning or custom text fonts?
                </span>
              </div>
              <button
                onClick={() => onOpenStudioWithProduct(product)}
                className="font-bold text-[#211f1f] hover:text-[#29abe1] flex items-center gap-1 cursor-pointer"
              >
                <span>Open in Studio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase & Specification Module (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[#E8E5DD] rounded-xl p-6 sm:p-7 shadow-2xs space-y-6">
            {/* Title & Badge Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.badge && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#faec1c] text-[#211f1f]">
                    {product.badge}
                  </span>
                )}
                <span className="text-xs font-mono text-[#706E68] uppercase">
                  {product.specs}
                </span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#211f1f] uppercase tracking-tight leading-tight">
                {product.title}
              </h1>
              <p className="text-xs text-[#524F49] mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* 1. Print Method Selector */}
            <div className="pt-4 border-t border-[#F4F2EB]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider">
                  Select Print Technique
                </span>
                <span className="text-[11px] text-[#29abe1] font-semibold">
                  UAE Industrial Grade
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {product.supportedMethods.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMethod(m)}
                    className={`py-2 px-3 rounded border text-left font-medium transition-all ${
                      selectedMethod === m
                        ? 'border-[#211f1f] bg-[#211f1f] text-white shadow-2xs'
                        : 'border-[#E8E5DD] bg-[#FAF9F6] text-[#211f1f] hover:border-[#211f1f]'
                    }`}
                  >
                    <div className="font-bold">{m} Printing</div>
                    <div className="text-[10px] opacity-80">
                      {m === 'DTF' ? 'No MOQ · Full Color' : m === 'Embroidery' ? '3D Relief' : 'Precision Spot'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Mock Artwork Dropzone & Text Customizer */}
            <div className="pt-4 border-t border-[#F4F2EB] space-y-3">
              <span className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider block">
                Artwork / Imprint Specification
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Text Imprint Input */}
                <div>
                  <label className="text-[11px] text-[#706E68] font-medium block mb-1">
                    Text / Monogram Preview:
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    maxLength={25}
                    placeholder="Enter brand name"
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] font-mono outline-none focus:border-[#211f1f]"
                  />
                </div>

                {/* File Upload Drop Area */}
                <div>
                  <label className="text-[11px] text-[#706E68] font-medium block mb-1">
                    Upload Logo / Vector (Optional):
                  </label>
                  <label className="flex items-center justify-center gap-2 px-3 py-2 bg-[#FAF9F6] border border-dashed border-[#E8E5DD] hover:border-[#211f1f] rounded cursor-pointer text-xs text-[#524F49] transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#211f1f]" />
                    <span className="truncate">
                      {artworkFile ? 'Change Vector Artwork' : 'Drop AI, PDF, or PNG'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <p className="text-[10px] text-[#8C877D] flex items-center gap-1">
                <Info className="w-3 h-3 text-[#29abe1]" />
                <span>Our studio vectorizes and checks resolution free before production.</span>
              </p>
            </div>

            {/* 3. Size Selector (if applicable) */}
            {product.category === 'apparel' || product.category === 'uniforms' ? (
              <div className="pt-4 border-t border-[#F4F2EB]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider">
                    Select Size
                  </span>
                  <span className="text-[11px] text-[#706E68]">Standard Middle East Relaxed Fit</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`w-11 h-9 rounded text-xs font-mono font-bold transition-all ${
                        selectedSize === sz
                          ? 'bg-[#211f1f] text-white'
                          : 'bg-[#FAF9F6] text-[#211f1f] border border-[#E8E5DD] hover:border-[#211f1f]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* 4. Tiered Volume Pricing Table & Interactive Quantity */}
            <div className="pt-4 border-t border-[#F4F2EB] space-y-3">
              <span className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider block">
                Quantity & Bulk Volume Savings (AED)
              </span>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E8E5DD] rounded bg-[#FAF9F6]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(product.moq, quantity - 1))}
                    className="px-3 py-2 text-sm font-bold text-[#211f1f] hover:bg-[#E8E5DD]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={product.moq}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.moq, parseInt(e.target.value) || 1))}
                    className="w-16 text-center text-xs font-mono font-bold bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm font-bold text-[#211f1f] hover:bg-[#E8E5DD]"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs">
                  <span className="font-mono font-bold text-base text-[#211f1f]">
                    AED {unitPrice}
                  </span>{' '}
                  <span className="text-[#706E68]">/ piece</span>
                  {totalSavings > 0 && (
                    <span className="ml-2 text-[11px] font-bold text-[#25D366]">
                      (Saved AED {totalSavings.toFixed(0)})
                    </span>
                  )}
                </div>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                {product.tierPricing.map((tier) => {
                  const isActive =
                    quantity >= tier.minQty && (tier.maxQty === undefined || quantity <= tier.maxQty);
                  return (
                    <div
                      key={tier.range}
                      onClick={() => setQuantity(tier.minQty)}
                      className={`p-2 rounded border cursor-pointer transition-all ${
                        isActive
                          ? 'border-[#211f1f] bg-[#211f1f] text-white shadow-2xs'
                          : 'border-[#E8E5DD] bg-[#FAF9F6] text-[#211f1f] hover:border-[#211f1f]'
                      }`}
                    >
                      <div className="font-mono text-[10px] opacity-80">{tier.range}</div>
                      <div className="font-display font-bold text-sm">AED {tier.pricePerUnit}</div>
                      {tier.discountPercent > 0 && (
                        <div className={`text-[9px] font-bold ${isActive ? 'text-[#faec1c]' : 'text-[#25D366]'}`}>
                          -{tier.discountPercent}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Delivery Estimator (UAE Emirates) */}
            <div className="pt-4 border-t border-[#F4F2EB] bg-[#FAF9F6] p-3.5 rounded-lg border border-[#E8E5DD]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="flex items-center gap-1.5 font-bold text-[#211f1f]">
                  <Truck className="w-4 h-4 text-[#29abe1]" />
                  <span>Estimated UAE Delivery</span>
                </span>
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  {(['Dubai', 'Abu Dhabi', 'Sharjah'] as const).map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setDeliveryEmirate(em)}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        deliveryEmirate === em
                          ? 'bg-[#211f1f] text-white font-bold'
                          : 'text-[#706E68] hover:text-[#211f1f]'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#524F49]">
                {deliveryEmirate === 'Dubai' ? (
                  <span>
                    ⚡ <strong>Same-Day Dispatch:</strong> Orders approved by 11:00 AM arrive before 6:00 PM in Dubai.
                  </span>
                ) : (
                  <span>
                    🚚 <strong>Next-Day Delivery:</strong> Dispatched via temperature-controlled courier to {deliveryEmirate} within 24–48 hours.
                  </span>
                )}
              </p>
            </div>

            {/* 6. Pricing Summary & Sticky Action Bar */}
            <div className="pt-4 border-t border-[#E8E5DD] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#706E68]">Total Order Estimate:</span>
                  <div className="font-display font-black text-2xl text-[#211f1f] tabular-nums">
                    AED {totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#706E68]">
                  <span>Unit: AED {unitPrice.toFixed(2)} · Qty: {quantity}</span>
                  <div className="text-[#25D366] font-semibold">5% UAE VAT calculated at checkout</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="py-3 px-4 bg-[#211f1f] hover:bg-[#383636] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#faec1c]" />
                  <span>{addedToast ? 'Added to Bag!' : 'Add to Order Bag'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="py-3 px-4 bg-[#EBF7EE] hover:bg-[#DDF0E2] text-[#1E7E34] border border-[#25D366]/40 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                  <span>WhatsApp Quote</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#706E68] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#29abe1]" />
                <span>Zero charge until prepress proof is signed off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
