import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { TimeLine } from './pages/TimeLine'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TimeLine />} />
      </Routes>
    </div>
  )
}

export default App
