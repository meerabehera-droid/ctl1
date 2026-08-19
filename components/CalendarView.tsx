import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { SelectedSlot } from '../types';

// Define the structure for a time slot
interface TimeSlot {
  time: string;
  type: 'Casting' | 'Testing' | 'Overnight';
}

// Define the schedule for each day based on user requirements
const schedule: { [day: string]: TimeSlot[] } = {
  Monday: [
    { time: '08:00 AM - 10:00 AM', type: 'Casting' },
    { time: '08:00 AM - 10:00 AM', type: 'Testing' },
    { time: '10:00 AM - 12:00 PM', type: 'Casting' },
    { time: '10:00 AM - 12:00 PM', type: 'Testing' },
    { time: '01:00 PM - 03:00 PM', type: 'Casting' },
    { time: '01:00 PM - 03:00 PM', type: 'Testing' },
    { time: '03:00 PM - 05:00 PM', type: 'Casting' },
    { time: '03:00 PM - 05:00 PM', type: 'Testing' },
    { time: '05:00 PM - 10:00 AM', type: 'Overnight' },
  ],
  Tuesday: [
    { time: '08:00 AM - 10:00 AM', type: 'Casting' },
    { time: '08:00 AM - 10:00 AM', type: 'Testing' },
    { time: '10:00 AM - 12:00 PM', type: 'Casting' },
    { time: '10:00 AM - 12:00 PM', type: 'Testing' },
    { time: '01:00 PM - 03:00 PM', type: 'Casting' },
    { time: '01:00 PM - 03:00 PM', type: 'Testing' },
    { time: '03:00 PM - 05:00 PM', type: 'Casting' },
    { time: '03:00 PM - 05:00 PM', type: 'Testing' },
    { time: '05:00 PM - 10:00 AM', type: 'Overnight' },
  ],
  Wednesday: [
    { time: '08:00 AM - 10:00 AM', type: 'Casting' },
    { time: '08:00 AM - 10:00 AM', type: 'Testing' },
    { time: '10:00 AM - 12:00 PM', type: 'Casting' },
    { time: '10:00 AM - 12:00 PM', type: 'Testing' },
    { time: '01:00 PM - 03:00 PM', type: 'Casting' },
    { time: '01:00 PM - 03:00 PM', type: 'Testing' },
    { time: '03:00 PM - 05:00 PM', type: 'Casting' },
    { time: '03:00 PM - 05:00 PM', type: 'Testing' },
    { time: '05:00 PM - 10:00 AM', type: 'Overnight' },
  ],
  Thursday: [
    { time: '08:00 AM - 10:00 AM', type: 'Casting' },
    { time: '08:00 AM - 10:00 AM', type: 'Testing' },
    { time: '10:00 AM - 12:00 PM', type: 'Casting' },
    { time: '10:00 AM - 12:00 PM', type: 'Testing' },
    { time: '01:00 PM - 03:00 PM', type: 'Casting' },
    { time: '01:00 PM - 03:00 PM', type: 'Testing' },
    { time: '03:00 PM - 05:00 PM', type: 'Casting' },
    { time: '03:00 PM - 05:00 PM', type: 'Testing' },
    { time: '05:00 PM - 10:00 AM', type: 'Overnight' },
  ],
  Friday: [
    { time: '08:00 AM - 10:00 AM', type: 'Casting' },
    { time: '08:00 AM - 10:00 AM', type: 'Testing' },
    { time: '10:00 AM - 12:00 PM', type: 'Casting' },
    { time: '10:00 AM - 12:00 PM', type: 'Testing' },
    { time: '01:00 PM - 03:00 PM', type: 'Casting' },
    { time: '01:00 PM - 03:00 PM', type: 'Testing' },
    { time: '03:00 PM - 05:00 PM', type: 'Casting' },
    { time: '03:00 PM - 05:00 PM', type: 'Testing' },
    { time: '05:00 PM - 10:00 AM', type: 'Overnight' },
  ],
  Saturday: [
    { time: '24 Hours Available', type: 'Casting' },
    { time: '24 Hours Available', type: 'Testing' },
  ],
  Sunday: [
    { time: '24 Hours Available', type: 'Casting' },
    { time: '24 Hours Available', type: 'Testing' },
  ],
};

const slotColors = {
  Casting: {
    base: 'bg-blue-100 border-blue-500 text-blue-800',
    hover: 'hover:bg-blue-200 hover:border-blue-600',
    selected: 'bg-blue-600 border-blue-700 text-white',
  },
  Testing: {
    base: 'bg-orange-100 border-orange-500 text-orange-800',
    hover: 'hover:bg-orange-200 hover:border-orange-600',
    selected: 'bg-orange-600 border-orange-700 text-white',
  },
  Overnight: {
    base: 'bg-gray-100 border-gray-500 text-gray-800',
    hover: 'hover:bg-gray-200 hover:border-gray-600',
    selected: 'bg-gray-700 border-gray-800 text-white',
  },
};

// Helper to create a unique identifier for a slot
const getSlotKey = (slot: SelectedSlot): string => {
    return `${slot.date}-${slot.time}-${slot.type}`;
};

interface CalendarViewProps {
    onSlotSelect: (slots: SelectedSlot[]) => void;
    selectedSlots: SelectedSlot[];
    bookedSlots: Set<string>;
}

const SlotSelectionModal: React.FC<{
    date: Date;
    slots: TimeSlot[];
    onConfirm: (slots: SelectedSlot[]) => void;
    onClose: () => void;
    bookedSlots: Set<string>;
}> = ({ date, slots, onConfirm, onClose, bookedSlots }) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const [selectedLocalSlots, setSelectedLocalSlots] = useState<SelectedSlot[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [onClose]);

    const handleSlotToggle = (slot: TimeSlot) => {
        const slotData: SelectedSlot = {
            day: dayName,
            date: formattedDate,
            time: slot.time,
            type: slot.type
        };

        const isAlreadySelected = selectedLocalSlots.some(s => s.time === slot.time && s.type === slot.type);

        if (isAlreadySelected) {
            setSelectedLocalSlots(prev => prev.filter(s => !(s.time === slot.time && s.type === slot.type)));
        } else {
            // Check if mixed types
            if (selectedLocalSlots.length > 0 && selectedLocalSlots[0].type !== slot.type) {
                alert("You can only select multiple slots of the same type (e.g., all Casting or all Testing) for a single booking.");
                return;
            }
            setSelectedLocalSlots(prev => [...prev, slotData]);
        }
    };

    const modalContent = (
        <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-[99999] p-4 overflow-y-auto" 
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto my-auto relative z-10 border border-gray-100 animate-fade-in" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{dayName}, {formattedDate}</h3>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Select consecutive slots if needed</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors text-2xl leading-none"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                
                <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 mb-5">
                    {slots.map((slot, index) => {
                        const slotData: SelectedSlot = {
                            day: dayName,
                            date: formattedDate,
                            time: slot.time,
                            type: slot.type
                        };
                        const key = getSlotKey(slotData);
                        const isBooked = bookedSlots.has(key);
                        const isSelected = selectedLocalSlots.some(s => s.time === slot.time && s.type === slot.type);
                        const colorConfig = slotColors[slot.type];
                        
                        let className = `w-full text-left p-3.5 rounded-xl border-l-4 transition-all duration-200 flex justify-between items-center shadow-sm `;
                        if (isBooked) {
                            className += "bg-gray-100 border-gray-400 text-gray-400 cursor-not-allowed opacity-75";
                        } else if (isSelected) {
                            className += `${colorConfig.selected} shadow-md scale-[1.01]`;
                        } else {
                            className += `${colorConfig.base} ${colorConfig.hover} hover:shadow`;
                        }

                        if (isBooked) {
                            return (
                                <div key={index} className={className}>
                                    <div>
                                        <p className="font-bold text-sm">{slot.type}</p>
                                        <p className="text-xs font-semibold line-through opacity-80">{slot.time}</p>
                                    </div>
                                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-gray-200 text-gray-600 rounded">Booked</span>
                                </div>
                            );
                        }

                        return (
                             <button key={index} onClick={() => handleSlotToggle(slot)} className={className}>
                                <div>
                                    <p className="font-bold text-sm">{slot.type}</p>
                                    <p className="text-xs font-medium">{slot.time}</p>
                                </div>
                                {isSelected && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-end gap-3">
                     <button 
                        onClick={onClose} 
                        className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                     >
                        Cancel
                     </button>
                     <button 
                        onClick={() => onConfirm(selectedLocalSlots)} 
                        disabled={selectedLocalSlots.length === 0}
                        className="px-5 py-2.5 text-sm bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md transition-all"
                    >
                        Confirm Selection ({selectedLocalSlots.length})
                     </button>
                </div>
            </div>
        </div>
    );

    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};


const CalendarView: React.FC<CalendarViewProps> = ({ onSlotSelect, selectedSlots, bookedSlots }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [modalData, setModalData] = useState<{ date: Date; slots: TimeSlot[] } | null>(null);

    const handleSlotSelectionInModal = (slots: SelectedSlot[]) => {
        onSlotSelect(slots);
        setModalData(null);
    };
    
    const renderHeader = () => {
        const monthYearFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' });
        return (
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                    {monthYearFormat.format(currentDate)}
                </h3>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        );
    };

    const renderDaysOfWeek = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500 mb-2">
                {days.map(day => <div key={day}>{day}</div>)}
            </div>
        );
    };

    const renderCalendarGrid = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const cells = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push(<div key={`pad-start-${i}`} className="p-2 rounded-lg"></div>);
        }

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = new Date().toDateString() === date.toDateString();
            
            // Check if any slot on this date is selected
            const formattedDateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const isSelected = selectedSlots.some(s => s.date === formattedDateStr);
            
            const handleDayClick = () => {
                const dayName = dayNames[date.getDay()];
                setModalData({ date, slots: schedule[dayName] });
            };

            cells.push(
                <div key={day} className="relative">
                    <button 
                        onClick={handleDayClick}
                        className={`w-full h-12 text-center rounded-lg transition-colors duration-200 border ${isSelected ? 'bg-blue-600 text-white border-blue-700 font-bold' : isToday ? 'bg-blue-100 border-blue-300' : 'bg-white hover:bg-gray-100 border-gray-200'}`}
                    >
                        {day}
                    </button>
                </div>
            );
        }

        while (cells.length % 7 !== 0) {
             cells.push(<div key={`pad-end-${cells.length}`} className="p-2 rounded-lg"></div>);
        }

        return <div className="grid grid-cols-7 gap-1">{cells}</div>;
    };

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Step 1: Select Date & Slots</h2>
          <p className="mb-6 text-gray-600">
            Click on a date to view available slots. You can select multiple consecutive slots for a single request (must be of the same type).
          </p>
          {renderHeader()}
          {renderDaysOfWeek()}
          {renderCalendarGrid()}
          
          {modalData && (
              <SlotSelectionModal 
                date={modalData.date}
                slots={modalData.slots}
                onConfirm={handleSlotSelectionInModal}
                onClose={() => setModalData(null)}
                bookedSlots={bookedSlots}
              />
          )}
        </div>
      );
};

export default CalendarView;