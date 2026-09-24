import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Product, PrintMethod } from '../types';
import { ProductArtworkMockup } from '../components/ProductArtworkMockup';
import {
  Upload,
  Type,
  Layers,
  Sparkles,
  MessageSquare,
  ShoppingBag,
  Sliders,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface CustomizeStudioPageProps {
  initialProduct?: Product;
  onAddToCart: (item: any) => void;
  onNavigate: (tab: string) => void;
}

const PRESET_ARTWORKS = [
  { id: 'crest', name: 'UAE Falcon Crest', text: 'EMIRATES CREST' },
  { id: 'monogram', name: 'Minimal Monogram', text: 'DOHAR DXB' },
  { id: 'arabic', name: 'Dubai Studio', text: 'DUBAI ATELIER' },
  { id: 'event', name: 'Summit 2026', text: 'GLOBAL FORUM 26' }
];

export const CustomizeStudioPage: React.FC<CustomizeStudioPageProps> = ({
  initialProduct,
  onAddToCart,
  onNavigate
}) => {
  const currentProduct = initialProduct || PRODUCTS[0];

  // Studio Interactive State
  const [selectedProduct, setSelectedProduct] = useState<Product>(currentProduct);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.variants[0] || { colorName: 'Jet Black', colorHex: '#1F2022', inStock: true }
  );
  const [activeTab, setActiveTab] = useState<'text' | 'upload' | 'presets' | 'specs'>('text');
  const [imprintText, setImprintText] = useState('DOHAR DUBAI');
  const [imprintFont, setImprintFont] = useState<'condensed' | 'sans' | 'mono'>('condensed');
  const [imprintPosition, setImprintPosition] = useState<'front' | 'pocket' | 'back'>('front');
  const [printMethod, setPrintMethod] = useState<PrintMethod>('DTF');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [quantity, setQuantity] = useState(25);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState(false);
  const [studioMode, setStudioMode] = useState<'photo' | 'blueprint'>('photo');

  // Unit price calculation
  const unitPrice =
    selectedProduct.tierPricing.find(
      (t) => quantity >= t.minQty && (t.maxQty === undefined || quantity <= t.maxQty)
    )?.pricePerUnit || selectedProduct.basePrice;

  const totalPrice = unitPrice * quantity;

  const handleProductSwitch = (p: Product) => {
    setSelectedProduct(p);
    setSelectedColor(p.variants[0] || { colorName: 'Default', colorHex: '#1F2022', inStock: true });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setImprintText(file.name.replace(/\.[^/.]+$/, '').slice(0, 15));
    }
  };

  const handleAddFromStudio = () => {
    onAddToCart({
      product: selectedProduct,
      selectedColor,
      selectedSize: 'L',
      selectedMethod: printMethod,
      quantity,
      unitPrice,
      customDesignText: imprintText
    });
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2500);
  };

  const handleWhatsAppProof = () => {
    const text = encodeURIComponent(
      `Hello DOHAR UAE Studio! I just customized an item online:
Product: ${selectedProduct.title}
Color: ${selectedColor.colorName}
Imprint Text: "${imprintText}"
Placement: ${imprintPosition.toUpperCase()}
Print Method: ${printMethod}
Estimated Quantity: ${quantity} units
Total: AED ${totalPrice.toFixed(2)}
Please send a 1:1 high-resolution CMYK prepress proof.`
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-[calc(100vh-140px)] flex flex-col">
      {/* Studio Top Context Bar */}
      <div className="bg-white border-b border-[#E8E5DD] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-xl uppercase tracking-tight text-[#211f1f]">
              DOHAR 3D Mockup Studio
            </span>
            <span className="text-[10px] font-mono bg-[#faec1c] text-[#211f1f] px-2 py-0.5 rounded font-black tracking-wider uppercase">
              LIVE PREVIEW
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs py-1">
            <span className="text-[#706E68] font-mono text-[11px] shrink-0">Switch Item:</span>
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleProductSwitch(p)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors whitespace-nowrap border cursor-pointer ${
                  selectedProduct.id === p.id
                    ? 'bg-[#211f1f] text-white border-[#211f1f] font-semibold'
                    : 'bg-[#FAF9F6] text-[#524F49] border-[#E8E5DD] hover:border-[#211f1f]'
                }`}
              >
                <img src={p.image} alt={p.title} className="w-4 h-4 rounded-sm object-cover" />
                <span>{p.title.split(' ')[0]} {p.title.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Studio Viewport (Canvas Left, Controls Right) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Interactive Canvas Stage (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E8E5DD] rounded-xl p-5 shadow-2xs flex flex-col justify-between relative overflow-hidden">
          {/* Canvas Tools Overlay */}
          <div className="flex items-center justify-between z-10 text-xs font-mono">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-0.5 bg-[#FAF9F6] border border-[#E8E5DD] rounded-md">
              <button
                type="button"
                onClick={() => setStudioMode('photo')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                  studioMode === 'photo'
                    ? 'bg-[#211f1f] text-white shadow-2xs'
                    : 'text-[#706E68] hover:text-[#211f1f]'
                }`}
              >
                Photo Preview
              </button>
              <button
                type="button"
                onClick={() => setStudioMode('blueprint')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                  studioMode === 'blueprint'
                    ? 'bg-[#211f1f] text-white shadow-2xs'
                    : 'text-[#706E68] hover:text-[#211f1f]'
                }`}
              >
                Blueprint Proof
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#FAF9F6] border border-[#E8E5DD] rounded px-2.5 py-1 text-[#706E68]">
                <span className="w-2 h-2 rounded-full bg-[#29abe1]" />
                <span>ZONE: {imprintPosition.toUpperCase()}</span>
              </div>

              <div className="flex items-center gap-1 bg-[#FAF9F6] border border-[#E8E5DD] rounded p-0.5">
                <button
                  onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.1))}
                  className="p-1 hover:bg-[#E8E5DD] rounded text-[#211f1f]"
                  title="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 text-[10px] text-[#706E68]">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
                  className="p-1 hover:bg-[#E8E5DD] rounded text-[#211f1f]"
                  title="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Central Canvas Representation */}
          <div className="my-auto py-4 flex items-center justify-center relative">
            <div
              className="w-full max-w-md aspect-square transition-transform duration-200 relative rounded-xl overflow-hidden border border-[#E8E5DD] bg-[#FAF9F6]"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {studioMode === 'photo' ? (
                <div className="relative w-full h-full">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Live Imprint Superimposed on Real Photo */}
                  <div
                    className={`absolute transition-all duration-200 flex flex-col items-center justify-center p-3 pointer-events-none ${
                      imprintPosition === 'pocket'
                        ? 'top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 max-w-[120px]'
                        : imprintPosition === 'back'
                        ? 'top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[200px]'
                        : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[220px]'
                    }`}
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Uploaded artwork"
                        className="max-h-20 max-w-full object-contain drop-shadow-md"
                      />
                    ) : (
                      <div className="border border-dashed border-white/60 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded text-center">
                        <span
                          className={`text-white font-bold tracking-wider uppercase drop-shadow-md ${
                            imprintFont === 'mono'
                              ? 'font-mono text-sm'
                              : imprintFont === 'condensed'
                              ? 'font-display text-base'
                              : 'font-sans text-sm'
                          }`}
                        >
                          {imprintText || 'YOUR LOGO'}
                        </span>
                        <div className="text-[9px] text-[#faec1c] font-mono mt-0.5">
                          {printMethod} PRINT
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <ProductArtworkMockup
                  type={selectedProduct.illustrationType}
                  colorHex={selectedColor.colorHex}
                  customText={imprintText}
                  customLogoUrl={uploadedImage || undefined}
                  printTechnique={printMethod}
                  showRegistrationMarks={true}
                />
              )}
            </div>
          </div>

          {/* Canvas Footer with Color Swatches */}
          <div className="pt-3 border-t border-[#F4F2EB] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#706E68]">Garment Shade:</span>
              <div className="flex items-center gap-1.5">
                {selectedProduct.variants.map((v) => (
                  <button
                    key={v.colorName}
                    type="button"
                    onClick={() => setSelectedColor(v)}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      selectedColor.colorName === v.colorName
                        ? 'ring-2 ring-[#211f1f] ring-offset-1 scale-110'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: v.colorHex }}
                    title={v.colorName}
                  />
                ))}
              </div>
              <span className="font-semibold text-[#211f1f] text-[11px] ml-1">
                {selectedColor.colorName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#706E68]">Placement:</span>
              {(['front', 'pocket', 'back'] as const).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setImprintPosition(pos)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize transition-colors ${
                    imprintPosition === pos
                      ? 'bg-[#211f1f] text-white font-bold'
                      : 'bg-[#F4F2EB] text-[#524F49] hover:bg-[#E8E5DD]'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Studio Tools & Pricing Configuration (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8E5DD] rounded-xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Tool Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#F4F2EB] rounded-lg border border-[#E8E5DD] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`py-1.5 rounded transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'text' ? 'bg-white text-[#211f1f] shadow-2xs' : 'text-[#615E58]'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Text</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`py-1.5 rounded transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'upload' ? 'bg-white text-[#211f1f] shadow-2xs' : 'text-[#615E58]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`py-1.5 rounded transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'presets' ? 'bg-white text-[#211f1f] shadow-2xs' : 'text-[#615E58]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Presets</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`py-1.5 rounded transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'specs' ? 'bg-white text-[#211f1f] shadow-2xs' : 'text-[#615E58]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Specs</span>
              </button>
            </div>

            {/* Tab 1: Text Customizer */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider block mb-1.5">
                    Imprint Text Content
                  </label>
                  <input
                    type="text"
                    value={imprintText}
                    onChange={(e) => setImprintText(e.target.value)}
                    maxLength={20}
                    placeholder="Enter brand name or monogram"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E8E5DD] rounded-lg text-sm font-bold text-[#211f1f] outline-none focus:border-[#211f1f]"
                  />
                  <p className="text-[10px] text-[#706E68] mt-1 font-mono">Max 20 characters for clean 1:1 imprint</p>
                </div>

                <div>
                  <label className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider block mb-1.5">
                    Typographic Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'condensed', label: 'Barlow Condensed' },
                      { id: 'sans', label: 'Plus Jakarta' },
                      { id: 'mono', label: 'JetBrains Mono' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setImprintFont(f.id as any)}
                        className={`p-2 rounded border text-xs font-medium text-center transition-colors ${
                          imprintFont === f.id
                            ? 'border-[#211f1f] bg-[#211f1f] text-white'
                            : 'border-[#E8E5DD] bg-[#FAF9F6] text-[#211f1f] hover:border-[#211f1f]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Upload Dropzone */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <label className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider block">
                  Upload Vector or High-Res Artwork
                </label>
                <label className="border-2 border-dashed border-[#E8E5DD] hover:border-[#211f1f] bg-[#FAF9F6] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#211f1f] mb-2 shadow-2xs group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-[#29abe1]" />
                  </div>
                  <span className="text-xs font-bold text-[#211f1f]">
                    {uploadedImage ? 'Replace Custom Artwork' : 'Click to Upload Artwork'}
                  </span>
                  <p className="text-[11px] text-[#706E68] mt-1 max-w-xs">
                    Accepted: AI, EPS, SVG, PDF, PNG (Min 300 DPI with transparency)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {uploadedImage && (
                  <div className="flex items-center justify-between p-2 bg-[#EBF7EE] border border-[#25D366]/30 rounded text-xs text-[#1E7E34]">
                    <span>✓ Artwork preview active on garment</span>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="text-[11px] underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Presets */}
            {activeTab === 'presets' && (
              <div className="space-y-3">
                <label className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider block">
                  Curated UAE Graphic Concepts
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_ARTWORKS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setImprintText(preset.text);
                        setUploadedImage(null);
                      }}
                      className="p-3 bg-[#FAF9F6] border border-[#E8E5DD] hover:border-[#211f1f] rounded-lg text-left transition-colors"
                    >
                      <div className="font-display font-bold text-xs text-[#211f1f] uppercase">
                        {preset.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#706E68] mt-1">"{preset.text}"</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Specs & Technique */}
            {activeTab === 'specs' && (
              <div className="space-y-3">
                <label className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider block">
                  Printing Technology
                </label>
                <div className="space-y-1.5 text-xs">
                  {selectedProduct.supportedMethods.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPrintMethod(m)}
                      className={`w-full p-2.5 rounded border text-left flex items-center justify-between transition-colors ${
                        printMethod === m
                          ? 'border-[#211f1f] bg-[#211f1f] text-white font-bold'
                          : 'border-[#E8E5DD] bg-[#FAF9F6] text-[#211f1f] hover:border-[#211f1f]'
                      }`}
                    >
                      <span>{m} Printing</span>
                      {printMethod === m && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Savings preview */}
            <div className="pt-4 border-t border-[#F4F2EB] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#8C877D] uppercase tracking-wider">
                  Volume Quantity
                </span>
                <span className="font-mono text-[#25D366] font-bold">
                  {quantity >= 50 ? '31% Bulk Discount Applied' : 'Standard Tier'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E8E5DD] rounded bg-[#FAF9F6]">
                  <button
                    onClick={() => setQuantity(Math.max(selectedProduct.moq, quantity - 5))}
                    className="px-3 py-1.5 font-bold text-[#211f1f] hover:bg-[#E8E5DD]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={selectedProduct.moq}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(selectedProduct.moq, parseInt(e.target.value) || 1))}
                    className="w-16 text-center text-xs font-mono font-bold bg-transparent outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 5)}
                    className="px-3 py-1.5 font-bold text-[#211f1f] hover:bg-[#E8E5DD]"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs">
                  <span className="font-display font-bold text-base text-[#211f1f]">
                    AED {unitPrice}
                  </span>{' '}
                  <span className="text-[#706E68]">/ unit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Final Actions */}
          <div className="pt-4 border-t border-[#E8E5DD] space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#706E68]">Total Order Estimate:</span>
                <div className="font-display font-black text-2xl text-[#211f1f] tabular-nums">
                  AED {totalPrice.toFixed(2)}
                </div>
              </div>
              <div className="text-right text-[11px] text-[#706E68]">
                <span>{quantity} pcs · Fast UAE Delivery</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleAddFromStudio}
                className="py-3 px-4 bg-[#211f1f] hover:bg-[#383636] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#faec1c]" />
                <span>{successToast ? 'Added to Bag!' : 'Add to Order Bag'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppProof}
                className="py-3 px-4 bg-[#EBF7EE] hover:bg-[#DDF0E2] text-[#1E7E34] border border-[#25D366]/40 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                <span>Request UAE Proof</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#706E68]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#29abe1]" />
              <span>Full vector prepress proof provided free via WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
