import { Route, Routes } from 'react-router-dom'
import { Favotites } from './pages/Favotites'
import { TimeLine } from './pages/TimeLine'

import { DogDetails } from './pages/Dog/id'
import { Header } from './components/Header'

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<TimeLine itemsPerPage={10} />} />
        <Route path="/favorites" element={<Favotites />} />
        <Route path="/dog/info/:id" element={<DogDetails />} />
      </Routes>
    </div>
  )
}
