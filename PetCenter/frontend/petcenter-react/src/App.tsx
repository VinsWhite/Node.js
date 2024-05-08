import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import NavbarComp from './components/NavbarComp'
import FooterComp from './components/FooterComp'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavbarComp />
          <Routes>
            <Route path='/' element={<Homepage />} />
          </Routes>
        <FooterComp />
      </BrowserRouter>
    </>
  )
}

export default App
