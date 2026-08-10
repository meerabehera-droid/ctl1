
import React, { useRef } from 'react';
import { LAB_INCHARGE } from '../constants';
import consultancyImg from '../src/assets/images/consultancy_engineering_1785489929108.jpg';
import drMeeraBeheraImg from '../src/assets/images/pic1.jpg';

interface ConsultancyPageProps {
  onBookSlot: () => void;
}

const consultancyServices = [
  {
    title: "Quality Control & Assurance",
    description: "Third-party inspection and quality audits for infrastructure projects.",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    services: [
      { name: "Mix Design (M20 - M100)", detail: "High-performance and self-compacting concrete mix proportions." },
      { name: "Aggregate & Cement Characterization", detail: "Comprehensive chemical and physical property assessment." },
      { name: "On-site Quality Audits", detail: "Standardized inspection of batching plants and casting sites." }
    ]
  },
  {
    title: "Structural Health Monitoring",
    description: "Assessment of existing structures using Non-Destructive techniques.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    services: [
      { name: "NDT Audits (UPV & Hammer)", detail: "Evaluating in-situ strength and defect mapping." },
      { name: "Corrosion Potential Mapping", detail: "Half-cell potential and resistivity tests for reinforced concrete." },
      { name: "Rebar Scanning", detail: "High-precision location of reinforcement and cover depth measurement." }
    ]
  },
  {
    title: "Specialized Forensics",
    description: "Expert analysis of material failures and structural distress.",
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    services: [
      { name: "Crack Pattern Analysis", detail: "Identifying root causes of structural distress." },
      { name: "Chemical Attack Forensics", detail: "Analysis of sulfate, chloride, and carbonation ingress." }
    ]
  }
];

const ConsultancyPage: React.FC<ConsultancyPageProps> = ({ onBookSlot }) => {
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    Consultancy Services
                </h2>
                <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">
                    Leveraging academic expertise and state-of-the-art infrastructure to provide world-class engineering solutions.
                </p>
            </div>
            <button 
                onClick={scrollToContact}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
            >
                Request Consultation
            </button>
          </div>

          <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl relative group">
                <img 
                    src={consultancyImg} 
                    alt="Consultancy & Structural Health Audit" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <h3 className="text-white font-extrabold text-2xl md:text-4xl mb-2 tracking-tight">Expert Engineering Solutions</h3>
                    <p className="text-white/90 text-sm md:text-lg max-w-2xl leading-relaxed">
                        We partner with industry leaders and government agencies to ensure structural integrity and material excellence in Pune's growing infrastructure.
                    </p>
                </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {consultancyServices.map((section, idx) => (
              <div key={idx} className="flex flex-col h-full bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="mb-4 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{section.description}</p>
                
                <ul className="space-y-4 flex-1">
                  {section.services.map((service, sIdx) => (
                    <li key={sIdx} className="group">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 leading-tight">{service.name}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{service.detail}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Consultancy Contact Section */}
          <div ref={contactRef} className="pt-12 border-t border-gray-100">
            <div className="bg-green-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white shrink-0">
                    <img 
                        src={drMeeraBeheraImg}  
                        alt={LAB_INCHARGE.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <span className="inline-block px-4 py-1 bg-green-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                        Contact Lab In-charge
                    </span>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{LAB_INCHARGE.name}</h3>
                    <p className="text-green-700 font-bold mb-6">Professor In-Charge, Concrete Technology Laboratory</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <a 
                                href={`mailto:${LAB_INCHARGE.email}`}
                                className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Official Email</p>
                                    <p className="text-sm font-bold text-gray-700 truncate">{LAB_INCHARGE.email}</p>
                                </div>
                            </a>
                        </div>
                        <a 
                            href="tel:+918750388995"
                            className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group h-fit"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Phone No</p>
                                <p className="text-sm font-bold text-gray-700">+91 8750388995</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 text-center">
                <p className="text-gray-500 text-sm mb-6">For administrative bookings, students can use the standard booking form.</p>
                <button 
                    onClick={onBookSlot}
                    className="bg-gray-900 text-white font-bold py-3 px-10 rounded-full hover:bg-green-600 transition-all shadow-lg"
                >
                    Standard Lab Slot Booking
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultancyPage;
