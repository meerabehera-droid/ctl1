
import React from 'react';
import rcptTestingImg from '../src/assets/images/rcpt_lab_clean_nologo_1785996116530.jpg';

interface ExperimentsPageProps {
  onBookSlot: () => void;
}

const experimentCategories = [
  {
    title: "Tests on Cement",
    description: "Standard characterization tests for various grades and types of cement.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    experiments: [
      { name: "Fineness of Cement", detail: "Using 90 micron sieve and/or Blaine's Air Permeability apparatus." },
      { name: "Standard Consistency", detail: "Determining the water required for standard paste using Vicat apparatus." },
      { name: "Initial & Final Setting Time", detail: "Measuring the time taken for cement to set using Vicat needles." },
      { name: "Soundness Test", detail: "Detecting excess lime or magnesia using Le-Chatelier or Autoclave." },
      { name: "Specific Gravity of Cement", detail: "Using Le-Chatelier flask and kerosene." },
      { name: "Compressive Strength", detail: "Testing standard mortar cubes in UTM/CTM." }
    ]
  },
  {
    title: "Tests on Aggregates",
    description: "Quality assessment of coarse and fine aggregates for construction usage.",
    icon: (
      <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    experiments: [
      { name: "Sieve Analysis", detail: "Particle size distribution and Fineness Modulus determination." },
      { name: "Specific Gravity & Water Absorption", detail: "Evaluating density and moisture absorption characteristics." },
      { name: "Aggregate Impact Value", detail: "Assessing resistance to sudden shock or impact." },
      { name: "Aggregate Crushing Value", detail: "Determining the relative resistance to crushing under gradually applied load." },
      { name: "Los Angeles Abrasion Test", detail: "Measuring resistance to surface wear and tear." },
      { name: "Flakiness & Elongation Index", detail: "Shape analysis using thickness and length gauges." },
      { name: "Bulking of Sand", detail: "Measuring volume increase in fine aggregate due to surface moisture." }
    ]
  },
  {
    title: "Tests on Fresh Concrete",
    description: "Evaluation of workability and flow characteristics of concrete mixtures.",
    icon: (
      <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    experiments: [
      { name: "Slump Cone Test", detail: "Measuring consistency and workability for site control." },
      { name: "Compaction Factor Test", detail: "Determining degree of workability based on gravity compaction." },
      { name: "Vee-Bee Consistometer", detail: "Assessing workability of dry/stiff concrete via vibration." },
      { name: "Flow Table Test", detail: "Measuring flowability of high-workability or self-compacting concrete." }
    ]
  },
  {
    title: "Tests on Hardened Concrete",
    description: "Structural strength testing of concrete specimens.",
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    experiments: [
      { name: "Compressive Strength (Cubes/Cylinders)", detail: "Standard load testing using 2000kN CTM." },
      { name: "Flexural Strength Test", detail: "Evaluation of bending strength of concrete beams." },
      { name: "Split Tensile Strength Test", detail: "Indirect assessment of tensile strength of cylinders." },
      { name: "Modulus of Elasticity", detail: "Measuring deformation characteristics under axial load." },
      { name: "Bond Strength Test", detail: "Determining adhesion between concrete and reinforcement bars." },
      { name: "Creep and Shrinkage", detail: "Measurement of time-dependent deformation and drying shrinkage of concrete." }
    ]
  },
  {
    title: "Durability Tests",
    description: "Long-term performance evaluations and environmental resistance tests.",
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    experiments: [
      { name: "Concrete Permeability", detail: "Measuring resistance to water ingress under pressure." },
      { name: "Rapid Chloride Permeability Test (RCPT)", detail: "Evaluating resistance to chloride ion penetration." },
      { name: "Carbonation Depth", detail: "Testing resistance to atmospheric CO2 penetration using the Carbonation Chamber." },
      { name: "Freeze & Thaw Resistance", detail: "Assessment of durability under cyclic temperature changes using the Freeze-Thaw Apparatus." },
      { name: "Accelerated Corrosion Testing", detail: "Electrochemical analysis of reinforcement corrosion in concrete specimens." }
    ]
  },
  {
    title: "Thermal Studies",
    description: "Evaluation of thermal properties and performance under temperature variations.",
    icon: (
      <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    experiments: [
      { name: "Coefficient of Thermal Expansion", detail: "Determining linear expansion characteristics of concrete with temperature rise." },
      { name: "Thermal Conductivity", detail: "Measurement of heat transfer rates through various concrete mixtures." },
      { name: "Heat of Hydration", detail: "Monitoring the exothermic reaction in mass concrete or high-cement pastes." },
      { name: "Thermal Variation Response", detail: "Studying the effect of specialized thermal gradients on structural performance." }
    ]
  },
  {
    title: "Non-Destructive Testing (NDT)",
    description: "Advanced evaluation of concrete structures without causing damage.",
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    experiments: [
      { name: "Ultrasonic Pulse Velocity (UPV)", detail: "NDT to detect cracks, voids, and relative concrete quality." },
      { name: "Rebound Hammer Test", detail: "Estimating surface hardness and potential compressive strength." },
      { name: "Rebar Mapping / Cover Meter", detail: "Locating reinforcement and measuring concrete cover depth." },
      { name: "Corrosion Mapping", detail: "Field assessment of reinforcement corrosion using half-cell potential." }
    ]
  }
];

const ExperimentsPage: React.FC<ExperimentsPageProps> = ({ onBookSlot }) => {
  return (
    <div className="space-y-12 animate-fade-in pb-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    List of Experiments
                </h2>
                <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">
                    The Concrete Technology Laboratory provides a wide range of standard tests as per IS, ASTM, and BS codes.
                </p>
            </div>
            <button 
                onClick={onBookSlot}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
            >
                Book Lab Slot
            </button>
          </div>

          {/* Top Material Testing Banner Photo */}
          <div className="w-full h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden mb-10 shadow-xl relative group border border-gray-100">
            <img 
              src={rcptTestingImg} 
              alt="RCPT Concrete Durability Testing Apparatus" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-10">
              <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-2 shadow-sm">
                Advanced Durability & Characterization Facility
              </span>
              <h3 className="text-white font-black text-xl sm:text-3xl md:text-4xl tracking-tight mb-1 drop-shadow-md">
                Rapid Chloride Permeability (RCPT) & Material Testing
              </h3>
              <p className="text-blue-100/90 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed drop-shadow">
                Rapid Chloride Permeability Test (RCPT ASTM C1202) apparatus, Compression Testing Machine (CTM), Vicat Apparatus, Slump Cone, and Blaine's Air Permeability set.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experimentCategories.map((cat, idx) => (
              <div key={idx} className="flex flex-col h-full bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="mb-4 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{cat.description}</p>
                
                <ul className="space-y-4 flex-1">
                  {cat.experiments.map((exp, eIdx) => (
                    <li key={eIdx} className="group">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 leading-tight">{exp.name}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{exp.detail}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Equipment Image Card - Spanning two slots next to the NDT section on large screens */}
            <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 group relative min-h-[300px] lg:col-span-2">
                <img 
                    src={rcptTestingImg} 
                    alt="RCPT Concrete Testing Machine" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                    <p className="text-white font-extrabold text-2xl mb-2 tracking-tight">Advanced Testing Infrastructure</p>
                    <p className="text-white/80 text-sm max-w-xl">
                        Our facility features high-precision electronic Universal and Compression Testing Machines (2000 kN), 
                        fully automated durability chambers, and digital ultrasonic pulse velocity testers for detailed material characterization.
                    </p>
                    <div className="flex gap-2 mt-4">
                        <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-[10px] uppercase font-bold text-white tracking-widest">High Precision</span>
                        <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-[10px] uppercase font-bold text-white tracking-widest">NABL Calibrated</span>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-16 bg-blue-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-20"></div>
             <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Need specific research assistance?</h3>
                <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                  Our laboratory staff is available for guidance on specialized setups and custom research methodology beyond standard experiments.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={onBookSlot}
                        className="bg-white text-blue-900 font-bold py-3 px-10 rounded-full shadow-lg hover:bg-blue-50 transition-transform hover:scale-105"
                    >
                        Schedule Slot
                    </button>
                    <a href="mailto:ctl@mitwpu.edu.in" className="bg-blue-800 border border-blue-400/30 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 flex items-center justify-center gap-2">
                        Contact Lab
                    </a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentsPage;
