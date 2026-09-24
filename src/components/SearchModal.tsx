import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { ProductArtworkMockup } from './ProductArtworkMockup';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const QUICK_TAGS = [
  '240 GSM Oversized Tee',
  'French Terry Hoodie',
  'Canvas Tote Bag',
  'Matte Stainless Bottle',
  'High-Vis Safety Vest',
  'VIP Gift Box',
  'Washed Dad Cap'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.supportedMethods.some((m) => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#211f1f]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E8E5DD] overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E8E5DD] gap-3 bg-[#FAF9F6]">
          <Search className="w-5 h-5 text-[#211f1f] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search custom tees, hoodies, drinkware, materials..."
            className="flex-1 bg-transparent text-sm text-[#211f1f] placeholder-[#8C877D] outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#8C877D] hover:text-[#211f1f]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded text-[#706E68] hover:text-[#211f1f] hover:bg-[#E8E5DD]"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-[#F4F2EB] border-b border-[#E8E5DD] flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[#706E68] font-mono text-[10px] uppercase shrink-0">Popular:</span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 bg-white hover:bg-[#211f1f] hover:text-white text-[#211f1f] rounded text-[11px] font-medium border border-[#E8E5DD] transition-colors whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Result List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1.5 divide-y divide-[#F4F2EB]">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#706E68]">
              No customizable merchandise found matching "{query}". Try "tee", "hoodie", or "bottle".
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#FAF9F6] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-[#FAF9F6] overflow-hidden shrink-0 border border-[#E8E5DD]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#211f1f] group-hover:text-[#29abe1] transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-[#706E68] flex items-center gap-1.5">
                      <span>{p.categoryLabel}</span>
                      <span>·</span>
                      <span className="font-mono text-[#211f1f] font-semibold">
                        From AED {p.basePrice}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-[#F4F2EB] px-2 py-1 rounded text-[#211f1f] border border-[#E8E5DD]">
                    {p.supportedMethods.join('/')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8C877D] group-hover:text-[#211f1f] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#FAF9F6] border-t border-[#E8E5DD] flex items-center justify-between text-[11px] text-[#706E68]">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#faec1c]" />
            <span>All items customizable with no minimum order</span>
          </span>
          <span className="font-mono text-[10px]">ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
