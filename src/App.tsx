import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Favotites } from './pages/Favotites'
import { TimeLine } from './pages/TimeLine'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TimeLine itemsPerPage={10} />} />
        <Route path="/favorites" element={<Favotites />} />
      </Routes>
    </div>
  )
}

export default App
