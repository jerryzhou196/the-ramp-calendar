import './App.css'
import { YearCalendar } from './components/year-calendar'

function App() {

  return (
    <div className='w-full h-full'>
    <YearCalendar
    year={2026} events={[]}>
    </YearCalendar>
    </div>
  )
}

export default App
