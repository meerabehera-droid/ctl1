

import React from 'react';
import { FormData, ApprovalStatus, SelectedSlot } from '../types';
import { LAB_INCHARGE, HOD } from '../constants';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';
import ClockIcon from './icons/ClockIcon';

interface ApprovalStatusProps {
    formData: FormData & { selectedSlots: SelectedSlot[] };
    status: ApprovalStatus;
    bookingId?: string | null;
    onReset: () => void;
}

const ApprovalStep: React.FC<{ title: string; approver: string; isComplete: boolean; isCurrent: boolean; isRejected: boolean }> = ({ title, approver, isComplete, isCurrent, isRejected }) => {
    const getStatusIcon = () => {
        if (isComplete) return <CheckCircleIcon className="w-8 h-8 text-green-500" />;
        if (isCurrent) return <ClockIcon className="w-8 h-8 text-yellow-500 animate-pulse" />;
        if (isRejected && isCurrent) return <XCircleIcon className="w-8 h-8 text-red-500" />;
        return <div className="w-8 h-8 bg-gray-300 rounded-full"></div>;
    };
    
    return (
        <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
                {getStatusIcon()}
            </div>
            <div>
                <h4 className="font-semibold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-500">{approver}</p>
                 {isCurrent && !isRejected && <p className="text-sm text-yellow-600 font-semibold">Action Required</p>}
                 {isComplete && <p className="text-sm text-green-600 font-semibold">Approved</p>}
            </div>
        </div>
    );
};

const ApprovalStatusDisplay: React.FC<ApprovalStatusProps> = ({ formData, status, bookingId, onReset }) => {
    
    // Check if HOD approval is required if ANY selected slot is Overnight, Saturday, or Sunday OR if Consultant
    const isHodApprovalRequired = formData.selectedSlots.some(slot => 
        slot.type === 'Overnight' || 
        slot.day === 'Saturday' || 
        slot.day === 'Sunday'
    ) || formData.researcherType === 'Consultant';

    const renderApprovalControls = () => {
        if (status === ApprovalStatus.REJECTED || status === ApprovalStatus.APPROVED) return null;

        let approverRole = '';
        if (status === ApprovalStatus.PENDING_SUPERVISOR) approverRole = `Supervisor (${formData.supervisor})`;
        else if (status === ApprovalStatus.PENDING_INCHARGE) approverRole = `Lab In-charge (${LAB_INCHARGE.name})`;
        else if (status === ApprovalStatus.PENDING_HOD) approverRole = `Program Director (${HOD.name})`;

        return (
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h3 className="text-lg font-semibold text-gray-800">Awaiting approval</h3>
                <p className="text-sm text-gray-600 mt-1">
                    An email has been sent to <span className="font-bold">{approverRole}</span>. You will be
                    notified by email as soon as a decision is made. This page updates on its own.
                </p>
                {bookingId && (
                    <p className="text-xs text-gray-500 mt-3">
                        Reference number: <span className="font-mono font-bold">{bookingId}</span> — quote this
                        in any query about your booking.
                    </p>
                )}
            </div>
        );
    };

    const renderStatusBanner = () => {
        if (status === ApprovalStatus.APPROVED) {
            return (
                <div className="p-4 mb-6 bg-green-100 text-green-800 rounded-lg flex items-center space-x-3">
                    <CheckCircleIcon className="w-6 h-6"/>
                    <p><strong>Success!</strong> This request has been fully approved. A notification has been sent to {formData.email}.</p>
                </div>
            );
        }
        if (status === ApprovalStatus.REJECTED) {
             return (
                <div className="p-4 mb-6 bg-red-100 text-red-800 rounded-lg flex items-center space-x-3">
                    <XCircleIcon className="w-6 h-6"/>
                    <p><strong>Rejected.</strong> This request has been rejected. A notification has been sent to {formData.email}.</p>
                </div>
            );
        }
        return (
             <div className="p-4 mb-6 bg-yellow-100 text-yellow-800 rounded-lg flex items-center space-x-3">
                <ClockIcon className="w-6 h-6"/>
                <p><strong>Pending Approval.</strong> This request is awaiting review.</p>
            </div>
        );
    }
    
    const firstSlot = formData.selectedSlots[0];

    return (
        <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted</h2>
            <p className="text-gray-600 mb-6">The form has been submitted for approval. You can track the status below.</p>
            
            {renderStatusBanner()}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Approval Workflow */}
                <div className="space-y-6 relative">
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-300"></div>
                     <ApprovalStep title="Supervisor Approval" approver={formData.supervisor} isComplete={status > ApprovalStatus.PENDING_SUPERVISOR} isCurrent={status === ApprovalStatus.PENDING_SUPERVISOR} isRejected={status === ApprovalStatus.REJECTED}/>
                     <ApprovalStep title="Lab In-charge Approval" approver={LAB_INCHARGE.name} isComplete={status > ApprovalStatus.PENDING_INCHARGE} isCurrent={status === ApprovalStatus.PENDING_INCHARGE} isRejected={status === ApprovalStatus.REJECTED} />
                     {isHodApprovalRequired && (
                        <ApprovalStep title="Program Director Approval" approver={HOD.name} isComplete={status === ApprovalStatus.APPROVED} isCurrent={status === ApprovalStatus.PENDING_HOD} isRejected={status === ApprovalStatus.REJECTED}/>
                     )}
                </div>
                
                {/* Submitted Data */}
                <div>
                     <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Submitted Details</h3>
                     <div className="space-y-2 text-sm text-gray-700">
                        <div className="mb-3">
                            <p><strong>Selected Date:</strong> {firstSlot.day}, {firstSlot.date}</p>
                            <p><strong>Activity Type:</strong> {firstSlot.type}</p>
                            <p><strong>Booked Slots:</strong></p>
                            <ul className="list-disc list-inside pl-2 text-blue-800 font-semibold">
                                {formData.selectedSlots.map((slot, idx) => (
                                    <li key={idx}>{slot.time}</li>
                                ))}
                            </ul>
                        </div>
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>PRN/Employee No:</strong> {formData.prn}</p>
                        <p><strong>Contact:</strong> {formData.contact}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Supervisor:</strong> {formData.supervisor}</p>
                        <p><strong>Researcher Type:</strong> {formData.researcherType}</p>
                        
                        {formData.researcherType === 'Consultant' && (
                            <div className="ml-2 pl-2 border-l-2 border-blue-200 bg-blue-50 p-2 rounded text-xs text-gray-600 my-2">
                                <p><strong>Client:</strong> {formData.consultantClientName}</p>
                                <p><strong>Project:</strong> {formData.consultantProjectTitle}</p>
                                <p><strong>Amount:</strong> ₹{formData.consultantAmountPaid}</p>
                                <p><strong>Txn:</strong> {formData.consultantTransactionNo} ({formData.consultantTransactionDate})</p>
                            </div>
                        )}

                        <p><strong>Description:</strong> {formData.workDescription}</p>
                        <p><strong>Equipment:</strong> {formData.equipment}</p>
                     </div>
                </div>
            </div>

            {renderApprovalControls()}
            
            <div className="mt-8 border-t pt-6 text-center">
                 <button onClick={onReset} className="text-blue-600 hover:underline">Submit a new form</button>
            </div>

        </div>
    );
};

export default ApprovalStatusDisplay;
