import React, { useState } from 'react';
import { PRINT_METHODS_INFO } from '../data/mockData';
import { MessageSquare, Sparkles, Check, ArrowRight, ShieldCheck, Layers } from 'lucide-react';

interface PrintingMethodsPageProps {
  onNavigate: (tab: string) => void;
}

export const PrintingMethodsPage: React.FC<PrintingMethodsPageProps> = ({ onNavigate }) => {
  const [selectedMethodId, setSelectedMethodId] = useState('dtf');

  const handleWhatsApp = (techName: string) => {
    const text = encodeURIComponent(
      `Hello DOHAR UAE Team! I am inquiring about your ${techName} capabilities for custom merchandise. Please share technical specs and minimum order guidelines.`
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#706E68] mb-2">
            <Layers className="w-4 h-4 text-[#211f1f]" />
            <span>PRINTING TECHNOLOGY & CALIBRATION</span>
            <span>/</span>
            <span className="text-[#211f1f] font-bold">UAE PRODUCTION GUIDE</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-[#211f1f] tracking-tight">
            Industrial Printing Methods & Substrate Guide
          </h1>
          <p className="text-xs sm:text-sm text-[#524F49] mt-3 leading-relaxed">
            Understanding the difference between Direct-to-Film (DTF), rotary UV curing, and multi-head computerized embroidery ensures your garments, drinkware, and gifts meet international standards.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {PRINT_METHODS_INFO.map((method) => {
            const isSelected = selectedMethodId === method.id;
            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`bg-white border rounded-xl p-6 sm:p-7 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#211f1f] ring-1 ring-[#211f1f] shadow-sm'
                    : 'border-[#E8E5DD] hover:border-[#211f1f]'
                }`}
              >
                {/* Method Accent Stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: method.cmykAccent }}
                />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#8C877D] tracking-wider uppercase">
                      TECHNIQUE: {method.shortCode}
                    </span>
                    <span className="text-[11px] font-mono bg-[#FAF9F6] border border-[#E8E5DD] px-2 py-0.5 rounded text-[#211f1f] font-semibold">
                      {method.minOrder}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-[#211f1f] uppercase tracking-tight">
                    {method.name}
                  </h3>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <strong className="text-[#211f1f] block mb-0.5 font-bold">Best For:</strong>
                      <span className="text-[#524F49] leading-relaxed">{method.bestFor}</span>
                    </div>

                    <div>
                      <strong className="text-[#211f1f] block mb-0.5 font-bold">Feel & Texture:</strong>
                      <span className="text-[#524F49] leading-relaxed">{method.feel}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F4F2EB]">
                      <div>
                        <strong className="text-[#211f1f] block text-[11px]">Durability:</strong>
                        <span className="text-[#706E68] text-[11px]">{method.durability}</span>
                      </div>
                      <div>
                        <strong className="text-[#211f1f] block text-[11px]">Dubai Turnaround:</strong>
                        <span className="text-[#706E68] text-[11px]">{method.turnaround}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F4F2EB] flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsApp(method.name);
                    }}
                    className="text-xs font-bold text-[#25D366] hover:underline flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                    <span>Inquire About {method.shortCode}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('studio');
                    }}
                    className="text-xs font-bold text-[#211f1f] hover:text-[#29abe1] flex items-center gap-1"
                  >
                    <span>Test in Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prepress Quality Checklist Banner */}
        <div className="bg-[#F4F2EB] border border-[#E8E5DD] rounded-xl p-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-[#8C877D] uppercase tracking-wider">
              UAE PREPRESS STANDARDS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-[#211f1f] tracking-tight mt-1">
              How DOHAR Ensures 100% Color Accuracy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-xs text-[#524F49]">
              <div>
                <strong className="text-[#211f1f] block text-sm mb-1 font-display uppercase">
                  Pantone Matching (PMS)
                </strong>
                <span>We cross-reference every digital hex or RGB value with standard Solid Coated Pantone swatch libraries.</span>
              </div>
              <div>
                <strong className="text-[#211f1f] block text-sm mb-1 font-display uppercase">
                  Vector RIP Processing
                </strong>
                <span>RIP software calculates ink density compensation, eliminating white halation around fine typography.</span>
              </div>
              <div>
                <strong className="text-[#211f1f] block text-sm mb-1 font-display uppercase">
                  Climate-Resistant Inks
                </strong>
                <span>Specialized OEKO-TEX certified inks that endure 45°C Middle East humidity and industrial hot washes.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
