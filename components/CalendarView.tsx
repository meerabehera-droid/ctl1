import React, { useState, useEffect } from 'react';
import type { SelectedSlot } from '../types';

// Define the structure for a time slot
interface TimeSlot {
  time: string;
  type: 'Casting' | 'Testing' | 'Overnight';
}

// Define the schedule for each day based on user requirements
const schedule: { [day: string]: TimeSlot[] } = {
  Monday: [
    { time: '10:00 AM - 12:00 PM', type: 'Casting' },
    { time: '10:00 AM - 12:00 PM', type: 'Testing' },
    { time: '01:00 PM - 03:00 PM', type: 'Casting' },
    { time: '01:00 PM - 03:00 PM', type: 'Testing' },
    { time: '03:00 PM - 05:00 PM', type: 'Casting' },
    { time: '03:00 PM - 05:00 PM', type: 'Testing' },
    { time: '05:00 PM - 10:00 AM', type: 'Overnight' },
  ],
  Tuesday: [
    { time: '10:00 AM - 12:00 PM', type: 'Casting' },
    { time: '10:00 AM - 12:00 PM', type: 'Testing' },
    { time: '01:00 PM - 03:00 PM', type: 'Casting' },
    { time: '01:00 PM - 03:00 PM', type: 'Testing' },
    { time: '03:00 PM - 05:00 PM', type: 'Casting' },
    { time: '03:00 PM - 05:00 PM', type: 'Testing' },
    { time: '05:00 PM - 10:00 AM', type: 'Overnight' },
  ],
  Wednesday: [
    { time: '10:00 AM - 12:00 PM', type: 'Casting' },
    { time: '10:00 AM - 12:00 PM', type: 'Testing' },
    { time: '01:00 PM - 03:00 PM', type: 'Casting' },
    { time: '01:00 PM - 03:00 PM', type: 'Testing' },
    { time: '03:00 PM - 05:00 PM', type: 'Casting' },
    { time: '03:00 PM - 05:00 PM', type: 'Testing' },
    { time: '05:00 PM - 10:00 AM', type: 'Overnight' },
  ],
  Thursday: [
    { time: '10:00 AM - 12:00 PM', type: 'Casting' },
    { time: '10:00 AM - 12:00 PM', type: 'Testing' },
    { time: '01:00 PM - 03:00 PM', type: 'Casting' },
    { time: '01:00 PM - 03:00 PM', type: 'Testing' },
    { time: '03:00 PM - 05:00 PM', type: 'Casting' },
    { time: '03:00 PM - 05:00 PM', type: 'Testing' },
    { time: '05:00 PM - 10:00 AM', type: 'Overnight' },
  ],
  Friday: [
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{dayName}, {formattedDate}</h3>
                        <p className="text-xs text-gray-500">Select consecutive slots if needed</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 mb-4">
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
                        
                        let className = `w-full text-left p-3 rounded-lg border-l-4 transition-colors duration-200 flex justify-between items-center `;
                        if (isBooked) {
                            className += "bg-gray-200 border-gray-400 text-gray-500 cursor-not-allowed";
                        } else if (isSelected) {
                            className += colorConfig.selected;
                        } else {
                            className += `${colorConfig.base} ${colorConfig.hover}`;
                        }

                        if (isBooked) {
                            return (
                                <div key={index} className={className}>
                                    <div>
                                        <p className="font-semibold">{slot.type}</p>
                                        <p className="text-sm font-bold line-through">{slot.time}</p>
                                    </div>
                                    <span className="text-xs font-bold uppercase">Booked</span>
                                </div>
                            );
                        }

                        return (
                             <button key={index} onClick={() => handleSlotToggle(slot)} className={className}>
                                <div>
                                    <p className="font-semibold">{slot.type}</p>
                                    <p className="text-sm">{slot.time}</p>
                                </div>
                                {isSelected && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="pt-2 border-t flex justify-end gap-3">
                     <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                     <button 
                        onClick={() => onConfirm(selectedLocalSlots)} 
                        disabled={selectedLocalSlots.length === 0}
                        className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Confirm Selection ({selectedLocalSlots.length})
                     </button>
                </div>
            </div>
        </div>
    );
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