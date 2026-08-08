
import React, { useRef } from 'react';
import { SUPERVISORS } from '../constants';

interface ResearchPageProps {
  onBookSlot: () => void;
}

const researchThemes = [
  {
    title: "Sustainable Construction Materials",
    description: "Developing eco-friendly alternatives to conventional cement and aggregates.",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5V17m-5 1v2.5M12 21a9 9 0 110-18 9 9 0 010 18z" />
      </svg>
    ),
    projects: [
      { name: "Fly Ash & GGBFS Geopolymer Concrete", detail: "Investigating ambient curing mechanisms for structural applications." },
      { name: "Waste Plastic in Bituminous Mixes", detail: "Enhancing road durability using recycled polymer additives." },
      { name: "Bamboo-Reinforced Concrete", detail: "Exploring structural viability of natural fibers in low-cost housing." }
    ]
  },
  {
    title: "Structural Health & Durability",
    description: "Advanced monitoring and prediction models for structural longevity.",
    icon: (
      <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    projects: [
      { name: "Self-Healing Concrete Mechanisms", detail: "Using encapsulated crystalline additives and bacteria." },
      { name: "Carbonation Front Modeling", detail: "Predicting reinforcement corrosion in high-rise coastal structures." },
      { name: "Fibre-Reinforced Cementitious Composites", detail: "Hybrid steel and synthetic fiber synergies for seismic resistance." }
    ]
  },
  {
    title: "Digital Construction",
    description: "Next-generation automation and additive manufacturing in Civil Engineering.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    projects: [
      { name: "3D Concrete Printing Mix Design", detail: "Optimizing thixotropy and buildability for large-scale extrusion." },
      { name: "AI in Concrete Quality Control", detail: "Using machine learning to predict 28-day strength from fresh properties." }
    ]
  }
];

const ResearchPage: React.FC<ResearchPageProps> = ({ onBookSlot }) => {
  const facultySectionRef = useRef<HTMLDivElement>(null);

  const scrollToFaculty = () => {
    facultySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    Research & Development
                </h2>
                <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">
                    Driving innovation in construction technology through high-impact research projects and institutional collaborations.
                </p>
            </div>
            <button 
                onClick={scrollToFaculty}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
            >
                Join as Researcher
            </button>
          </div>

          <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl relative group">
                <img 
                    src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop" 
                    alt="Research & Development Infrastructure" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <h3 className="text-white font-extrabold text-2xl md:text-4xl mb-2 tracking-tight">Pioneering Future Materials</h3>
                    <p className="text-white/90 text-sm md:text-lg max-w-2xl leading-relaxed">
                        Our ongoing projects focus on reducing the carbon footprint of the construction industry while enhancing structural resilience for the next century.
                    </p>
                </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {researchThemes.map((theme, idx) => (
              <div key={idx} className="flex flex-col h-full bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="mb-4 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                  {theme.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{theme.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{theme.description}</p>
                
                <ul className="space-y-4 flex-1">
                  {theme.projects.map((proj, pIdx) => (
                    <li key={pIdx} className="group">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 leading-tight">{proj.name}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{proj.detail}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Research Faculty Section */}
          <div ref={facultySectionRef} className="pt-8 border-t border-gray-100">
            <div className="mb-10 text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Research Faculty & Supervisors</h3>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Contact our esteemed faculty members to explore research opportunities, PhD positions, or collaborative projects.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {SUPERVISORS.map((faculty, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:bg-white hover:shadow-lg transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                {faculty.name.split(' ').filter(n => !n.includes('.')).map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="font-bold text-gray-800 text-sm leading-tight group-hover:text-orange-600 transition-colors truncate" title={faculty.name}>
                                    {faculty.name}
                                </h4>
                                <a 
                                    href={`mailto:${faculty.email}`} 
                                    className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1 mt-1 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="truncate">{faculty.email}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 bg-gray-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h4 className="text-xl font-bold mb-2">Ready to contribute to the future of concrete?</h4>
                    <p className="text-gray-400 text-sm">Select your supervisor and book your research slot to begin your experimental work.</p>
                </div>
                <button 
                    onClick={onBookSlot}
                    className="bg-white text-gray-900 font-bold py-3 px-10 rounded-full hover:bg-orange-500 hover:text-white transition-all whitespace-nowrap"
                >
                    Book Research Slot
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;
