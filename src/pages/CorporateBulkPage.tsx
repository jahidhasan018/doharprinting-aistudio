import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  FileText,
  MessageSquare,
  Truck,
  ShieldCheck,
  Send,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface CorporateBulkPageProps {
  onNavigate: (tab: string) => void;
}

export const CorporateBulkPage: React.FC<CorporateBulkPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    emirate: 'Dubai',
    productCategory: 'T-Shirts (240 GSM Combed)',
    quantity: 100,
    deliveryDate: '2026-10-15',
    printMethod: 'Direct-to-Film (DTF)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Compute estimated quote
  const baseRate = formData.productCategory.includes('T-Shirt')
    ? 26
    : formData.productCategory.includes('Hoodie')
    ? 58
    : formData.productCategory.includes('Gift')
    ? 118
    : 32;

  const estimatedTotal = baseRate * formData.quantity;
  const estimatedSavings = baseRate * 0.35 * formData.quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppInstant = () => {
    const text = encodeURIComponent(
      `*DOHAR CORPORATE B2B QUOTE REQUEST*\n` +
      `Company: ${formData.companyName || 'Not specified'}\n` +
      `Contact: ${formData.contactName || 'Not specified'}\n` +
      `Phone: ${formData.phone || 'Not specified'}\n` +
      `Emirate: ${formData.emirate}\n` +
      `Item Category: ${formData.productCategory}\n` +
      `Estimated Qty: ${formData.quantity} units\n` +
      `Method: ${formData.printMethod}\n` +
      `Target Delivery Date: ${formData.deliveryDate}\n` +
      `Estimated Value: AED ${estimatedTotal.toLocaleString()}`
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#706E68] mb-2">
            <Building2 className="w-4 h-4 text-[#211f1f]" />
            <span>ENTERPRISE & B2B DIVISION</span>
            <span>/</span>
            <span className="text-[#211f1f] font-bold">UAE CORPORATE MERCHANDISE</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-[#211f1f] tracking-tight">
            Corporate Gifting, Bulk Apparel & Event Merchandise
          </h1>
          <p className="text-xs sm:text-sm text-[#524F49] mt-3 leading-relaxed">
            Direct production house pricing with volume discounts up to 52%. We support marketing agencies, F&B groups, tech startups, and government entities across Dubai, Abu Dhabi, and Sharjah with dedicated account management and Net-30 invoicing.
          </p>
        </div>

        {/* Main Grid: Form on Left (7 cols), Live Quote Estimate on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quote Form */}
          <div className="lg:col-span-7 bg-white border border-[#E8E5DD] rounded-xl p-6 sm:p-8 shadow-2xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EBF7EE] text-[#25D366] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl text-[#211f1f] uppercase tracking-tight">
                  Quote Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#524F49] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.contactName || 'Valued Client'}</strong>. Our B2B corporate team at DOHAR Textiles has received your specifications. We will send a formal proforma quotation and digital mockups within 2 hours.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={handleWhatsAppInstant}
                    className="py-2.5 px-5 bg-[#25D366] text-white text-xs font-bold rounded flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Expedite via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-4 bg-[#F4F2EB] text-[#211f1f] text-xs font-semibold rounded"
                  >
                    Edit Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display font-bold text-xl text-[#211f1f] uppercase tracking-tight pb-3 border-b border-[#F4F2EB]">
                  Request an Official Corporate Quote
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emirates Tech LLC"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none focus:border-[#211f1f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Al-Mansoor"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none focus:border-[#211f1f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.ae"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none focus:border-[#211f1f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">
                      UAE Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none focus:border-[#211f1f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">
                      Delivery Emirate
                    </label>
                    <select
                      value={formData.emirate}
                      onChange={(e) => setFormData({ ...formData, emirate: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none"
                    >
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">
                      Product Category
                    </label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none"
                    >
                      <option value="T-Shirts (240 GSM Combed)">T-Shirts (240 GSM)</option>
                      <option value="Hoodies & Sweatshirts">Hoodies & Fleece (380 GSM)</option>
                      <option value="Drinkware & Bottles">Stainless Drinkware</option>
                      <option value="Corporate Gift Sets">Curated VIP Gift Sets</option>
                      <option value="Staff Uniforms & Vests">Staff Uniforms & Vests</option>
                      <option value="Canvas Tote Bags">Canvas Tote Bags</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">
                      Estimated Units
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none"
                    >
                      <option value="25">25 pcs</option>
                      <option value="50">50 pcs</option>
                      <option value="100">100 pcs</option>
                      <option value="250">250 pcs</option>
                      <option value="500">500 pcs</option>
                      <option value="1000">1,000+ pcs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#211f1f] block mb-1">
                    Special Packaging, Branding, or Deadline Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Include Pantone codes, individual box packaging, or specific event deadline in Dubai/UAE..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none focus:border-[#211f1f]"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#211f1f] hover:bg-[#383636] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#faec1c]" />
                    <span>Submit Proforma Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppInstant}
                    className="py-3 px-5 bg-[#EBF7EE] text-[#1E7E34] border border-[#25D366]/40 hover:bg-[#DDF0E2] rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Live Estimate Card & B2B Trust Points (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Instant Quotation Preview */}
            <div className="bg-white border border-[#E8E5DD] rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F4F2EB] text-xs">
                <span className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider">
                  Live Estimate Preview
                </span>
                <span className="font-mono text-[10px] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E8E5DD] text-[#211f1f]">
                  EX-FACTORY UAE
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#706E68]">Item Category:</span>
                  <span className="font-bold text-[#211f1f]">{formData.productCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#706E68]">Volume Tier:</span>
                  <span className="font-mono font-semibold text-[#211f1f]">{formData.quantity} Units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#706E68]">Unit Base Rate:</span>
                  <span className="font-mono font-semibold text-[#211f1f]">AED {baseRate} / unit</span>
                </div>
                <div className="flex justify-between text-[#25D366] font-semibold">
                  <span>Volume Savings (Est.):</span>
                  <span className="font-mono">-AED {estimatedSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#F4F2EB] text-base text-[#211f1f]">
                  <span className="font-bold">Estimated Order Value:</span>
                  <span className="font-display font-black text-2xl tabular-nums">
                    AED {estimatedTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-[#8C877D] pt-1">
                  *Excludes 5% UAE VAT. Exact quote confirmed upon vector artwork inspection.
                </p>
              </div>
            </div>

            {/* B2B Trust Credentials */}
            <div className="bg-[#FAF9F6] border border-[#E8E5DD] rounded-xl p-6 space-y-4">
              <h4 className="font-display font-bold text-base text-[#211f1f] uppercase tracking-tight">
                The DOHAR Enterprise Advantage
              </h4>
              <div className="space-y-3 text-xs text-[#524F49]">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#29abe1] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#211f1f] block">Staggered Delivery Across Branches</strong>
                    <span>Ship portions to Dubai Marina, DIFC, and Abu Dhabi locations simultaneously.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#211f1f] block">Prepress Vector Clean-Up Included</strong>
                    <span>We vectorize low-res logos, align Pantone colors, and generate 3D proofs free.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#faec1c] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#211f1f] block">Official TRN Invoicing & Net-30</strong>
                    <span>Registered in Dubai with UAE Federal Tax Authority. Corporate accounts supported.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
