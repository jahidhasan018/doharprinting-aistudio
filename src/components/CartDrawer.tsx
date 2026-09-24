import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, MessageSquare, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigateToShop
}) => {
  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const vat = subtotal * 0.05; // 5% UAE VAT
  const freeShippingThreshold = 250;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const deliveryFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 20;
  const grandTotal = subtotal + vat + deliveryFee;

  const handleWhatsAppCheckout = () => {
    let orderSummary = `*DOHAR PRINT UAE - ORDER INQUIRY*\n`;
    items.forEach((item, index) => {
      orderSummary += `\n${index + 1}. *${item.product.title}*\n   - Qty: ${item.quantity} units\n   - Color: ${item.selectedColor.colorName}\n   - Size: ${item.selectedSize}\n   - Print Method: ${item.selectedMethod}\n   - Line Price: AED ${(item.unitPrice * item.quantity).toFixed(2)}`;
      if (item.customDesignText) {
        orderSummary += `\n   - Imprint Artwork: "${item.customDesignText}"`;
      }
    });
    orderSummary += `\n\n*Subtotal:* AED ${subtotal.toFixed(2)}`;
    orderSummary += `\n*VAT (5%):* AED ${vat.toFixed(2)}`;
    orderSummary += `\n*Courier Delivery:* ${isFreeShipping ? 'FREE' : 'AED 20.00'}`;
    orderSummary += `\n*Total Estimate:* AED ${grandTotal.toFixed(2)}`;
    orderSummary += `\n\nPlease confirm availability and share digital proof for review.`;

    const encoded = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/971504928812?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-12">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* 1. Header (Clean & Minimalist) */}
          <div className="px-5 py-4 border-b border-[#E8E5DD] flex items-center justify-between bg-white">
            <div className="flex items-baseline gap-2">
              <h2 className="font-display font-bold text-lg text-[#211f1f] tracking-tight">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#706E68] font-mono">
                ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-[#F4F2EB] text-[#706E68] hover:text-[#211f1f] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Shipping Indicator (Clean, Uncluttered) */}
          {items.length > 0 && (
            <div className="px-5 py-2.5 bg-[#FAF9F6] border-b border-[#E8E5DD]">
              {isFreeShipping ? (
                <div className="flex items-center gap-1.5 text-xs text-[#1E7E34] font-medium">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Free UAE Courier Delivery unlocked</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#524F49]">
                    <span>
                      Add <strong className="font-semibold text-[#211f1f]">AED {remainingForFreeShipping.toFixed(0)}</strong> for free delivery
                    </span>
                    <span className="font-mono text-[10px] text-[#8C877D]">
                      Goal: AED {freeShippingThreshold}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-[#E8E5DD] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#211f1f] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Items List */}
          <div className="flex-1 overflow-y-auto px-5 divide-y divide-[#F4F2EB]">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E8E5DD] flex items-center justify-center mx-auto text-[#8C877D]">
                  <MessageSquare className="w-5 h-5 opacity-40" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-[#211f1f]">Your bag is empty</h3>
                  <p className="text-xs text-[#706E68] mt-1 max-w-xs mx-auto">
                    Explore heavyweight tees, custom hoodies, drinkware, and VIP gift sets.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToShop();
                  }}
                  className="inline-flex items-center gap-1.5 py-2.5 px-5 bg-[#211f1f] text-white text-xs font-semibold rounded-md hover:bg-[#383636] transition-colors cursor-pointer"
                >
                  <span>Browse Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-3.5 items-start">
                  {/* Real Product Image Thumbnail */}
                  <div className="w-16 h-16 rounded-md bg-[#FAF9F6] border border-[#E8E5DD] overflow-hidden shrink-0 relative">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: item.selectedColor.colorHex }}
                      title={item.selectedColor.colorName}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-semibold text-sm text-[#211f1f] leading-snug line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#8C877D] hover:text-[#211f1f] p-0.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Metadata line */}
                    <div className="text-xs text-[#706E68] mt-1 flex flex-wrap items-center gap-1.5">
                      <span>{item.selectedColor.colorName}</span>
                      <span>·</span>
                      <span>Size {item.selectedSize}</span>
                      <span>·</span>
                      <span className="font-mono text-[11px] text-[#211f1f] font-medium">{item.selectedMethod}</span>
                    </div>

                    {item.customDesignText && (
                      <p className="text-[11px] text-[#524F49] mt-0.5 truncate">
                        Artwork: <span className="italic font-medium">"{item.customDesignText}"</span>
                      </p>
                    )}

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between mt-3 pt-1">
                      <div className="flex items-center border border-[#E8E5DD] rounded bg-[#FAF9F6]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-[#E8E5DD] text-[#211f1f] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs font-semibold text-[#211f1f] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#E8E5DD] text-[#211f1f] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-display font-bold text-sm text-[#211f1f] tabular-nums">
                          AED {(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                        <div className="text-[10px] text-[#8C877D] font-mono">
                          @ AED {item.unitPrice.toFixed(0)} ea
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Footer Summary & Action (Clean, Neat) */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8E5DD] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#706E68]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#211f1f] font-semibold tabular-nums">
                    AED {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>UAE VAT (5%)</span>
                  <span className="font-mono text-[#211f1f] tabular-nums">
                    AED {vat.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>UAE Delivery</span>
                  <span className="font-mono font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-[#1E7E34]">FREE</span>
                    ) : (
                      <span className="text-[#211f1f]">AED {deliveryFee.toFixed(2)}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F4F2EB] text-sm text-[#211f1f]">
                  <span className="font-bold">Total Estimate</span>
                  <span className="font-display font-black text-lg tabular-nums">
                    AED {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Complete Order via WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C877D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#29abe1]" />
                <span>Free 1:1 digital proof sent for approval before printing</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
