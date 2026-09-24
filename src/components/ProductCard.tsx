import React, { useState } from 'react';
import { Product } from '../types';
import { MessageSquare, Sparkles, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCustomize,
  onSelect
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello DOHAR UAE Team! I am interested in: ${product.title} (Starting from AED ${product.basePrice}). Could I please get a quotation and proof assistance?`
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-white border border-[#E8E5DD] hover:border-[#211f1f] rounded-lg overflow-hidden transition-all duration-200 cursor-pointer hover:shadow-sm"
    >
      {/* Real Product Image Stage */}
      <div className="relative aspect-square w-full bg-[#FAF9F6] border-b border-[#E8E5DD] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                product.badge === 'Best Seller'
                  ? 'bg-[#211f1f] text-white'
                  : product.badge === 'Eco Friendly'
                  ? 'bg-[#EBF3EC] text-[#27533B] border border-[#CDE1D1]'
                  : product.badge === 'No MOQ'
                  ? 'bg-[#faec1c] text-[#211f1f] font-black'
                  : 'bg-white text-[#211f1f] border border-[#E8E5DD]'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick View Corner Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-7 h-7 rounded-full bg-white/95 border border-[#E8E5DD] flex items-center justify-center text-[#211f1f] shadow-xs">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#706E68] mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wide">{product.categoryLabel}</span>
            <span className="font-mono text-[11px] tabular-nums font-medium text-[#211f1f]">
              ★ {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base text-[#211f1f] leading-snug line-clamp-1 group-hover:text-[#29abe1] transition-colors">
            {product.title}
          </h3>

          {/* Specs */}
          <p className="text-xs text-[#706E68] mt-1 line-clamp-1">
            {product.specs}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-xs text-[#706E68]">From</span>
            <span className="font-display font-black text-xl text-[#211f1f] tracking-tight tabular-nums">
              AED {product.basePrice}
            </span>
            <span className="text-[11px] font-mono text-[#8C877D]">
              / unit (bulk savings)
            </span>
          </div>

          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#F4F2EB]">
            {product.variants.map((v, idx) => (
              <button
                key={v.colorName}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariantIndex(idx);
                }}
                title={v.colorName}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedVariantIndex === idx
                    ? 'ring-2 ring-[#211f1f] ring-offset-1 scale-110'
                    : 'border-black/15 hover:scale-105'
                }`}
                style={{ backgroundColor: v.colorHex }}
                aria-label={`Select ${v.colorName}`}
              />
            ))}
            <span className="text-[11px] text-[#706E68] ml-1">
              {activeVariant?.colorName}
            </span>
          </div>
        </div>

        {/* Dual Actions: Customize & WhatsApp */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#F4F2EB]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCustomize(product);
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#211f1f] hover:bg-[#383636] text-white rounded text-xs font-semibold tracking-wide transition-colors whitespace-nowrap active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#faec1c]" />
            <span>Customize</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#FAF9F6] hover:bg-[#F4F2EB] text-[#211f1f] border border-[#E8E5DD] rounded text-xs font-semibold tracking-wide transition-colors whitespace-nowrap active:scale-[0.98]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
