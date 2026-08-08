import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { FormData, SelectedSlot } from './types';
import { ApprovalStatus } from './types';
import { LAB_INCHARGE, HOD, SUPERVISORS } from './constants';

import Header from './components/Header';
import CalendarView from './components/CalendarView';
import Form from './components/Form';
import ApprovalStatusDisplay from './components/ApprovalStatus';
import LandingPage from './components/LandingPage';
import ContactPage from './components/ContactPage';
import ExperimentsPage from './components/ExperimentsPage';
import ResearchPage from './components/ResearchPage';
import ConsultancyPage from './components/ConsultancyPage';
import SafetyPage from './components/SafetyPage';
import TermsPage from './components/TermsPage';
import PublicationsPage from './components/PublicationsPage';
import EmailToast, { EmailData } from './components/EmailToast';

// Helper to create a unique identifier for a slot
const getSlotKey = (slot: SelectedSlot): string => {
    return `${slot.date}-${slot.time}-${slot.type}`;
};

// Helper to format submission details for emails
const formatSubmissionDetails = (data: FormData & { selectedSlots: SelectedSlot[] }) => {
    let details = `\n\n--- SUBMISSION DETAILS ---\n`;
    details += `Name: ${data.name}\n`;
    details += `PRN/ID: ${data.prn}\n`;
    details += `Contact: ${data.contact}\n`;
    details += `Supervisor: ${data.supervisor}\n`;
    details += `Researcher Type: ${data.researcherType}\n`;
    details += `Work Description: ${data.workDescription}\n`;
    details += `Equipment: ${data.equipment}\n`;
    details += `Special Conditions: ${data.hasSpecialConditions === 'Yes' ? data.specialConditionTypes.join(', ') : 'None'}\n`;
    
    if (data.researcherType === 'Consultant') {
        details += `\n[Consultancy Info]\n`;
        details += `Client: ${data.consultantClientName}\n`;
        details += `Project: ${data.consultantProjectTitle}\n`;
        details += `Transaction: ${data.consultantTransactionNo} (${data.consultantTransactionDate})\n`;
    }

    details += `\n[Booked Slots]\n`;
    details += `Activity: ${data.selectedSlots[0].type}\n`;
    details += `Date: ${data.selectedSlots[0].date} (${data.selectedSlots[0].day})\n`;
    details += `Slots: ${data.selectedSlots.map(s => s.time).join(', ')}`;
    
    return details;
};

const initialFormDraft: Omit<FormData, 'commencement' | 'completion' | 'preferredTime'> = {
    name: '', prn: '', contact: '', email: '',
    supervisor: SUPERVISORS[0].name,
    supervisorEmail: SUPERVISORS[0].email,
    researcherType: 'BTech',
    workDescription: '', equipment: '',
    hasSpecialConditions: 'No',
    specialConditionTypes: [],
    otherSpecialCondition: '',
    specialInstructions: '',
    consultantClientName: '',
    consultantProjectTitle: '',
    consultantAmountPaid: '',
    consultantTransactionNo: '',
    consultantTransactionDate: '',
};

type ViewState = 'HOME' | 'BOOKING' | 'CONTACT' | 'EXPERIMENTS' | 'RESEARCH' | 'CONSULTANCY' | 'SAFETY' | 'TERMS' | 'PUBLICATIONS';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>('HOME');
    const [previousView, setPreviousView] = useState<ViewState>('HOME');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
    const [formData, setFormData] = useState<(FormData & { selectedSlots: SelectedSlot[] }) | null>(null);
    const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>(ApprovalStatus.PENDING_SUPERVISOR);
    const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
    
    // Using Ref for status to avoid closure issues in simulated email callbacks
    const statusRef = useRef<ApprovalStatus>(ApprovalStatus.PENDING_SUPERVISOR);
    const formDataRef = useRef<(FormData & { selectedSlots: SelectedSlot[] }) | null>(null);

    useEffect(() => {
        statusRef.current = approvalStatus;
    }, [approvalStatus]);

    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);

    // Form Draft State to preserve typed input
    const [draftFormData, setDraftFormData] = useState<Omit<FormData, 'commencement' | 'completion' | 'preferredTime'>>(initialFormDraft);

    // Safety & Terms Tracking
    const [hasReadSafety, setHasReadSafety] = useState(false);
    const [hasReadTerms, setHasReadTerms] = useState(false);

    // Email Simulation State
    const [sentEmails, setSentEmails] = useState<EmailData[]>([]);

    const handleDismissEmail = (id: string) => {
        setSentEmails(prev => prev.filter(e => e.id !== id));
    };

    const handleReject = useCallback(() => {
        const currentData = formDataRef.current;
        if (!currentData) return;
        setApprovalStatus(ApprovalStatus.REJECTED);
        addSimulatedEmail(
            currentData.email,
            `REJECTED: Lab Booking Request`,
            `Dear ${currentData.name},\n\nWe regret to inform you that your request for lab utilization has been rejected. Please contact the Lab In-charge for further details.`
        );
    }, []);

    const performApprovalStep = useCallback((fromLevel: ApprovalStatus) => {
        const currentData = formDataRef.current;
        if (!currentData) return;

        const submissionDetails = formatSubmissionDetails(currentData);

        if (fromLevel === ApprovalStatus.PENDING_SUPERVISOR) {
            setApprovalStatus(ApprovalStatus.PENDING_INCHARGE);
            addSimulatedEmail(
                LAB_INCHARGE.email,
                `Action Required: Lab Approval for ${currentData.name}`,
                `Dear ${LAB_INCHARGE.name},\n\nSupervisor ${currentData.supervisor} has approved the lab utilization request from ${currentData.name}. Your final approval is now required.${submissionDetails}`,
                {
                    onApprove: () => performApprovalStep(ApprovalStatus.PENDING_INCHARGE),
                    onReject: handleReject,
                    label: 'Lab In-charge'
                }
            );
        } else if (fromLevel === ApprovalStatus.PENDING_INCHARGE) {
            const isOvernightOrWeekend = currentData.selectedSlots.some(slot => 
                slot.type === 'Overnight' || 
                slot.day === 'Saturday' || 
                slot.day === 'Sunday'
            );
            const isConsultancy = currentData.researcherType === 'Consultant';

            if (isOvernightOrWeekend || isConsultancy) {
                setApprovalStatus(ApprovalStatus.PENDING_HOD);
                addSimulatedEmail(
                    HOD.email,
                    `Action Required: Program Director Approval for ${currentData.name}`,
                    `Dear ${HOD.name},\n\nThis special request (Consultancy/Overnight/Weekend) from ${currentData.name} (PRN: ${currentData.prn}) has been approved by the Supervisor and Lab In-charge. Your final sanction is required.${submissionDetails}`,
                    {
                        onApprove: () => performApprovalStep(ApprovalStatus.PENDING_HOD),
                        onReject: handleReject,
                        label: 'Program Director'
                    }
                );
            } else {
                setApprovalStatus(ApprovalStatus.APPROVED);
                addSimulatedEmail(
                    currentData.email,
                    `CONFIRMED: Lab Booking Approved`,
                    `Dear ${currentData.name},\n\nYour request for ${currentData.selectedSlots[0].type} on ${currentData.selectedSlots[0].date} has been fully approved. Please follow all safety protocols.${submissionDetails}`
                );
            }
        } else if (fromLevel === ApprovalStatus.PENDING_HOD) {
            setApprovalStatus(ApprovalStatus.APPROVED);
            addSimulatedEmail(
                currentData.email,
                `CONFIRMED: Lab Booking Approved (Special Request)`,
                `Dear ${currentData.name},\n\nYour special request has been sanctioned by the Program Director. Your booking for ${currentData.selectedSlots[0].date} is now confirmed.${submissionDetails}`
            );
        }
    }, [handleReject]);

    const addSimulatedEmail = (to: string, subject: string, body: string, actions?: EmailData['actions']) => {
        const newEmail: EmailData = {
            id: Math.random().toString(36).substr(2, 9),
            from: 'ctl@mitwpu.edu.in',
            to,
            subject,
            body,
            timestamp: new Date(),
            actions
        };
        setSentEmails(prev => [...prev, newEmail]);
        
        const timeout = actions ? 20000 : 10000;
        setTimeout(() => {
            setSentEmails(prev => prev.filter(e => e.id !== newEmail.id));
        }, timeout);
    };

    const handleStartBooking = () => {
        setView('BOOKING');
        window.scrollTo(0, 0);
    };

    const handleContactClick = () => {
        setView('CONTACT');
        window.scrollTo(0, 0);
    };

    const handleViewExperiments = () => {
        setView('EXPERIMENTS');
        window.scrollTo(0, 0);
    };

    const handleViewResearch = () => {
        setView('RESEARCH');
        window.scrollTo(0, 0);
    };

    const handleViewConsultancy = () => {
        setView('CONSULTANCY');
        window.scrollTo(0, 0);
    };

    const handleViewSafety = () => {
        setHasReadSafety(true);
        setPreviousView(view);
        setView('SAFETY');
        window.scrollTo(0, 0);
    };

    const handleViewTerms = () => {
        setHasReadTerms(true);
        setPreviousView(view);
        setView('TERMS');
        window.scrollTo(0, 0);
    };

    const handleViewAllPublications = () => {
        setView('PUBLICATIONS');
        window.scrollTo(0, 0);
    };

    const handleReset = useCallback(() => {
        setFormSubmitted(false);
        setFormData(null);
        setSelectedSlots([]);
        setApprovalStatus(ApprovalStatus.PENDING_SUPERVISOR);
        setHasReadSafety(false);
        setHasReadTerms(false);
        setDraftFormData(initialFormDraft);
    }, []);

    const handleBackToHome = useCallback(() => {
        // Simplified always return home as per user request
        handleReset();
        setView('HOME');
        setPreviousView('HOME');
        window.scrollTo(0, 0);
    }, [handleReset]);

    const handleGoBack = useCallback(() => {
        if (view === 'SAFETY' || view === 'TERMS') {
            setView(previousView);
        } else {
            handleBackToHome();
        }
        window.scrollTo(0, 0);
    }, [view, previousView, handleBackToHome]);

    const handleSlotSelect = useCallback((slots: SelectedSlot[]) => {
        setSelectedSlots(slots);
        setTimeout(() => {
             document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }, []);

    const handleClearSelection = useCallback(() => {
        setSelectedSlots([]);
    }, []);

    const handleSubmit = useCallback((data: Omit<FormData, 'commencement' | 'completion' | 'preferredTime'>) => {
        if (selectedSlots.length === 0) return;

        setIsSubmitting(true);
        setTimeout(() => {
            const fullFormData = { ...data, selectedSlots };
            setFormData(fullFormData);
            setApprovalStatus(ApprovalStatus.PENDING_SUPERVISOR);
            setFormSubmitted(true);
            setIsSubmitting(false);
            
            setBookedSlots(prev => {
                const newBooked = new Set(prev);
                selectedSlots.forEach(slot => newBooked.add(getSlotKey(slot)));
                return newBooked;
            });

            const submissionDetails = formatSubmissionDetails(fullFormData);

            // Initial email to Supervisor
            addSimulatedEmail(
                data.supervisorEmail,
                `Action Required: Lab Approval for ${data.name}`,
                `Dear ${data.supervisor},\n\nStudent ${data.name} (PRN: ${data.prn}) has requested to use the Concrete Technology Lab for ${selectedSlots[0].type} on ${selectedSlots[0].date}. Please review and approve this request.${submissionDetails}`,
                {
                    onApprove: () => performApprovalStep(ApprovalStatus.PENDING_SUPERVISOR),
                    onReject: () => handleReject(),
                    label: 'Supervisor'
                }
            );

            window.scrollTo(0, 0);
        }, 1000);
    }, [selectedSlots, handleReject, performApprovalStep]);

    const renderView = () => {
        if (view === 'HOME') {
            return (
              <LandingPage 
                onStartBooking={handleStartBooking} 
                onContactClick={handleContactClick} 
                onViewExperiments={handleViewExperiments}
                onViewResearch={handleViewResearch}
                onViewConsultancy={handleViewConsultancy}
                onViewAllPublications={handleViewAllPublications}
              />
            );
        }

        const isSafetyOrTerms = view === 'SAFETY' || view === 'TERMS';
        const backButton = (
            <button 
                onClick={handleGoBack}
                className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                {isSafetyOrTerms && previousView === 'BOOKING' ? 'Back to Booking' : 'Back to Home'}
            </button>
        );

        if (view === 'CONTACT') {
            return (
                <div className="animate-fade-in">
                    {backButton}
                    <ContactPage />
                </div>
            );
        }

        if (view === 'EXPERIMENTS') {
            return (
                <div className="animate-fade-in">
                    {backButton}
                    <ExperimentsPage onBookSlot={handleStartBooking} />
                </div>
            );
        }

        if (view === 'RESEARCH') {
            return (
                <div className="animate-fade-in">
                    {backButton}
                    <ResearchPage onBookSlot={handleStartBooking} />
                </div>
            );
        }

        if (view === 'CONSULTANCY') {
            return (
                <div className="animate-fade-in">
                    {backButton}
                    <ConsultancyPage onBookSlot={handleStartBooking} />
                </div>
            );
        }

        if (view === 'SAFETY') {
            return (
                <div className="animate-fade-in">
                    {backButton}
                    <SafetyPage />
                </div>
            );
        }

        if (view === 'TERMS') {
            return (
                <div className="animate-fade-in">
                    {backButton}
                    <TermsPage />
                </div>
            );
        }

        if (view === 'PUBLICATIONS') {
            return (
                <div className="animate-fade-in">
                    {backButton}
                    <PublicationsPage />
                </div>
            );
        }

        return (
            <div className="animate-fade-in">
                {backButton}

                {formSubmitted && formData ? (
                    <ApprovalStatusDisplay 
                        formData={formData} 
                        status={approvalStatus}
                        onApprove={performApprovalStep}
                        onReject={handleReject}
                        onReset={handleReset}
                    />
                ) : (
                    <>
                        <CalendarView 
                            onSlotSelect={handleSlotSelect} 
                            selectedSlots={selectedSlots}
                            bookedSlots={bookedSlots}
                        />
                        <div id="form-section">
                            {selectedSlots.length > 0 && (
                                <Form 
                                    onSubmit={handleSubmit} 
                                    isSubmitting={isSubmitting} 
                                    selectedSlots={selectedSlots}
                                    onClearSelection={handleClearSelection}
                                    onViewSafety={handleViewSafety}
                                    onViewTerms={handleViewTerms}
                                    hasReadSafety={hasReadSafety}
                                    hasReadTerms={hasReadTerms}
                                    formData={draftFormData}
                                    setFormData={setDraftFormData}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <main className="container mx-auto p-4 md:p-8 max-w-7xl">
                {view !== 'HOME' && <Header onHomeClick={handleBackToHome} />}
                {renderView()}
            </main>
            {/* Email Notification Overlay */}
            <EmailToast emails={sentEmails} onDismiss={handleDismissEmail} />
        </div>
    );
};

export default App;