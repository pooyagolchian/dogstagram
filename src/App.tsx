import { Route, Routes } from 'react-router-dom'
import { Favotites } from './pages/Favotites'
import { TimeLine } from './pages/TimeLine'

import { DogDetails } from './pages/DogDetails/_id'
import { Header } from './components/Header'

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<TimeLine itemsPerPage={10} />} />
        <Route path="/favorites" element={<Favotites />} />
        <Route path="/dog/:id" element={<DogDetails />} />
      </Routes>
    </div>
  )
}
