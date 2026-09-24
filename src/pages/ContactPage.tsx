import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Showroom Visit & Fabric Inspection',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello DOHAR UAE Team! I would like to visit your Al Quoz showroom / inspect merchandise print samples.`
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#706E68] mb-2">
            <Building2 className="w-4 h-4 text-[#211f1f]" />
            <span>UAE LOCATIONS & SHOWROOM</span>
            <span>/</span>
            <span className="text-[#211f1f] font-bold">DUBAI & AJMAN</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-[#211f1f] tracking-tight">
            Connect with Our Print Specialists
          </h1>
          <p className="text-xs sm:text-sm text-[#524F49] mt-3 leading-relaxed">
            Visit our Dubai showroom to feel 240 GSM organic combed cotton, examine high-density 3D puff embroidery, and test insulated drinkware. Or initiate an immediate consultation via WhatsApp.
          </p>
        </div>

        {/* 4 Direct Contact Cards Upfront */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div
            onClick={handleWhatsApp}
            className="p-5 bg-white border border-[#E8E5DD] hover:border-[#25D366] rounded-xl cursor-pointer transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#EBF7EE] text-[#25D366] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5 fill-[#25D366]" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#211f1f] uppercase tracking-tight">
              WhatsApp Coordinator
            </h3>
            <p className="text-xs text-[#706E68] mt-1">Instant prepress file reviews & quotes.</p>
            <div className="mt-3 font-mono text-xs font-bold text-[#1E7E34]">+971 50 492 8812</div>
          </div>

          <a
            href="tel:+97143809221"
            className="p-5 bg-white border border-[#E8E5DD] hover:border-[#211f1f] rounded-xl cursor-pointer transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#F4F2EB] text-[#211f1f] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#211f1f] uppercase tracking-tight">
              Dubai Landline
            </h3>
            <p className="text-xs text-[#706E68] mt-1">Direct to production and plant floor.</p>
            <div className="mt-3 font-mono text-xs font-bold text-[#211f1f]">+971 4 380 9221</div>
          </a>

          <a
            href="mailto:orders@doharprint.ae"
            className="p-5 bg-white border border-[#E8E5DD] hover:border-[#211f1f] rounded-xl cursor-pointer transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#F4F2EB] text-[#211f1f] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#211f1f] uppercase tracking-tight">
              Prepress Department
            </h3>
            <p className="text-xs text-[#706E68] mt-1">Submit vector files and tax RFPs.</p>
            <div className="mt-3 font-mono text-xs font-bold text-[#211f1f]">orders@doharprint.ae</div>
          </a>

          <div className="p-5 bg-white border border-[#E8E5DD] rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#F4F2EB] text-[#211f1f] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#211f1f] uppercase tracking-tight">
              Working Hours
            </h3>
            <p className="text-xs text-[#706E68] mt-1">Mon – Sat: 8:30 AM – 7:00 PM</p>
            <div className="mt-3 font-mono text-xs text-[#8C877D]">Sunday: Production on request</div>
          </div>
        </div>

        {/* Grid: Form on Left, Location Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Appointment / Message Form */}
          <div className="lg:col-span-7 bg-white border border-[#E8E5DD] rounded-xl p-6 sm:p-8 shadow-2xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EBF7EE] text-[#25D366] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl text-[#211f1f] uppercase">
                  Appointment Requested!
                </h3>
                <p className="text-xs sm:text-sm text-[#524F49] max-w-sm mx-auto">
                  Our team will reach out on WhatsApp to confirm your showroom visit time and prepare relevant fabric swatches.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="py-2 px-5 bg-[#211f1f] text-white text-xs font-bold rounded"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display font-bold text-xl text-[#211f1f] uppercase tracking-tight pb-2 border-b border-[#F4F2EB]">
                  Book a Showroom Visit or Sample Request
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zaid Al-Hashimi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none focus:border-[#211f1f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">UAE Phone / WhatsApp *</label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">Work Email *</label>
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
                    <label className="text-xs font-bold text-[#211f1f] block mb-1">Purpose</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none"
                    >
                      <option value="Showroom Visit & Fabric Inspection">Showroom Visit & Fabric Inspection</option>
                      <option value="Physical Swatch Sample Box Request">Physical Swatch Sample Box Request</option>
                      <option value="VIP Corporate Hamper Consultation">VIP Corporate Hamper Consultation</option>
                      <option value="Urgent Dubai Same-Day Job">Urgent Dubai Same-Day Job</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#211f1f] block mb-1">Specific Requirements / Quantities</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your brand, anticipated quantities, garment preferences (e.g. 240 GSM oversized tees, stainless bottles)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5DD] rounded text-[#211f1f] outline-none focus:border-[#211f1f]"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#211f1f] hover:bg-[#383636] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#faec1c]" />
                    <span>Send Appointment Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="py-3 px-5 bg-[#EBF7EE] text-[#1E7E34] border border-[#25D366]/40 hover:bg-[#DDF0E2] rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                    <span>Connect on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Locations & Facilities Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8E5DD] rounded-xl p-6 shadow-2xs space-y-5">
              <h4 className="font-display font-bold text-lg text-[#211f1f] uppercase tracking-tight">
                Our UAE Production Facilities
              </h4>

              {/* Location 1: Dubai Showroom */}
              <div className="p-4 bg-[#FAF9F6] border border-[#E8E5DD] rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#faec1c] fill-[#211f1f]" />
                  <strong className="text-xs font-bold text-[#211f1f] uppercase font-display">
                    Dubai Client Showroom & Prepress Lab
                  </strong>
                </div>
                <p className="text-xs text-[#524F49] leading-relaxed">
                  Warehouse 14, Street 18B, Al Quoz Industrial Area 3, Dubai, UAE.
                  <br />
                  <span className="text-[11px] text-[#706E68] font-mono">
                    Near Alserkal Avenue · Client parking available
                  </span>
                </p>
              </div>

              {/* Location 2: Ajman Textile Plant */}
              <div className="p-4 bg-[#FAF9F6] border border-[#E8E5DD] rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#29abe1] fill-[#29abe1]" />
                  <strong className="text-xs font-bold text-[#211f1f] uppercase font-display">
                    Ajman Textile Printing & Mill Facility
                  </strong>
                </div>
                <p className="text-xs text-[#524F49] leading-relaxed">
                  Industrial Area 2, Behind China Mall, Ajman, UAE.
                  <br />
                  <span className="text-[11px] text-[#706E68] font-mono">
                    Automated rotary UV printing & bulk embroidery lines
                  </span>
                </p>
              </div>

              {/* Legal & Tax Information */}
              <div className="pt-2 border-t border-[#F4F2EB] text-[11px] font-mono text-[#8C877D] space-y-1">
                <div>LEGAL ENTITY: DOHAR TEXTILES PRINTING L.L.C</div>
                <div>TRADE LICENSE: DUBAI DED #984210</div>
                <div>FEDERAL TAX AUTHORITY (TRN): 100482910300003</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
