
import React, { useState } from 'react';
import type { FormData, SelectedSlot } from '../types';
import { SUPERVISORS } from '../constants';

interface FormProps {
    onSubmit: (data: Omit<FormData, 'commencement' | 'completion' | 'preferredTime'>) => void;
    isSubmitting: boolean;
    selectedSlots: SelectedSlot[];
    onClearSelection: () => void;
    onViewSafety: () => void;
    onViewTerms: () => void;
    hasReadSafety: boolean;
    hasReadTerms: boolean;
    formData: Omit<FormData, 'commencement' | 'completion' | 'preferredTime'>;
    setFormData: React.Dispatch<React.SetStateAction<Omit<FormData, 'commencement' | 'completion' | 'preferredTime'>>>;
}

const Form: React.FC<FormProps> = ({ 
    onSubmit, 
    isSubmitting, 
    selectedSlots, 
    onClearSelection,
    onViewSafety,
    onViewTerms,
    hasReadSafety,
    hasReadTerms,
    formData,
    setFormData
}) => {
    const [acceptedPolicies, setAcceptedPolicies] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'contact') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, contact: digitsOnly }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSupervisorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSupervisor = SUPERVISORS.find(s => s.name === e.target.value);
        if (selectedSupervisor) {
            setFormData(prev => ({
                ...prev,
                supervisor: selectedSupervisor.name,
                supervisorEmail: selectedSupervisor.email,
            }));
        }
    };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'specialConditionTypes') => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const currentValues = prev[field];
            if (checked) {
                return { ...prev, [field]: [...currentValues, value] };
            } else {
                return { ...prev, [field]: currentValues.filter(item => item !== value) };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const contactDigits = (formData.contact || '').replace(/\D/g, '');
        if (contactDigits.length !== 10) {
            alert("Contact number is mandatory and must be exactly 10 digits.");
            return;
        }
        if (!hasReadSafety || !hasReadTerms) {
            alert("Please read both the Safety Instructions and Terms and Conditions before proceeding.");
            return;
        }
        onSubmit(formData);
    };
    
    const renderInput = (label: string, name: keyof FormData, type: string, required = true, placeholder = '') => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input 
                type={type} 
                id={name} 
                name={name} 
                value={(formData as any)[name] || ''} 
                onChange={handleChange} 
                required={required} 
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );

    // Grouping slots info for display
    const firstSlot = selectedSlots[0];

    const canCheckTerms = hasReadSafety && hasReadTerms;

    return (
        <div className="bg-white p-8 shadow-lg rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 2: Fill Utilization Details</h2>
            <div className="p-4 bg-gray-100 rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-sm text-gray-600">You have selected:</p>
                    <p className="font-bold text-blue-800 text-lg">{firstSlot.type} &mdash; {firstSlot.day}, {firstSlot.date}</p>
                    <div className="text-sm font-medium text-gray-700 mt-1">
                        {selectedSlots.map((slot, idx) => (
                            <span key={idx} className="block">• {slot.time}</span>
                        ))}
                    </div>
                </div>
                <button onClick={onClearSelection} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors whitespace-nowrap">Change Slots</button>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    {renderInput("1. Name", "name", "text")}
                    {renderInput("2. PRN / Employee No.", "prn", "text")}
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                            3. Contact No. <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input 
                            type="tel" 
                            id="contact" 
                            name="contact" 
                            inputMode="numeric"
                            pattern="[0-9]{10}"
                            minLength={10}
                            maxLength={10}
                            value={formData.contact || ''} 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter 10-digit mobile number"
                            title="Please enter a valid 10-digit mobile number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Must be exactly 10 digits (e.g., 9876543210)</p>
                    </div>
                    {renderInput("4. Requester E-Mail ID", "email", "email")}
                    <div className="mb-4">
                        <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700 mb-1">5. Name of the supervisor/ PI/ Co-PI</label>
                        <select id="supervisor" name="supervisor" value={formData.supervisor} onChange={handleSupervisorChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            {SUPERVISORS.map(s => <option key={s.email} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="block text-sm font-medium text-gray-700 mb-1">6. Researcher (Tick any)</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {['BTech', 'MTech', 'PhD', 'JRF-SRF', 'Faculty', 'Consultant'].map(type => (
                            <label key={type} className="flex items-center space-x-2">
                                <input type="radio" name="researcherType" value={type} checked={formData.researcherType === type} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {formData.researcherType === 'Consultant' && (
                    <div className="mb-6 p-5 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3 border-b border-blue-200 pb-2">Consultancy Project Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            {renderInput("Client Name", "consultantClientName", "text", true)}
                            {renderInput("Title of Project/Work", "consultantProjectTitle", "text", true)}
                            {renderInput("Amount Paid (INR)", "consultantAmountPaid", "number", true)}
                            <div className="grid grid-cols-2 gap-2">
                                {renderInput("Transaction No", "consultantTransactionNo", "text", true)}
                                {renderInput("Date", "consultantTransactionDate", "date", true)}
                            </div>
                        </div>
                        <p className="text-xs text-blue-600 -mt-2 italic">* Please attach payment proofs in email correspondence.</p>
                    </div>
                )}

                <div className="mb-4 border-t pt-4 mt-4">
                    <label htmlFor="workDescription" className="block text-sm font-medium text-gray-700 mb-1">7. Work Description (Not more than 50 words)</label>
                    <textarea id="workDescription" name="workDescription" value={formData.workDescription} onChange={handleChange} required rows={3} maxLength={300} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-1">8. List of equipment, apparatus, and accessories to be used</label>
                    <textarea id="equipment" name="equipment" value={formData.equipment} onChange={handleChange} required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                
                <div className="mb-4 border-t pt-4 mt-4">
                    <h3 className="block text-sm font-medium text-gray-700 mb-1">9. Any special conditions during the test?</h3>
                    <div className="flex gap-4 mt-2">
                        <label className="flex items-center space-x-2"><input type="radio" name="hasSpecialConditions" value="No" checked={formData.hasSpecialConditions === 'No'} onChange={handleChange}/><span>No</span></label>
                        <label className="flex items-center space-x-2"><input type="radio" name="hasSpecialConditions" value="Yes" checked={formData.hasSpecialConditions === 'Yes'} onChange={handleChange}/><span>Yes</span></label>
                    </div>
                    {formData.hasSpecialConditions === 'Yes' && (
                        <div className="mt-4 pl-4 border-l-2">
                            <p className="text-sm text-gray-600 mb-2">If yes, please mention:</p>
                             <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                {['Thermal Variation', 'Acidic', 'Marine', 'Biohazard', 'Radioactive', 'Hazardous'].map(cond => (
                                    <label key={cond} className="flex items-center space-x-2"><input type="checkbox" value={cond} checked={formData.specialConditionTypes.includes(cond)} onChange={(e) => handleCheckboxChange(e, 'specialConditionTypes')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"/><span>{cond}</span></label>
                                ))}
                            </div>
                            <input type="text" name="otherSpecialCondition" placeholder="Others (please specify)" value={formData.otherSpecialCondition} onChange={handleChange} className="mt-2 w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">10. Any special instructions for Lab assistants or support staff?</label>
                    <textarea id="specialInstructions" name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>

                <div className="border-t pt-6">
                    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800 font-semibold mb-2">Important Documentation Required:</p>
                        <div className="flex flex-col gap-2">
                            <button 
                                type="button" 
                                onClick={onViewSafety}
                                className={`text-left text-sm flex items-center gap-2 ${hasReadSafety ? 'text-green-600 font-bold' : 'text-blue-600 hover:underline'}`}
                            >
                                {hasReadSafety ? '✓' : '→'} Read Safety Instructions
                            </button>
                            <button 
                                type="button" 
                                onClick={onViewTerms}
                                className={`text-left text-sm flex items-center gap-2 ${hasReadTerms ? 'text-green-600 font-bold' : 'text-blue-600 hover:underline'}`}
                            >
                                {hasReadTerms ? '✓' : '→'} Read Terms and Conditions
                            </button>
                        </div>
                        {!canCheckTerms && (
                            <p className="text-[10px] text-yellow-600 mt-2 italic">* You must visit both pages above before you can accept the terms.</p>
                        )}
                    </div>

                    <div className="flex items-start mb-4">
                        <input 
                            id="terms" 
                            type="checkbox" 
                            required 
                            disabled={!canCheckTerms}
                            checked={acceptedPolicies}
                            onChange={(e) => setAcceptedPolicies(e.target.checked)}
                            className={`mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${!canCheckTerms ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} 
                        />
                        <label htmlFor="terms" className={`ml-2 block text-sm ${!canCheckTerms ? 'text-gray-400' : 'text-gray-900 cursor-pointer'}`}>
                            I accept the Terms and Conditions and safety instructions. I have read and understood the required protocols for lab utilization.
                        </label>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isSubmitting || !acceptedPolicies} 
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
