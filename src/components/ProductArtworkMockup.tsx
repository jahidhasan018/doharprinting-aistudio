import React from 'react';

interface ProductArtworkMockupProps {
  type: 'tshirt' | 'hoodie' | 'bottle' | 'tote' | 'cap' | 'mug' | 'notebook' | 'giftbox' | 'vest';
  colorHex?: string;
  className?: string;
  customText?: string;
  customLogoUrl?: string;
  showRegistrationMarks?: boolean;
  printTechnique?: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export const ProductArtworkMockup: React.FC<ProductArtworkMockupProps> = ({
  type,
  colorHex = '#211f1f',
  className = '',
  customText = 'YOUR DESIGN HERE',
  customLogoUrl,
  showRegistrationMarks = true,
  printTechnique = 'DTF'
}) => {
  // Determine if color is dark or light for imprint contrast
  const isDarkColor = (hex: string) => {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16) || 0;
    const g = parseInt(c.substring(2, 4), 16) || 0;
    const b = parseInt(c.substring(4, 6), 16) || 0;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 140;
  };

  const dark = isDarkColor(colorHex);
  const printColor = dark ? '#FFFFFF' : '#211f1f';
  const printSubtle = dark ? 'rgba(255,255,255,0.7)' : 'rgba(33,31,31,0.6)';

  return (
    <div className={`relative w-full h-full flex items-center justify-center p-4 bg-[#F4F2EB]/50 overflow-hidden select-none ${className}`}>
      {/* Subtle print crop marks at 4 corners */}
      {showRegistrationMarks && (
        <>
          {/* Top Left */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#211f1f]/25" />
          {/* Top Right */}
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#211f1f]/25" />
          {/* Bottom Left */}
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#211f1f]/25" />
          {/* Bottom Right */}
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#211f1f]/25" />

          {/* Tiny CMYK Calibration Strip at top edge */}
          <div className="absolute top-2 right-6 flex items-center gap-1 opacity-70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#29abe1]" title="Cyan" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#faec1c]" title="Yellow" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#e80f8a]" title="Magenta" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#211f1f]" title="Ink Key" />
          </div>
        </>
      )}

      {/* RENDER MOCKUP BY TYPE */}
      {type === 'tshirt' && (
        <svg viewBox="0 0 320 320" className="w-full h-full max-h-[300px] drop-shadow-sm">
          <defs>
            <linearGradient id="tshirt-shade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
            </linearGradient>
            <filter id="shadow-soft" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Garment Silhouette */}
          <g filter="url(#shadow-soft)">
            {/* Sleeves and Torso */}
            <path
              d="M 108 46 
                 C 130 58 190 58 212 46 
                 L 272 82 
                 L 242 128 
                 L 220 114 
                 L 220 286 
                 L 100 286 
                 L 100 114 
                 L 78 128 
                 L 48 82 Z"
              fill={colorHex}
            />
            {/* Shading overlay */}
            <path
              d="M 108 46 
                 C 130 58 190 58 212 46 
                 L 272 82 
                 L 242 128 
                 L 220 114 
                 L 220 286 
                 L 100 286 
                 L 100 114 
                 L 78 128 
                 L 48 82 Z"
              fill="url(#tshirt-shade)"
            />

            {/* Collar Ribbing */}
            <path
              d="M 116 48 C 136 68 184 68 204 48 C 196 74 124 74 116 48 Z"
              fill={colorHex}
              stroke={dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}
              strokeWidth="1.5"
            />

            {/* Subtle Stitching Lines */}
            <path
              d="M 100 280 L 220 280"
              stroke={dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}
              strokeDasharray="3 2"
              strokeWidth="1"
            />
            <path
              d="M 52 86 L 76 122"
              stroke={dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}
              strokeDasharray="3 2"
              strokeWidth="1"
            />
            <path
              d="M 268 86 L 244 122"
              stroke={dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}
              strokeDasharray="3 2"
              strokeWidth="1"
            />
          </g>

          {/* Imprint Boundary / Artwork Area */}
          <g transform="translate(120, 105)">
            {/* Dashed placement box */}
            <rect
              x="0"
              y="0"
              width="80"
              height="95"
              fill={dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}
              stroke={printSubtle}
              strokeWidth="0.75"
              strokeDasharray="2 2"
              rx="2"
            />

            {/* Crosshair Center */}
            <line x1="36" y1="47.5" x2="44" y2="47.5" stroke={printSubtle} strokeWidth="0.75" />
            <line x1="40" y1="43.5" x2="40" y2="51.5" stroke={printSubtle} strokeWidth="0.75" />

            {customLogoUrl ? (
              <image href={customLogoUrl} x="10" y="15" width="60" height="60" preserveAspectRatio="xMidYMid meet" />
            ) : (
              <g transform="translate(40, 48)" textAnchor="middle">
                {/* Print technique badge */}
                <rect x="-26" y="-30" width="52" height="12" rx="2" fill={dark ? '#333' : '#EEE'} />
                <text y="-22" fontSize="7" fontWeight="bold" fill={printColor} textAnchor="middle" letterSpacing="0.5">
                  {printTechnique} PRINT
                </text>

                {/* Main imprint text */}
                <text y="0" fontSize="8.5" fontWeight="bold" fill={printColor} fontFamily="Barlow Condensed" letterSpacing="0.5">
                  {customText.toUpperCase()}
                </text>
                <text y="14" fontSize="6.5" fill={printSubtle} fontFamily="Plus Jakarta Sans">
                  UAE PRODUCTION
                </text>
              </g>
            )}
          </g>
        </svg>
      )}

      {type === 'hoodie' && (
        <svg viewBox="0 0 320 320" className="w-full h-full max-h-[300px] drop-shadow-sm">
          <defs>
            <linearGradient id="hoodie-shade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          {/* Hood */}
          <path
            d="M 120 40 C 130 18 190 18 200 40 C 218 64 212 90 200 96 C 185 86 135 86 120 96 C 108 90 102 64 120 40 Z"
            fill={colorHex}
          />
          {/* Torso & Sleeves */}
          <path
            d="M 112 70 
               L 42 120 
               L 68 160 
               L 96 142 
               L 96 286 
               L 224 286 
               L 224 142 
               L 252 160 
               L 278 120 
               L 208 70 Z"
            fill={colorHex}
          />
          <path
            d="M 112 70 L 42 120 L 68 160 L 96 142 L 96 286 L 224 286 L 224 142 L 252 160 L 278 120 L 208 70 Z"
            fill="url(#hoodie-shade)"
          />
          {/* Kangaroo Pocket */}
          <path
            d="M 120 200 L 200 200 L 214 260 L 106 260 Z"
            fill={colorHex}
            stroke={dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)'}
            strokeWidth="1.5"
          />
          {/* Bottom Rib hem */}
          <rect x="96" y="272" width="128" height="14" fill={colorHex} stroke={dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
          {/* Imprint on Chest */}
          <g transform="translate(160, 142)" textAnchor="middle">
            <rect x="-35" y="-25" width="70" height="42" fill="none" stroke={printSubtle} strokeDasharray="2 2" rx="2" />
            <text y="-6" fontSize="8" fontWeight="bold" fill={printColor} fontFamily="Barlow Condensed" letterSpacing="0.5">
              {customText.toUpperCase()}
            </text>
            <text y="7" fontSize="6" fill={printSubtle} fontFamily="Plus Jakarta Sans">
              EMBROIDERED / DTF
            </text>
          </g>
        </svg>
      )}

      {type === 'bottle' && (
        <svg viewBox="0 0 240 320" className="w-full h-full max-h-[300px]">
          <defs>
            <linearGradient id="bottle-cyl" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Lid & Handle */}
          <rect x="106" y="24" width="28" height="18" rx="3" fill="#B38B59" />
          <path d="M 102 42 L 138 42 L 134 68 L 106 68 Z" fill="#2A2C2E" />
          {/* Bottle Body */}
          <path
            d="M 106 68 
               C 106 78 84 94 84 116 
               L 84 274 
               C 84 286 96 294 120 294 
               C 144 294 156 286 156 274 
               L 156 116 
               C 156 94 134 78 134 68 Z"
            fill={colorHex}
          />
          <path
            d="M 106 68 C 106 78 84 94 84 116 L 84 274 C 84 286 96 294 120 294 C 144 294 156 286 156 274 L 156 116 C 156 94 134 78 134 68 Z"
            fill="url(#bottle-cyl)"
          />
          {/* Vertical Imprint */}
          <g transform="translate(120, 195) rotate(-90)" textAnchor="middle">
            <text fontSize="8.5" fontWeight="bold" fill={printColor} letterSpacing="1" fontFamily="Barlow Condensed">
              {customText.toUpperCase()}
            </text>
            <text y="9" fontSize="5.5" fill={printSubtle} letterSpacing="0.5">
              304 FOOD GRADE · LASER ETCH
            </text>
          </g>
        </svg>
      )}

      {type === 'tote' && (
        <svg viewBox="0 0 300 320" className="w-full h-full max-h-[300px]">
          {/* Handles */}
          <path
            d="M 100 130 C 100 40 130 30 150 30 C 170 30 200 40 200 130"
            fill="none"
            stroke={dark ? '#333' : '#CFCAC0'}
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M 100 130 C 100 40 130 30 150 30 C 170 30 200 40 200 130"
            fill="none"
            stroke={colorHex}
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Bag Body */}
          <path
            d="M 72 120 L 228 120 L 220 286 L 80 286 Z"
            fill={colorHex}
            stroke={dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}
            strokeWidth="1.5"
          />
          {/* Canvas fold shadow */}
          <path d="M 80 286 L 220 286 L 216 272 L 84 272 Z" fill="rgba(0,0,0,0.06)" />
          {/* Center Imprint */}
          <g transform="translate(150, 195)" textAnchor="middle">
            <rect x="-42" y="-35" width="84" height="68" fill="none" stroke={printSubtle} strokeDasharray="2 2" rx="2" />
            <text y="-8" fontSize="10" fontWeight="bold" fill={printColor} fontFamily="Barlow Condensed" letterSpacing="0.5">
              {customText.toUpperCase()}
            </text>
            <text y="8" fontSize="7" fill={printSubtle} fontFamily="Plus Jakarta Sans">
              12oz ORGANIC CANVAS
            </text>
            <text y="18" fontSize="6" fill={printSubtle} fontFamily="JetBrains Mono">
              SCREEN PRINTED IN DUBAI
            </text>
          </g>
        </svg>
      )}

      {type === 'cap' && (
        <svg viewBox="0 0 300 240" className="w-full h-full max-h-[260px]">
          {/* Crown */}
          <path
            d="M 68 140 
               C 68 64 120 48 160 48 
               C 200 48 240 70 244 140 Z"
            fill={colorHex}
            stroke={dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}
            strokeWidth="1.5"
          />
          {/* 6-Panel Seams */}
          <path d="M 160 48 L 160 140" stroke={dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'} strokeWidth="1.2" />
          <path d="M 160 48 C 130 75 106 110 96 140" stroke={dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'} strokeWidth="1.2" />
          <path d="M 160 48 C 190 75 214 110 224 140" stroke={dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'} strokeWidth="1.2" />
          {/* Top Button */}
          <circle cx="160" cy="48" r="5" fill={colorHex} stroke={dark ? '#fff' : '#000'} strokeWidth="0.8" />
          {/* Curved Visor / Brim */}
          <path
            d="M 60 140 C 60 140 100 178 190 178 C 240 178 268 146 268 140 C 244 134 190 134 60 140 Z"
            fill={colorHex}
            stroke={dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
            strokeWidth="1.5"
          />
          {/* Front Panel Embroidery */}
          <g transform="translate(160, 105)" textAnchor="middle">
            <rect x="-32" y="-14" width="64" height="25" rx="3" fill="none" stroke={printSubtle} strokeDasharray="1.5 1.5" />
            <text y="-1" fontSize="8" fontWeight="bold" fill={printColor} fontFamily="Barlow Condensed" letterSpacing="0.5">
              {customText.toUpperCase()}
            </text>
            <text y="8" fontSize="5.5" fill={printSubtle} fontFamily="Plus Jakarta Sans">
              3D PUFF EMBROIDERY
            </text>
          </g>
        </svg>
      )}

      {type === 'mug' && (
        <svg viewBox="0 0 280 240" className="w-full h-full max-h-[260px]">
          {/* Mug Handle */}
          <path
            d="M 195 75 C 245 75 245 160 195 160"
            fill="none"
            stroke={colorHex}
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Mug Body */}
          <rect x="75" y="55" width="130" height="135" rx="8" fill={colorHex} stroke={dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5" />
          {/* Rim ellipse */}
          <ellipse cx="140" cy="55" rx="65" ry="12" fill={dark ? '#333' : '#EEE'} />
          <ellipse cx="140" cy="55" rx="58" ry="9" fill={dark ? '#222' : '#FFF'} />
          {/* Graphic on Mug */}
          <g transform="translate(140, 122)" textAnchor="middle">
            <rect x="-35" y="-25" width="70" height="50" rx="3" fill="none" stroke={printSubtle} strokeDasharray="2 2" />
            <text y="-2" fontSize="9" fontWeight="bold" fill={printColor} fontFamily="Barlow Condensed">
              {customText.toUpperCase()}
            </text>
            <text y="11" fontSize="6.5" fill={printSubtle} fontFamily="Plus Jakarta Sans">
              FULL-WRAP UV CURED
            </text>
          </g>
        </svg>
      )}

      {type === 'notebook' && (
        <svg viewBox="0 0 260 300" className="w-full h-full max-h-[280px]">
          {/* Shadow */}
          <rect x="52" y="44" width="160" height="216" rx="6" fill="rgba(0,0,0,0.12)" />
          {/* Cover */}
          <rect x="48" y="40" width="160" height="216" rx="6" fill={colorHex} stroke={dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)'} strokeWidth="1.5" />
          {/* Spine crease */}
          <line x1="62" y1="40" x2="62" y2="256" stroke={dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'} strokeWidth="2" />
          {/* Elastic closure band */}
          <rect x="186" y="40" width="10" height="216" fill={dark ? '#111' : '#333'} />
          {/* Ribbon Bookmark tip */}
          <path d="M 130 256 L 138 256 L 134 274 Z" fill="#e80f8a" />
          {/* Blind Deboss Imprint */}
          <g transform="translate(128, 140)" textAnchor="middle">
            <rect x="-35" y="-20" width="70" height="40" rx="2" fill="none" stroke={printSubtle} strokeDasharray="2 2" />
            <text y="-2" fontSize="8.5" fontWeight="bold" fill={printColor} fontFamily="Barlow Condensed" letterSpacing="0.8">
              {customText.toUpperCase()}
            </text>
            <text y="9" fontSize="5.5" fill={printSubtle} fontFamily="JetBrains Mono">
              BLIND THERMO DEBOSS
            </text>
          </g>
        </svg>
      )}

      {type === 'giftbox' && (
        <svg viewBox="0 0 320 280" className="w-full h-full max-h-[280px]">
          {/* Open Magnetic Box Bottom */}
          <rect x="40" y="70" width="240" height="160" rx="8" fill="#1C1D1F" stroke="#333" strokeWidth="2" />
          {/* Interior EVA foam cutout area */}
          <rect x="52" y="82" width="216" height="136" rx="4" fill="#121314" />
          {/* Items nested in foam */}
          <rect x="64" y="96" width="60" height="108" rx="3" fill="#2E2F32" stroke="#444" strokeWidth="0.8" />
          <text x="94" y="152" fill="#888" fontSize="7" textAnchor="middle">NOTEBOOK</text>
          <rect x="136" y="96" width="22" height="108" rx="8" fill="#1F2023" stroke="#444" strokeWidth="0.8" />
          <text x="147" y="152" fill="#888" fontSize="6" textAnchor="middle" transform="rotate(-90, 147, 152)">TUMBLER</text>
          <line x1="174" y1="102" x2="174" y2="198" stroke="#D1CD10" strokeWidth="4" strokeLinecap="round" />
          <rect x="194" y="120" width="60" height="60" rx="3" fill="#2A2B2E" stroke="#555" strokeWidth="0.8" />
          <text x="224" y="154" fill="#AAA" fontSize="7" textAnchor="middle">VIP BADGE</text>
          {/* Lid Logo */}
          <g transform="translate(160, 52)" textAnchor="middle">
            <text fontSize="10" fontWeight="bold" fill="#faec1c" fontFamily="Barlow Condensed" letterSpacing="1">
              DOHAR VIP CORPORATE
            </text>
          </g>
        </svg>
      )}

      {type === 'vest' && (
        <svg viewBox="0 0 300 300" className="w-full h-full max-h-[280px]">
          {/* Vest Body */}
          <path
            d="M 100 48 L 70 80 L 80 270 L 220 270 L 230 80 L 200 48 L 170 80 L 130 80 Z"
            fill={colorHex}
          />
          {/* Neck V-Cut */}
          <path d="M 130 80 L 150 140 L 170 80 Z" fill="#F4F2EB" />
          {/* 3M Reflective Bands (Horizontal) */}
          <rect x="76" y="160" width="148" height="16" fill="#E4E7EB" stroke="#A9AFB8" strokeWidth="0.8" />
          <rect x="78" y="210" width="144" height="16" fill="#E4E7EB" stroke="#A9AFB8" strokeWidth="0.8" />
          {/* Front Center Zipper */}
          <line x1="150" y1="140" x2="150" y2="270" stroke="#333" strokeWidth="2" strokeDasharray="3 1" />
          {/* Imprint on Left Chest */}
          <g transform="translate(112, 120)" textAnchor="middle">
            <rect x="-24" y="-12" width="48" height="24" rx="2" fill="none" stroke="#211f1f" strokeDasharray="1.5 1.5" />
            <text y="0" fontSize="6.5" fontWeight="bold" fill="#211f1f" fontFamily="Barlow Condensed">
              {customText.toUpperCase()}
            </text>
            <text y="7" fontSize="5" fill="#444">
              EN ISO 20471
            </text>
          </g>
        </svg>
      )}
    </div>
  );
};
