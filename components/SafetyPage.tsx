
import React from 'react';

const SafetyPage: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8 border-b pb-6">
        <div className="bg-red-100 p-3 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>
        <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Safety Instructions</h2>
            <p className="text-gray-500">Concrete Technology Laboratory Protocols</p>
        </div>
      </div>

      <div className="prose max-w-none space-y-8 text-gray-700">
        <section>
            <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-700 text-white rounded-full flex items-center justify-center text-xs">1</span>
                Personal Protective Equipment (PPE)
            </h3>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Footwear:</strong> Closed-toe shoes (preferably industrial safety shoes) are mandatory. Sandals, flip-flops, or high heels are strictly prohibited.</li>
                <li><strong>Eye Protection:</strong> Safety goggles must be worn during aggregate crushing, sieving, or any activity where particles might fly.</li>
                <li><strong>Hand Protection:</strong> Rubber or nitrile gloves must be used when handling wet concrete or chemical admixtures to prevent skin irritation or chemical burns.</li>
                <li><strong>Clothing:</strong> <strong>A Lab coat is mandatory.</strong> Avoid loose clothing or hanging jewelry that could get caught in rotating machinery (e.g., mixers).</li>
            </ul>
        </section>

        <section>
            <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-700 text-white rounded-full flex items-center justify-center text-xs">2</span>
                Equipment Operation
            </h3>
            <ul className="list-disc pl-6 space-y-2">
                <li>Never operate machinery (UTM, CTM, Pan Mixers) without prior demonstration and permission from the Lab Assistant or Professor In-Charge.</li>
                <li>Ensure the safety guards of the Compression Testing Machine (CTM) are closed before applying load.</li>
                <li>Do not touch moving parts of the concrete mixer while it is in operation.</li>
                <li>Switch off and unplug equipment immediately after use.</li>
            </ul>
        </section>

        <section>
            <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-700 text-white rounded-full flex items-center justify-center text-xs">3</span>
                Material Handling & Disposal
            </h3>
            <ul className="list-disc pl-6 space-y-2">
                <li>Heavy specimens (beams/large cylinders) must be moved using trolleys or with the help of multiple persons to avoid back injuries.</li>
                <li>Waste concrete and slurry must be disposed of in the designated waste bins, never down the standard laboratory sinks.</li>
                <li>Chemical admixtures must be labeled clearly and stored in their original containers.</li>
            </ul>
        </section>

        <section className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h3 className="text-lg font-bold text-red-800 mb-2">In Case of Emergency</h3>
            <p className="text-sm leading-relaxed">
                Immediately stop all work and alert the Lab Assistant. First aid kits are located near the main entrance (VK-012). In case of serious injury, contact the University Health Center immediately.
            </p>
        </section>
      </div>
    </div>
  );
};

export default SafetyPage;
