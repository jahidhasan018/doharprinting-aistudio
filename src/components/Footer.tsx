import React from 'react';
import { BrandLogo } from './BrandLogo';
import { MapPin, Phone, Mail, MessageSquare, ArrowUpRight, ShieldCheck, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, categoryFilter?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#211f1f] text-[#E8E5DD] pt-14 pb-8 border-t border-[#333030]">
      {/* Top Banner inside Footer: Quality & Speed Promise */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 border-b border-[#333030]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-[#2D2B2B] flex items-center justify-center shrink-0 border border-[#403D3D]">
              <Clock className="w-5 h-5 text-[#faec1c]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-white uppercase tracking-tight">
                Express Dubai Dispatch
              </h4>
              <p className="text-xs text-[#A8A49C] mt-0.5 leading-relaxed">
                Same-day delivery across Dubai for approved morning orders. 24–48h across all 7 Emirates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-[#2D2B2B] flex items-center justify-center shrink-0 border border-[#403D3D]">
              <ShieldCheck className="w-5 h-5 text-[#29abe1]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-white uppercase tracking-tight">
                No Minimum Orders
              </h4>
              <p className="text-xs text-[#A8A49C] mt-0.5 leading-relaxed">
                Start with a single bespoke sample or scale up to 10,000+ units with tiered volume savings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-[#2D2B2B] flex items-center justify-center shrink-0 border border-[#403D3D]">
              <MessageSquare className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-white uppercase tracking-tight">
                WhatsApp Proof Approval
              </h4>
              <p className="text-xs text-[#A8A49C] mt-0.5 leading-relaxed">
                Receive high-res 1:1 CMYK visual proofs and digital mockups directly in your WhatsApp chat.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-[#2D2B2B] flex items-center justify-center shrink-0 border border-[#403D3D]">
              <span className="font-mono text-xs font-black text-[#e80f8a] border border-[#e80f8a] px-1 py-0.5 rounded">
                CMYK
              </span>
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-white uppercase tracking-tight">
                Industrial Calibration
              </h4>
              <p className="text-xs text-[#A8A49C] mt-0.5 leading-relaxed">
                Japanese DTF printers, rotary UV stations, and Tajima multi-head embroidery machinery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Locations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Info & Story */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="full" theme="dark" size="lg" />
            <p className="text-xs text-[#B2AEA5] leading-relaxed max-w-sm">
              DOHAR TEXTILES PRINTING L.L.C is a premier UAE on-demand merchandise & commercial apparel printing house. We power startups, restaurant groups, schools, corporate gifting agencies, and creators across the Emirates.
            </p>

            {/* CMYK Accent Strip */}
            <div className="flex items-center gap-1.5 pt-2">
              <span className="w-5 h-1.5 bg-[#29abe1] rounded-xs" title="Cyan #29abe1" />
              <span className="w-5 h-1.5 bg-[#faec1c] rounded-xs" title="Yellow #faec1c" />
              <span className="w-5 h-1.5 bg-[#e80f8a] rounded-xs" title="Magenta #e80f8a" />
              <span className="w-5 h-1.5 bg-[#FFFFFF] rounded-xs opacity-80" title="Key Ink #211f1f" />
              <span className="text-[10px] font-mono text-[#8C877D] ml-2">CMYK COLOR REGISTRATION PASS</span>
            </div>

            <div className="pt-2 text-xs text-[#9E9A90] space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#faec1c] shrink-0" />
                <span>Showroom: Al Quoz Industrial 3, Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#29abe1] shrink-0" />
                <span>Textile Mill: Ajman Industrial Area 2, UAE</span>
              </div>
            </div>
          </div>

          {/* Col 1: Create & Customize */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-3">
              Create & Shop
            </h4>
            <ul className="space-y-2 text-xs text-[#B2AEA5]">
              <li>
                <button onClick={() => onNavigate('shop', 'apparel')} className="hover:text-white transition-colors">
                  T-Shirts & Tops (240 GSM)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'hoodies')} className="hover:text-white transition-colors">
                  Heavy French Terry Hoodies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'uniforms')} className="hover:text-white transition-colors">
                  Workwear & Reflective Vests
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'drinkware')} className="hover:text-white transition-colors">
                  Insulated Bottles & Mugs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'headwear')} className="hover:text-white transition-colors">
                  Caps & Bucket Hats
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'bags')} className="hover:text-white transition-colors">
                  Organic Canvas Totes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Printing Techniques */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-3">
              Print Services
            </h4>
            <ul className="space-y-2 text-xs text-[#B2AEA5]">
              <li>
                <button onClick={() => onNavigate('methods')} className="hover:text-white transition-colors">
                  Direct-to-Film (DTF)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('methods')} className="hover:text-white transition-colors">
                  Rotary & Flatbed UV
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('methods')} className="hover:text-white transition-colors">
                  Precision 3D Embroidery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('methods')} className="hover:text-white transition-colors">
                  Screen Printing Bulk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('methods')} className="hover:text-white transition-colors">
                  Blind Deboss & Foil
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('methods')} className="hover:text-white transition-colors">
                  Sublimation All-Over
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Corporate & Gifting */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-3">
              Corporate & UAE
            </h4>
            <ul className="space-y-2 text-xs text-[#B2AEA5]">
              <li>
                <button onClick={() => onNavigate('corporate')} className="hover:text-white transition-colors">
                  B2B Bulk Price Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('corporate')} className="hover:text-white transition-colors">
                  VIP Welcome Gift Sets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('corporate')} className="hover:text-white transition-colors">
                  Ramadan Corporate Hampers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('corporate')} className="hover:text-white transition-colors">
                  UAE National Day Merchandise
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('corporate')} className="hover:text-white transition-colors">
                  Event & Exhibition Swag
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('corporate')} className="hover:text-white transition-colors">
                  Request Physical Fabric Swatches
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Order Info */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B2AEA5]">
              <li>
                <a
                  href="https://wa.me/971504928812"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#25D366] hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: +971 50 492 8812</span>
                </a>
              </li>
              <li>
                <a href="tel:+97143809221" className="flex items-center gap-1.5 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-[#faec1c]" />
                  <span>Landline: +971 4 380 9221</span>
                </a>
              </li>
              <li>
                <a href="mailto:orders@doharprint.ae" className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="w-3.5 h-3.5 text-[#29abe1]" />
                  <span>orders@doharprint.ae</span>
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('track')}
                  className="w-full py-1.5 px-2 bg-[#2E2C2C] hover:bg-[#3D3A3A] text-white rounded text-center text-xs font-medium border border-[#444] transition-colors"
                >
                  Live Order Tracker (UAE)
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-[#333030] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8C877D]">
        <div className="flex items-center gap-3">
          <span>© 2026 DOHAR TEXTILES PRINTING L.L.C. All rights reserved. Registered in Dubai, UAE.</span>
        </div>

        {/* Accepted Payments & Trust Marks */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[#A09D95]">ACCEPTED PAYMENT METHODS:</span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-[#2E2C2C] rounded text-white font-mono text-[10px] border border-[#444]">
              VISA
            </span>
            <span className="px-2 py-0.5 bg-[#2E2C2C] rounded text-white font-mono text-[10px] border border-[#444]">
              MC
            </span>
            <span className="px-2 py-0.5 bg-[#2E2C2C] rounded text-white font-mono text-[10px] border border-[#444]">
              APPLE PAY
            </span>
            <span className="px-2 py-0.5 bg-[#2E2C2C] rounded text-white font-mono text-[10px] border border-[#444]">
              TABBY
            </span>
            <span className="px-2 py-0.5 bg-[#2E2C2C] rounded text-[#faec1c] font-mono text-[10px] border border-[#444]">
              COD / BANK TRANSFER
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
