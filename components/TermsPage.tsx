
import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8 border-b pb-6">
        <div className="bg-blue-100 p-3 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>
        <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Terms & Conditions</h2>
            <p className="text-gray-500">Laboratory Utilization Agreement</p>
        </div>
      </div>

      <div className="prose max-w-none space-y-8 text-gray-700">
        <section>
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs">1</span>
                General Usage Policy
            </h3>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Booking:</strong> All lab activities must be pre-booked through this portal. Walk-in usage is not permitted.</li>
                <li><strong>Punctuality:</strong> Users must arrive at least 10 minutes before their scheduled slot. Slots not occupied within 30 minutes of the start time may be cancelled.</li>
                <li><strong>Unauthorized Persons:</strong> Only authorized researchers and students are allowed. Bringing guests or unauthorized personnel is a violation of lab policy.</li>
            </ul>
        </section>

        <section>
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs">2</span>
                Cleanliness & Maintenance
            </h3>
            <ul className="list-disc pl-6 space-y-2">
                <li>Users are responsible for cleaning all moulds, pans, and tools used during their session.</li>
                <li>The working area must be swept and left tidy before leaving the laboratory.</li>
                <li>Any equipment failure or breakage must be reported to the Lab Assistant immediately.</li>
            </ul>
        </section>

        <section>
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs">3</span>
                Documentation & Data
            </h3>
            <ul className="list-disc pl-6 space-y-2">
                <li>Results obtained using lab equipment must be entered into the Lab Logbook.</li>
                <li>For consultancy projects, a copy of the final report summary (if applicable) should be shared with the Department for records.</li>
            </ul>
        </section>

        <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Compliance Statement</h3>
            <p className="text-sm leading-relaxed">
                Failure to comply with these terms or the safety instructions may result in the suspension of laboratory privileges and disciplinary action by the Department Head.
            </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
