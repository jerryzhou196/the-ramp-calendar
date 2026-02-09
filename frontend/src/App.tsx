import './App.css'
import { YearCalendar } from './components/year-calendar'

function App() {

  return (
    <div className='w-full h-full' style={{ zoom: 1.3 }}>
    <YearCalendar
    year={2026} events={[]}>
    </YearCalendar>
    </div>
  )
}

export default App
