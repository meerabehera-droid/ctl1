
import React, { useState } from 'react';

interface Publication {
  id: number;
  title: string;
  journal: string;
  year: number;
  url: string;
  abstract: string;
  category: 'Sustainable Materials' | 'Durability' | 'Smart Structures' | 'Concrete Technology';
}

const allPublications: Publication[] = [
  {
    id: 1,
    title: "Investigation of mechanical performance of concrete with end-of-life solar panels as sand replacement",
    journal: "Journal of Sustainable Cement-Based Materials",
    year: 2025,
    url: "https://www.tandfonline.com/doi/full/10.1080/21650373.2025.2530746",
    category: "Sustainable Materials",
    abstract: "A pioneering study exploring the recycling of photovoltaic waste as a sustainable replacement for natural sand in concrete production."
  },
  {
    id: 2,
    title: "Development of sustainable pervious concrete incorporating industrial waste for enhanced water quality",
    journal: "Innovative Infrastructure Solutions",
    year: 2025,
    url: "https://link.springer.com/article/10.1007/s41062-025-02377-0",
    category: "Sustainable Materials",
    abstract: "Research on the utilization of industrial by-products to create eco-friendly pervious concrete solutions for urban water management."
  },
  {
    id: 3,
    title: "Experimental study of permeable concrete with FA and GGBS as partial replacement to cement",
    journal: "European Journal of Environmental and Civil Engineering",
    year: 2024,
    url: "https://www.tandfonline.com/doi/full/10.1080/19648189.2024.2417674",
    category: "Sustainable Materials",
    abstract: "A comprehensive experimental investigation into the mechanical and hydraulic properties of permeable concrete where cement is partially replaced with Fly Ash (FA) and Ground Granulated Blast-furnace Slag (GGBS) to improve environmental sustainability."
  },
  {
    id: 4,
    title: "Influence of Aggregate Gradation and Mineral Admixtures on the Properties of Permeable Concrete",
    journal: "Journal of Structural Design and Construction Practice",
    year: 2024,
    url: "https://ascelibrary.org/doi/abs/10.1061/JSDCCC.SCENG-2016",
    category: "Concrete Technology",
    abstract: "Experimental study evaluating how aggregate size distribution and mineral admixtures impact the mechanical and hydraulic performance of pervious concrete."
  },
  {
    id: 5,
    title: "Performance evaluation of marble powder and fly ash concrete for non-structural applications",
    journal: "Journal of Building Engineering",
    year: 2024,
    url: "https://www.sciencedirect.com/science/article/pii/S2352710224000664",
    category: "Sustainable Materials",
    abstract: "Assessment of sustainable concrete mixtures incorporating marble waste and fly ash for efficient non-structural infrastructure."
  }
];

const PublicationsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(allPublications.map(p => p.category)))];

  const filteredPublications = (filter === 'All' 
    ? allPublications 
    : allPublications.filter(p => p.category === filter)
  ).sort((a, b) => b.year - a.year);

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 animate-fade-in max-w-6xl mx-auto min-h-[80vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b pb-8">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Research Publications</h2>
          <p className="text-gray-500 mt-2">A comprehensive list of high-impact research from our Concrete Technology Laboratory.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-md scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPublications.map(pub => (
          <div 
            key={pub.id} 
            className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded">
                    {pub.category}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {pub.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {pub.title}
                </h3>
                <p className="text-sm font-semibold text-gray-600 mb-3 italic">
                  {pub.journal}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {pub.abstract}
                </p>
              </div>
              
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <a 
                  href={pub.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-6 rounded-full transition-all text-sm shadow-sm"
                >
                  Read Full Paper
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
        
        {filteredPublications.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold">No publications found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationsPage;
