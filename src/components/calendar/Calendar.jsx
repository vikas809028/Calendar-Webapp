import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns';
import MonthView from './MonthView';
import AddEventModal from './AddEventModal';
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import { MdToday } from 'react-icons/md';

import initialEvents from '../../data/events';

export default function Calendar() {
  const [events, setEvents] = useState(
    initialEvents.map(e => ({ ...e, date: parseISO(e.date) }))
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [yearInput, setYearInput] = useState(format(currentDate, 'yyyy'));
  const [monthInput, setMonthInput] = useState(format(currentDate, 'MM'));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const navigateMonth = dir => {
    setCurrentDate(dir === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setYearInput(format(today, 'yyyy'));
    setMonthInput(format(today, 'MM'));
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    const newDate = new Date(`${yearInput}-${monthInput}-01`);
    if (!isNaN(newDate.getTime())) {
      setCurrentDate(newDate);
      setShowDatePicker(false);
    }
  };

  const handleAddEvent = newEvent => {
    setEvents(prev => [
      ...prev,
      {
        ...newEvent,
        id: Date.now(),
        date: parseISO(newEvent.date)
      }
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* toolbar */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToToday}
            className="flex items-center space-x-1 px-3 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            <MdToday className="text-blue-500" />
            <span>Today</span>
          </button>
          
          <div className="flex items-center">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="mx-1 px-3 py-1 text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-lg"
            >
              {format(currentDate, 'MMMM yyyy')}
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-1 px-4 py-2 bg-blue-500 rounded-lg text-sm font-medium text-white hover:bg-blue-600"
        >
          <FiPlus />
          <span>Add Event</span>
        </button>
      </div>

      {/* Date picker dropdown */}
      {showDatePicker && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <form onSubmit={handleDateSubmit} className="flex items-center gap-3">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Month</label>
              <select
                value={monthInput}
                onChange={(e) => setMonthInput(e.target.value)}
                className="border rounded p-2"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const monthNum = (i + 1).toString().padStart(2, '0');
                  return (
                    <option key={monthNum} value={monthNum}>
                      {format(new Date(2000, i, 1), 'MMMM')}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Year</label>
              <input
                type="number"
                value={yearInput}
                onChange={(e) => setYearInput(e.target.value)}
                className="border rounded p-2 w-24"
                min="1900"
                max="2100"
              />
            </div>
            <button
              type="submit"
              className="mt-5 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go
            </button>
          </form>
        </div>
      )}

      {/* month grid */}
      <MonthView days={monthDays} events={events} currentDate={currentDate} />

      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
}