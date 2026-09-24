import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenStudio: () => void;
  onOpenWhatsApp: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenStudio,
  onOpenWhatsApp
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E5DD] px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={onOpenWhatsApp}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#EBF7EE] text-[#1E7E34] border border-[#25D366]/40 rounded-lg text-xs font-bold transition-transform active:scale-[0.98]"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
          <span>WhatsApp Us</span>
        </button>

        <button
          onClick={onOpenStudio}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#211f1f] text-white rounded-lg text-xs font-bold transition-transform active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#faec1c]" />
          <span>Start Designing</span>
        </button>
      </div>
    </div>
  );
};
