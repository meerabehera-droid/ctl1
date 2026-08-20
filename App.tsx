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
import { submitBooking, getBookingStatus, fetchBookedSlotKeys, isLive, type StatusCode } from './services/bookingService';

// Maps the backend's status code onto the local enum
const CODE_TO_STATUS: Record<StatusCode, ApprovalStatus> = {
    PENDING_SUPERVISOR: ApprovalStatus.PENDING_SUPERVISOR,
    PENDING_INCHARGE: ApprovalStatus.PENDING_INCHARGE,
    PENDING_HOD: ApprovalStatus.PENDING_HOD,
    APPROVED: ApprovalStatus.APPROVED,
    REJECTED: ApprovalStatus.REJECTED,
};

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

    const [sentEmails, setSentEmails] = useState<EmailData[]>([]);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleDismissEmail = (id: string) => {
        setSentEmails(prev => prev.filter(e => e.id !== id));
    };

    const addNotice = (to: string, subject: string, body: string) => {
        const notice: EmailData = {
            id: Math.random().toString(36).slice(2, 11),
            from: 'ctl@mitwpu.edu.in',
            to,
            subject,
            body,
            timestamp: new Date(),
        };
        setSentEmails(prev => [...prev, notice]);
        setTimeout(() => setSentEmails(prev => prev.filter(e => e.id !== notice.id)), 12000);
    };

    // Real approvals happen over email now, so the app polls for the outcome.
    useEffect(() => {
        if (!formSubmitted || !bookingId || !isLive) return;
        if (approvalStatus === ApprovalStatus.APPROVED || approvalStatus === ApprovalStatus.REJECTED) return;

        const tick = async () => {
            const result = await getBookingStatus(bookingId);
            if (result.ok && result.code) setApprovalStatus(CODE_TO_STATUS[result.code]);
        };
        const timer = setInterval(tick, 20000);
        return () => clearInterval(timer);
    }, [formSubmitted, bookingId, approvalStatus]);

    // Slots already taken by other people, loaded from the server.
    useEffect(() => {
        if (!isLive) return;
        fetchBookedSlotKeys().then(keys => {
            if (keys.length) setBookedSlots(prev => new Set([...prev, ...keys]));
        });
    }, []);

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

    const handleSubmit = useCallback(async (data: Omit<FormData, 'commencement' | 'completion' | 'preferredTime'>) => {
        if (selectedSlots.length === 0) return;

        setIsSubmitting(true);
        setSubmitError(null);

        const fullFormData = { ...data, selectedSlots };
        const result = await submitBooking(fullFormData as any);

        setIsSubmitting(false);

        if (!result.ok) {
            setSubmitError(result.error || 'Could not submit your request. Please try again.');
            return;
        }

        setBookingId(result.id ?? null);
        setFormData(fullFormData);
        setApprovalStatus(result.code ? CODE_TO_STATUS[result.code] : ApprovalStatus.PENDING_SUPERVISOR);
        setFormSubmitted(true);

        setBookedSlots(prev => {
            const newBooked = new Set(prev);
            selectedSlots.forEach(slot => newBooked.add(getSlotKey(slot)));
            return newBooked;
        });

        addNotice(
            data.supervisorEmail,
            `Action Required: Lab Approval for ${data.name}`,
            `An approval request has been emailed to ${data.supervisor}. You will be notified by email at every stage.` +
            (result.id ? `\n\nReference: ${result.id}` : '')
        );

        window.scrollTo(0, 0);
    }, [selectedSlots]);

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
                        bookingId={bookingId}
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
                            {submitError && (
                                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                    <h3 className="font-semibold text-red-800">Submission failed</h3>
                                    <p className="text-sm text-red-700 mt-1">{submitError}</p>
                                </div>
                            )}
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