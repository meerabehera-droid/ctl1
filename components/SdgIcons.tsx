import React, { useState } from 'react';

export interface SdgGoal {
  number: number;
  title: string;
  subtitle: string;
  color: string;
  badgeBg: string;
  cardGradient: string;
  borderColor: string;
  shadowColor: string;
  description: string;
  icon: React.ReactNode;
}

export const SDG_GOALS: SdgGoal[] = [
  {
    number: 4,
    title: 'Quality Education',
    subtitle: 'Practical & Research Excellence',
    color: '#C5192D',
    badgeBg: 'bg-white text-[#C5192D]',
    cardGradient: 'from-[#E01F35] via-[#C5192D] to-[#A31021]',
    borderColor: 'border-red-400/40',
    shadowColor: 'hover:shadow-red-600/50',
    description: 'Providing advanced experimental training, material characterization skills, and academic research facilities for civil engineering students.',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.5l-7-3.82v4.88c0 2.21 3.13 4 7 4s7-1.79 7-4v-4.88l-7 3.82z"/>
      </svg>
    )
  },
  {
    number: 9,
    title: 'Industry, Innovation & Infrastructure',
    subtitle: 'Resilient Infrastructure',
    color: '#FD6925',
    badgeBg: 'bg-white text-[#FD6925]',
    cardGradient: 'from-[#FF7636] via-[#FD6925] to-[#D84F0E]',
    borderColor: 'border-orange-400/40',
    shadowColor: 'hover:shadow-orange-500/50',
    description: 'Developing high-performance concrete mixes, non-destructive testing, and consultancy solutions for industrial infrastructure.',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm-8-6v2H5V7h6m1-2H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm8 2v8h-6V7h6m1-2h-8c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"/>
      </svg>
    )
  },
  {
    number: 11,
    title: 'Sustainable Cities & Communities',
    subtitle: 'Eco-Friendly Urban Infrastructure',
    color: '#FD9D24',
    badgeBg: 'bg-white text-[#E0830E]',
    cardGradient: 'from-[#FFA933] via-[#FD9D24] to-[#D97D0B]',
    borderColor: 'border-amber-300/50',
    shadowColor: 'hover:shadow-amber-500/50',
    description: 'Pioneering pervious concrete for urban stormwater management, groundwater recharge, and sustainable city design.',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
      </svg>
    )
  },
  {
    number: 12,
    title: 'Responsible Consumption & Production',
    subtitle: 'Waste Recycling in Concrete',
    color: '#BF8B2E',
    badgeBg: 'bg-white text-[#9E6F1B]',
    cardGradient: 'from-[#CF9938] via-[#BF8B2E] to-[#996C1C]',
    borderColor: 'border-yellow-300/40',
    shadowColor: 'hover:shadow-yellow-600/50',
    description: 'Utilizing end-of-life photovoltaic solar panel waste, industrial fly ash, and marble slurry as aggregate & binder replacements.',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 18.8A5.87 5.87 0 016 16c0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
      </svg>
    )
  },
  {
    number: 13,
    title: 'Climate Action',
    subtitle: 'Low-Carbon Cement & Concrete',
    color: '#3F7E44',
    badgeBg: 'bg-white text-[#3F7E44]',
    cardGradient: 'from-[#4B9351] via-[#3F7E44] to-[#2E5E32]',
    borderColor: 'border-emerald-400/40',
    shadowColor: 'hover:shadow-emerald-600/50',
    description: 'Reducing carbon emissions through geopolymer concrete, carbonation resistance studies, and sustainable binder alternatives.',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    )
  }
];

interface SdgIconsProps {
  layout?: 'hero' | 'header' | 'compact';
  showTitle?: boolean;
}

const SdgIcons: React.FC<SdgIconsProps> = ({ layout = 'hero', showTitle = true }) => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  return (
    <div className={`w-full ${layout === 'header' ? 'py-1' : 'pt-4 pb-2'}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"></span>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-blue-100 drop-shadow">
              UN Sustainable Development Goals (SDGs)
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] text-blue-200/80 font-medium">
            Click goal for details
          </span>
        </div>
      )}

      {/* Grid of Colorful SDG Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
        {SDG_GOALS.map((sdg) => {
          const isActive = activeTooltip === sdg.number;
          return (
            <div
              key={sdg.number}
              className="relative group"
              onMouseEnter={() => setActiveTooltip(sdg.number)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => setActiveTooltip(isActive ? null : sdg.number)}
            >
              {/* SDG Card Tile with Official Colors & Soft Glow */}
              <div
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl transition-all duration-300 border bg-gradient-to-br ${sdg.cardGradient} ${sdg.borderColor} ${sdg.shadowColor} shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
              >
                {/* Official SDG White Badge with Bold Number */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${sdg.badgeBg} flex-shrink-0 flex items-center justify-center font-black text-xs sm:text-sm shadow-md border border-white/60 transform group-hover:scale-105 transition-transform`}
                >
                  {sdg.number}
                </div>

                {/* SDG Title & Subtitle */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-white/95">{sdg.icon}</span>
                    <p className="text-[10px] sm:text-[11px] font-black text-white truncate leading-tight drop-shadow-sm">
                      SDG {sdg.number}
                    </p>
                  </div>
                  <p className="text-[9px] sm:text-[10px] font-extrabold text-white/90 truncate leading-tight mt-0.5 tracking-tight">
                    {sdg.title}
                  </p>
                </div>
              </div>

              {/* Hover/Click Tooltip Popover */}
              {isActive && (
                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-64 p-3.5 bg-slate-950/95 text-white rounded-2xl shadow-2xl border border-slate-700 animate-fade-in text-xs backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-800">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${sdg.badgeBg}`}>
                      SDG {sdg.number}
                    </span>
                    <span className="font-bold text-slate-100 text-[11px] truncate">{sdg.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">{sdg.description}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SdgIcons;

