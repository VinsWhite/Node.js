import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import NotFoundPage from "./pages/NotFoundPage"
import NavbarComp from "./components/NavbarComp"

function App() {

  return (
    <>
      <BrowserRouter>
      <NavbarComp />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
