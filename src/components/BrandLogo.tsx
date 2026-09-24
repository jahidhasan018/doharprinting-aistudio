import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'icon-only';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md'
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#211f1f';
  const subtextColor = isDark ? '#A09D95' : '#211f1f';
  const tagColor = '#faec1c';

  // Sizing
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Circular CMYK Infinity Badge matching the attached PDF */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Outer Circular Boundary */}
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke={isDark ? '#4A4844' : '#211f1f'}
          strokeWidth="3"
          fill={isDark ? '#1C1B1A' : '#FFFFFF'}
        />

        {/* Top Magenta Arrow Tip */}
        <path
          d="M 57 15 L 63 32 L 51 32 Z"
          fill="#e80f8a"
        />

        {/* Bottom Black Arrow Tip */}
        <path
          d="M 63 105 L 57 88 L 69 88 Z"
          fill="#211f1f"
        />

        {/* Cyan Loop (Left) */}
        <path
          d="M 46 36 C 30 36 20 46 20 60 C 20 74 30 84 46 84 C 58 84 66 74 72 60"
          stroke="#29abe1"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />

        {/* Yellow Loop (Right) */}
        <path
          d="M 74 84 C 90 84 100 74 100 60 C 100 46 90 36 74 36 C 62 36 54 46 48 60"
          stroke="#faec1c"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />

        {/* Inner Overlap Definition */}
        <circle cx="46" cy="60" r="8" fill={isDark ? '#1C1B1A' : '#FFFFFF'} />
        <circle cx="74" cy="60" r="8" fill={isDark ? '#1C1B1A' : '#FFFFFF'} />
      </svg>

      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-display font-black uppercase"
              style={{
                fontSize: size === 'sm' ? '1.3rem' : size === 'lg' ? '1.9rem' : '1.55rem',
                color: textColor,
                letterSpacing: '-0.03em',
                lineHeight: 1
              }}
            >
              DOHAR
            </span>
            {size !== 'sm' && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#FAF2C0] text-[#211f1f] border border-[#faec1c]/60">
                UAE
              </span>
            )}
          </div>
          {variant === 'full' && (
            <div className="flex flex-col mt-0.5">
              <span
                className="font-display font-bold uppercase tracking-wider text-[9.5px] leading-tight"
                style={{ color: subtextColor }}
              >
                TEXTILES PRINTING L.L.C
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
