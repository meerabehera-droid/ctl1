import React, { useState } from 'react';
import { LAB_INCHARGE } from '../constants';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate email sending
    setTimeout(() => {
      alert(`Thank you, ${formData.name}. Your message has been sent to ctl@mitwpu.edu.in. We will get back to you shortly.`);
      setFormData({ name: '', contact: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in mb-8">
      <div className="grid md:grid-cols-2">
        
        {/* Left Column: Map and Address */}
        <div className="bg-blue-900 text-white p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-800 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-600 rounded-full opacity-50 blur-3xl"></div>
            
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                
                <div className="space-y-6 mb-8">
                    <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-800 rounded-lg shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-200 uppercase tracking-wider text-sm mb-1">Address</h3>
                            <p className="leading-relaxed text-blue-50">
                                VK-012, Vivekanand Building,<br/>
                                Department of Civil Engineering,<br/>
                                Dr. Vishwanath Karad MIT World Peace University,<br/>
                                Kothrud, Pune - 411038, India
                            </p>
                        </div>
                    </div>

                    {/* Professor In-Charge Section */}
                    <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-800 rounded-lg shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-200 uppercase tracking-wider text-sm mb-1">Professor In-Charge</h3>
                            <p className="text-lg font-bold text-white mb-1">{LAB_INCHARGE.name}</p>
                            <div className="text-blue-100 space-y-1 text-sm">
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <a href={`mailto:${LAB_INCHARGE.email}`} className="hover:text-white transition-colors">{LAB_INCHARGE.email}</a>
                                </p>
                                <p className="flex items-center gap-2">
                                     <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    +91 8750388995
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                         <div className="p-2 bg-blue-800 rounded-lg shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-200 uppercase tracking-wider text-sm mb-1">Lab Email ID</h3>
                            <a href="mailto:ctl@mitwpu.edu.in" className="text-xl font-bold hover:text-blue-200 transition-colors">ctl@mitwpu.edu.in</a>
                        </div>
                    </div>
                </div>

                {/* Embedded Map */}
                <div className="rounded-xl overflow-hidden shadow-lg border-2 border-blue-700/50 h-64 bg-gray-200 relative">
                     <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight={0} 
                        marginWidth={0} 
                        src="https://maps.google.com/maps?q=MIT+World+Peace+University+Pune&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        title="MIT WPU Location"
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                </div>
            </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="p-8 md:p-12 bg-gray-50 flex flex-col justify-center">
             <h3 className="text-2xl font-bold text-gray-800 mb-2">Write to Us</h3>
             <p className="text-gray-600 mb-8">Have a query regarding testing facilities, consultancy, or research? Send us a message.</p>
             
             <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                        placeholder="Dr. / Mr. / Ms. Name"
                    />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <input 
                            type="tel" 
                            id="contact" 
                            name="contact" 
                            required
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white resize-none"
                        placeholder="Please describe your inquiry..."
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 flex justify-center items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        <>
                            <span>Send Message</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </>
                    )}
                </button>
             </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;