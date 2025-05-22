import { useState } from "react";
import { isSameDay, format } from "date-fns";
import Event from "./Event";
import { FiClock, FiX } from "react-icons/fi";
import clsx from "clsx";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView({ days, events }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleShowMore = (day, dayEvents) => {
    setSelectedDay(day);
    setSelectedEvents(dayEvents);
    setShowModal(true);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-300 rounded-lg overflow-hidden">
        {/* Weekday headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-gray-100 p-2 text-center font-medium text-gray-700"
          >
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dayEvents = events.filter((event) =>
            isSameDay(event.date, day)
          );
          const first = dayEvents[0];
          const maxVisibleEvents = 1;
          const hasOverflow = dayEvents.length > maxVisibleEvents;

          return (
            <div
               key={day.toString()}
  className="relative bg-white p-1 min-h-24"
  style={{
    backgroundColor: isSameDay(day, new Date()) ? "#DBEAFE" : "white", // Tailwind's bg-blue-100
  }}
            >
              <div
                className={`text-center p-1 ${
                  isSameDay(day, new Date()) ? " font-bold" : "text-gray-700"
                }`}
              >
                {format(day, "d")}
              </div>

              <div className="space-y-1 max-h-20 overflow-y-auto mt-1">
                {dayEvents.slice(0, maxVisibleEvents).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleViewDetails(event)}
                    className="cursor-pointer"
                  >
                    <Event event={event} />
                  </div>
                ))}

                {hasOverflow && (
                  <button
                    onClick={() => handleShowMore(day, dayEvents)}
                    className="text-xs px-2 text-blue-500 hover:underline w-full text-left"
                  >
                    {dayEvents.length - maxVisibleEvents} more
                  </button>
                )}
              </div>

              {first && (
                <span
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                  style={{ backgroundColor: first.color }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Events List Modal */}
      {showModal && !selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {format(selectedDay, "EEEE, d MMMM")}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewDetails(event)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">
                        {event.title || "(No title)"}
                      </div>
                      {event.startTime && (
                        <div className="text-sm text-gray-600 mt-1 flex items-center">
                          <FiClock className="mr-1" />
                          {event.startTime}{" "}
                          {event.endTime && `- ${event.endTime}`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Event Details</h3>
              <button
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="mb-4">
              <div className="text-xl font-bold mb-2">
                {selectedEvent.title || "(No title)"}
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <FiClock className="mr-2" />
                <div>
                  {format(selectedEvent.date, "EEEE, d MMMM")}
                  {selectedEvent.startTime && (
                    <span>
                      {" · "}
                      {selectedEvent.startTime}
                      {selectedEvent.endTime && ` - ${selectedEvent.endTime}`}
                    </span>
                  )}
                </div>
              </div>

              {selectedEvent.description && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Description
                  </div>
                  <div className="text-gray-700">
                    {selectedEvent.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
