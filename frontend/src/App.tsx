import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
