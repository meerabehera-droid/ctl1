import React from 'react';
import { LAB_INCHARGE, HOD } from '../constants';
import SdgIcons from './SdgIcons';
import concreteLabBg from '../src/assets/images/labview.jpg';
import rcptTestingImg from '../src/assets/images/rcpt_lab_clean_nologo_1785996116530.jpg';
import consultancyImg from '../src/assets/images/consultancy_engineering_1785489929108.jpg';
import labViewImg from '../src/assets/images/labpic1.jpg';
import drMeeraBeheraImg from '../src/assets/images/pic1.jpg';
import drShantiniBokilImg from '../src/assets/images/pd.jpg';

interface LandingPageProps {
  onStartBooking: () => void;
  onContactClick: () => void;
  onViewExperiments: () => void;
  onViewResearch: () => void;
  onViewConsultancy: () => void;
  onViewAllPublications: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  onStartBooking, 
  onContactClick, 
  onViewExperiments,
  onViewResearch,
  onViewConsultancy,
  onViewAllPublications
}) => {
  return (
    <div className="space-y-12 animate-fade-in pb-12">
      {/* Hero Section with Concrete Material Testing Laboratory Background */}
      <section className="relative text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60">
        {/* Background Concrete Laboratory Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${concreteLabBg})` }}
        ></div>
        {/* Dark Gradient Overlay for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-blue-950/90 to-slate-900/85"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-25"></div>
        
        <div className="relative z-10 px-6 py-12 sm:px-12 text-center sm:text-left">
          
          <div className="mb-8">
            <p className="text-base sm:text-xl font-extrabold tracking-tight text-blue-200 uppercase mb-1 drop-shadow">
              DR VISHWANATH KARAD MIT WORLD PEACE UNIVERSITY
            </p>
            <p className="text-xs sm:text-sm font-bold text-blue-300/90 tracking-[0.3em] uppercase mb-6">
              PUNE, BHARAT
            </p>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 leading-[1.1] drop-shadow-md">
              Concrete Technology <br /> Laboratory
            </h1>
            <p className="text-lg sm:text-2xl font-bold text-white/95 border-l-4 border-blue-400 pl-4 mt-6 drop-shadow">
              Department of Civil Engineering
            </p>
          </div>

          <p className="text-base sm:text-xl text-blue-100 max-w-2xl mb-10 leading-relaxed drop-shadow">
            A state-of-the-art facility dedicated to advanced research, material testing, and innovation in civil engineering construction materials.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 mb-10">
            <button 
                onClick={onStartBooking}
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-10 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2 text-base w-full sm:w-auto justify-center"
            >
                <span>Book Lab Slot</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>

             <button 
                onClick={onContactClick}
                className="bg-blue-950/60 text-white hover:bg-blue-900/80 border border-blue-400/50 backdrop-blur-md font-bold py-4 px-10 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2 text-base w-full sm:w-auto justify-center"
            >
                <span>Contact Us</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </button>
          </div>

          {/* SDG Alignment Bar in Hero Section */}
          <div className="pt-6 border-t border-white/20">
            <SdgIcons layout="hero" showTitle={true} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-2">
        <div>
           <h2 className="text-3xl font-bold text-gray-900 mb-6 relative inline-block">
            About the Laboratory
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500 rounded"></span>
           </h2>
           <div className="prose text-gray-600 leading-relaxed space-y-4">
             <p>
               The Concrete Technology Laboratory at MIT World Peace University is a center of excellence designed to bridge theoretical concepts with practical application. It serves as a vital resource for undergraduate and postgraduate students, researchers, and industry professionals.
             </p>
             <p>
               Equipped with modern testing apparatus, the lab facilitates the characterization of construction materials including cement, aggregates, and various admixtures. Our focus extends beyond standard testing to cutting-edge research in sustainable building materials, geopolymer concrete, and high-performance composites.
             </p>
           </div>
        </div>
        <div className="bg-slate-900 rounded-2xl h-64 md:h-80 min-h-[250px] shadow-lg relative overflow-hidden group border border-gray-100">
            <img 
              src={labViewImg} 
              alt="Concrete Technology Laboratory View" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
        </div>
      </section>

      {/* Leadership Messages */}
      <section className="bg-blue-50 rounded-3xl p-8 md:p-10 border border-blue-100/50">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Leadership Messages</h2>
        <div className="grid md:grid-cols-2 gap-10">
            {/* Program Director (HOD) */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-100 flex flex-col items-center text-center transition-all hover:shadow-xl group">
                <a 
                  href={HOD.website || "https://mitwpu.edu.in/faculty/shantini-aniruddha-bokil"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative mb-6 block cursor-pointer group/photo"
                  title="View Dr. Shantini Bokil's Faculty Profile"
                >
                    <div className="absolute inset-0 bg-blue-600 rounded-full scale-105 opacity-0 group-hover/photo:opacity-25 transition-all"></div>
                    <div className="w-36 h-36 md:w-40 md:h-40 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 group-hover/photo:border-blue-500 transition-all">
                         <img 
                            src={drShantiniBokilImg} 
                            alt={HOD.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-110"
                        />
                    </div>
                </a>
                <div className="relative mb-6">
                    <svg className="absolute -top-4 -left-4 w-8 h-8 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-gray-600 italic text-sm leading-relaxed relative z-10 px-4">
                        "The Department of Civil Engineering takes pride in its state-of-the-art laboratories. The Concrete Tech Lab is instrumental in shaping the technical competencies of our students and supporting high-impact research."
                    </blockquote>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-50 w-full flex flex-col items-center">
                    <a 
                      href={HOD.website || "https://mitwpu.edu.in/faculty/shantini-aniruddha-bokil"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-gray-900 hover:text-blue-600 text-lg transition-colors group/link"
                    >
                      <span>{HOD.name}</span>
                      <svg className="w-4 h-4 text-blue-600 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-1">Program Director</p>
                </div>
            </div>

             {/* Professor In Charge */}
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-100 flex flex-col items-center text-center transition-all hover:shadow-xl group">
                <a 
                  href={LAB_INCHARGE.website || "https://mitwpu.edu.in/faculty/meera-jeevanreddy-chintala"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative mb-6 block cursor-pointer group/photo"
                  title="View Dr. Meera Reddy's Faculty Profile"
                >
                    <div className="absolute inset-0 bg-blue-600 rounded-full scale-105 opacity-0 group-hover/photo:opacity-25 transition-all"></div>
                    <div className="w-36 h-36 md:w-40 md:h-40 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 group-hover/photo:border-blue-500 transition-all">
                        <img 
                            src={drMeeraBeheraImg} 
                            alt={LAB_INCHARGE.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-110"
                        />
                    </div>
                </a>
                <div className="relative mb-6">
                    <svg className="absolute -top-4 -left-4 w-8 h-8 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-gray-600 italic text-sm leading-relaxed relative z-10 px-4">
                         "Welcome to the Concrete Technology Lab. Our goal is to foster a culture of inquiry and precision, encouraging students to develop sustainable infrastructure solutions."
                    </blockquote>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-50 w-full flex flex-col items-center">
                    <a 
                      href={LAB_INCHARGE.website || "https://mitwpu.edu.in/faculty/meera-jeevanreddy-chintala"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-gray-900 hover:text-blue-600 text-lg transition-colors group/link"
                    >
                      <span>{LAB_INCHARGE.name}</span>
                      <svg className="w-4 h-4 text-blue-600 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-1">Professor In-Charge</p>
                </div>
            </div>
        </div>
      </section>

      {/* Info Grid with Photos */}
       <section className="grid md:grid-cols-3 gap-8 px-2">
        {/* Material Testing */}
        <div 
          onClick={onViewExperiments}
          className="bg-white rounded-2xl shadow-lg border-t-4 border-blue-500 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
        >
          <div className="h-48 overflow-hidden relative border-b border-gray-100">
            <img 
              src={rcptTestingImg} 
              alt="Material & Durability Testing (RCPT Setup)" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Material Testing</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Comprehensive testing services for cement, aggregates, and concrete properties following IS, ASTM, and BS standards.
            </p>
          </div>
        </div>

        {/* Research & Development */}
        <div 
          onClick={onViewResearch}
          className="bg-white rounded-2xl shadow-lg border-t-4 border-orange-500 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
        >
          <div className="h-48 overflow-hidden relative border-b border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop" 
              alt="Research & Development" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Research & Development</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Supporting high-performance concrete, geopolymer concrete research, and development of ultra-sustainable materials.
            </p>
          </div>
        </div>

        {/* Consultancy */}
        <div 
          onClick={onViewConsultancy}
          className="bg-white rounded-2xl shadow-lg border-t-4 border-green-500 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
        >
          <div className="h-48 overflow-hidden relative border-b border-gray-100">
            <img 
              src={consultancyImg} 
              alt="Consultancy" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Consultancy</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Expert mix design services and structural health monitoring for government agencies and private construction firms.
            </p>
          </div>
        </div>
      </section>

      {/* Key Equipment */}
      <section className="py-6 px-2">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Facilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Compression Testing Machine (2000 kN)', 
              'Universal Testing Machine', 
              'Ultrasonic Pulse Velocity Tester', 
              'Rebound Hammer', 
              'Concrete Permeability Apparatus', 
              'Carbonation Chamber', 
              'RCPT test', 
              'Freeze and Thaw Apparatus'
            ].map((item) => (
                <div key={item} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-blue-50 transition-colors border border-gray-100 flex items-center justify-center h-full min-h-[5rem]">
                    <p className="font-semibold text-gray-700 text-sm">{item}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Research & Publications Section */}
      <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200">
         <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Recent Research & Publications</h2>
         <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md mb-3">Journal of Sustainable Cement-Based Materials</span>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Investigation of mechanical performance of concrete with end-of-life solar panels as sand replacement</h4>
                <p className="text-gray-500 text-sm mb-4">A pioneering study exploring the recycling of photovoltaic waste as a sustainable replacement for natural sand in concrete production.</p>
                <a 
                    href="https://www.tandfonline.com/doi/full/10.1080/21650373.2025.2530746" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1"
                >
                    Read Publication
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-md mb-3">Innovative Infrastructure Solutions</span>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Development of sustainable pervious concrete incorporating industrial waste for enhanced water quality</h4>
                <p className="text-gray-500 text-sm mb-4">Research on the utilization of industrial by-products to create eco-friendly pervious concrete solutions for urban water management.</p>
                <a 
                    href="https://link.springer.com/article/10.1007/s41062-025-02377-0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1"
                >
                    Read Publication
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md mb-3">Journal of Structural Design and Construction Practice</span>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Influence of Aggregate Gradation and Mineral Admixtures on the Properties of Permeable Concrete</h4>
                <p className="text-gray-500 text-sm mb-4">Experimental study evaluating how aggregate size distribution and mineral admixtures impact the mechanical and hydraulic performance of pervious concrete.</p>
                <a 
                    href="https://ascelibrary.org/doi/abs/10.1061/JSDCCC.SCENG-2016" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1"
                >
                    Read Publication
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider rounded-md mb-3">Journal of Building Engineering</span>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Performance evaluation of marble powder and fly ash concrete for non-structural applications</h4>
                <p className="text-gray-500 text-sm mb-4">Assessment of sustainable concrete mixtures incorporating marble waste and fly ash for efficient non-structural infrastructure.</p>
                <a 
                    href="https://www.sciencedirect.com/science/article/pii/S2352710224000664?pes=vor&utm_source=scopus&getft_integrator=scopus" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1"
                >
                    Read Publication
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
            </div>
         </div>
         <div className="mt-10 text-center">
            <button 
                onClick={onViewAllPublications}
                className="px-6 py-2 border-2 border-blue-900 text-blue-900 rounded-full font-bold hover:bg-blue-900 hover:text-white transition-all"
            >
                View All Research Papers
            </button>
         </div>
      </section>

      {/* Institutional Collaborations */}
      <section className="pt-8 pb-4 px-2">
         <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center uppercase tracking-wide">Institutional Collaborations</h2>
         <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80">
            {[
                { id: 'ici', label: 'ICI', full: 'Indian Concrete Institute', color: 'text-red-600' },
                { id: 'rilem', label: 'RILEM', full: 'RILEM', color: 'text-orange-500' },
            ].map((org) => (
                <div key={org.id} className="group flex flex-col items-center">
                    <div className="w-32 h-20 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center p-2 transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                         <span className={`text-3xl font-black ${org.color}`}>{org.label}</span>
                    </div>
                    <span className="mt-2 text-[10px] uppercase font-bold text-gray-400 tracking-wider group-hover:text-gray-600 transition-colors text-center max-w-[120px]">
                        {org.full}
                    </span>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default LandingPage;