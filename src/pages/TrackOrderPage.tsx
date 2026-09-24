import React, { useState } from 'react';
import { MOCK_ORDERS } from '../data/mockData';
import { OrderTrackResult } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MessageSquare,
  Package,
  PhoneCall,
  MapPin,
  ArrowRight
} from 'lucide-react';

interface TrackOrderPageProps {
  onNavigate: (tab: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ onNavigate }) => {
  const [orderQuery, setOrderQuery] = useState('DOH-8924');
  const [searchedOrder, setSearchedOrder] = useState<OrderTrackResult | null>(
    MOCK_ORDERS['DOH-8924'] || null
  );
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderQuery.trim().toUpperCase();
    const found = MOCK_ORDERS[cleanId] || null;
    setSearchedOrder(found);
    setHasSearched(true);
  };

  const handleWhatsAppLogistics = () => {
    const text = encodeURIComponent(
      `Hello DOHAR UAE Dispatch Team! I am tracking order: ${orderQuery}. Could you please update me on driver ETA in Dubai/UAE?`
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#706E68] mb-2">
            <Truck className="w-4 h-4 text-[#211f1f]" />
            <span>UAE COURIER & PRODUCTION DISPATCH</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-[#211f1f] tracking-tight">
            Track Your Print Order
          </h1>
          <p className="text-xs sm:text-sm text-[#524F49] mt-2">
            Enter your DOHAR order reference number to view real-time prepress, production, and UAE courier status.
          </p>
        </div>

        {/* Search Bar & Sample ID Pills */}
        <div className="bg-white border border-[#E8E5DD] rounded-xl p-5 sm:p-6 shadow-2xs mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#706E68] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. DOH-8924)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-[#E8E5DD] rounded-lg text-sm font-mono font-bold text-[#211f1f] outline-none focus:border-[#211f1f]"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#211f1f] hover:bg-[#383636] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>

          {/* Sample quick tags */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F4F2EB] text-xs text-[#706E68]">
            <span className="font-mono text-[10px] uppercase">Try sample orders:</span>
            <button
              type="button"
              onClick={() => {
                setOrderQuery('DOH-8924');
                setSearchedOrder(MOCK_ORDERS['DOH-8924']);
                setHasSearched(true);
              }}
              className="font-mono text-[11px] font-bold text-[#211f1f] hover:text-[#29abe1] underline"
            >
              DOH-8924 (Dubai Express)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                setOrderQuery('DOH-7102');
                setSearchedOrder(MOCK_ORDERS['DOH-7102']);
                setHasSearched(true);
              }}
              className="font-mono text-[11px] font-bold text-[#211f1f] hover:text-[#29abe1] underline"
            >
              DOH-7102 (Abu Dhabi Batch)
            </button>
          </div>
        </div>

        {/* Tracking Result View */}
        {hasSearched && (
          <div>
            {searchedOrder ? (
              <div className="bg-white border border-[#E8E5DD] rounded-xl p-6 sm:p-8 shadow-2xs space-y-6">
                {/* Order Summary Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F4F2EB]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-2xl text-[#211f1f] uppercase tracking-tight">
                        Order #{searchedOrder.orderNumber}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-[#EBF7EE] text-[#1E7E34] border border-[#25D366]/30 px-2 py-0.5 rounded">
                        {searchedOrder.currentStatus}
                      </span>
                    </div>
                    <p className="text-xs text-[#706E68] mt-1">
                      Client: <strong>{searchedOrder.customerName}</strong> · Destination:{' '}
                      <strong>{searchedOrder.deliveryCity}</strong>
                    </p>
                    <p className="text-xs text-[#211f1f] font-mono mt-1">
                      {searchedOrder.itemsSummary}
                    </p>
                  </div>

                  <div className="sm:text-right bg-[#FAF9F6] p-3 rounded-lg border border-[#E8E5DD] sm:bg-transparent sm:border-0 sm:p-0">
                    <span className="text-[11px] text-[#706E68] block">Estimated Delivery:</span>
                    <span className="font-display font-black text-lg text-[#211f1f]">
                      {searchedOrder.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Vertical Timeline */}
                <div className="space-y-6 py-2">
                  <h4 className="font-mono text-xs font-bold text-[#8C877D] uppercase tracking-wider">
                    Production & Dispatch Timeline
                  </h4>

                  <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E5DD]">
                    {searchedOrder.timeline.map((step, idx) => (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            step.completed
                              ? 'bg-[#211f1f] border-[#211f1f] text-white'
                              : step.current
                              ? 'bg-[#faec1c] border-[#211f1f] text-[#211f1f] animate-pulse'
                              : 'bg-white border-[#D0CCC2]'
                          }`}
                        >
                          {step.completed && <CheckCircle2 className="w-2.5 h-2.5" />}
                        </div>

                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5
                              className={`font-display font-bold text-base ${
                                step.current
                                  ? 'text-[#211f1f] underline decoration-[#faec1c] decoration-2'
                                  : step.completed
                                  ? 'text-[#211f1f]'
                                  : 'text-[#8C877D]'
                              }`}
                            >
                              {step.title}
                            </h5>
                            <span className="font-mono text-[10px] text-[#8C877D]">
                              {step.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-[#524F49] mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct WhatsApp Action for this order */}
                <div className="pt-6 border-t border-[#F4F2EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#706E68]">
                    Need to change delivery location or require gate pass coordinates?
                  </div>
                  <button
                    onClick={handleWhatsAppLogistics}
                    className="w-full sm:w-auto py-2.5 px-4 bg-[#25D366] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#20BA5A] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>WhatsApp Dispatch Support</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#E8E5DD] rounded-xl p-8 text-center space-y-3">
                <p className="font-display font-bold text-lg text-[#211f1f]">
                  No order record found for "{orderQuery}"
                </p>
                <p className="text-xs text-[#706E68] max-w-sm mx-auto">
                  Please verify your reference code on your WhatsApp confirmation receipt or invoice.
                </p>
                <button
                  onClick={handleWhatsAppLogistics}
                  className="py-2 px-4 bg-[#211f1f] text-white text-xs font-bold rounded"
                >
                  Ask Dispatch Team on WhatsApp
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
