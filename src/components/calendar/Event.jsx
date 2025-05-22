export default function Event({ event }) {
 
  const timeToMinutes = (timeStr) => {
    if (!timeStr) return Infinity;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatTimeRange = () => {
    if (!event.startTime && !event.endTime) return null;
    if (!event.endTime) return `Starts at ${event.startTime}`;
    if (!event.startTime) return `Ends at ${event.endTime}`;
    
    const startMins = timeToMinutes(event.startTime);
    const endMins = timeToMinutes(event.endTime);
    
    if (endMins < startMins) {
      return `${event.startTime} → ${event.endTime} (next day)`;
    }
    
    return `${event.startTime} - ${event.endTime}`;
  };

  return (
    <div 
      className="text-xs ms-1 p-1 rounded-md text-white truncate mb-1"
      style={{ 
        backgroundColor: event.color || '#3b82f6',
        borderLeft: `3px solid ${darkenColor(event.color || '#3b82f6', 20)}`
      }}
    >
      <div className="font-medium">{event.title || '(No title)'}</div>
      <div className="opacity-90">{formatTimeRange()}</div>
    </div>
  );
}

function darkenColor(color, percent) {
  return color; 
}