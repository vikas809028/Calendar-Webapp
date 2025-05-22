import Calendar from './components/calendar/Calendar'
import events  from './data/events'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Calendar events={events} />
    </div>
  )
}

export default App