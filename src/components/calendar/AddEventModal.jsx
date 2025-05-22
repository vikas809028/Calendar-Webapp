import { useState } from 'react';

export default function AddEventModal({ onClose, onAddEvent }) {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    color: '#3B82F6'
  });

  const colorOptions = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Yellow', value: '#F59E0B' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      ...eventData,
      id: Date.now(),
      time: `${eventData.startTime} - ${eventData.endTime}`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Add New Event</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={eventData.title}
              onChange={(e) => setEventData({...eventData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={eventData.date}
                onChange={(e) => setEventData({...eventData, date: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <div className="flex space-x-2">
                {colorOptions.map(color => (
                  <div 
                    key={color.value}
                    className={`w-6 h-6 rounded-full cursor-pointer ${eventData.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setEventData({...eventData, color: color.value})}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <div className="flex space-x-2">
              <input 
                type="time" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={eventData.startTime}
                onChange={(e) => setEventData({...eventData, startTime: e.target.value})}
                required
              />
              <span className="flex items-center text-gray-500">to</span>
              <input 
                type="time" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={eventData.endTime}
                onChange={(e) => setEventData({...eventData, endTime: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}