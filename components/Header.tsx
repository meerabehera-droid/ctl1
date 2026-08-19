
import React from 'react';
import SdgIcons from './SdgIcons';
import concreteLabBg from '../src/assets/images/concrete_testing_lab_1785480247126.jpg';

interface HeaderProps {
    onHomeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <div 
        className={`relative text-white p-6 md:p-8 rounded-3xl mb-8 shadow-xl border border-slate-700/60 overflow-hidden text-center transition-all ${onHomeClick ? 'cursor-pointer hover:border-blue-400/80 hover:shadow-2xl' : ''}`}
        onClick={onHomeClick}
    >
      {/* Concrete Material Testing Laboratory Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(${concreteLabBg})` }}
      ></div>
      {/* Gradient & Dark Tint Overlay for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/85 to-slate-950/90 backdrop-blur-[1px]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-25 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto space-y-4">
        <div>
          <p className="font-extrabold text-blue-200 text-xs sm:text-sm md:text-base leading-tight tracking-wide uppercase mb-0.5 drop-shadow">
            DR VISHWANATH KARAD MIT WORLD PEACE UNIVERSITY
          </p>
          <p className="font-bold text-blue-300/90 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
            PUNE, BHARAT
          </p>
        </div>
        
        <div className="pt-3 border-t border-blue-400/30">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Concrete Technology Laboratory
          </h1>
          <p className="text-blue-200 font-extrabold text-xs sm:text-sm md:text-base uppercase tracking-widest mt-1.5 drop-shadow">
            Department of Civil Engineering
          </p>
        </div>

        {/* SDG Badges Embedded in Header Cover */}
        <div className="pt-4 border-t border-white/20" onClick={(e) => e.stopPropagation()}>
          <SdgIcons layout="header" showTitle={true} />
        </div>
      </div>
    </div>
  );
};

export default Header;
