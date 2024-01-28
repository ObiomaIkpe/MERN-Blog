import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Header from './components/Header'
import FooterCom from './components/Footer'

function App() {
  return (
    <BrowserRouter>

    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/projects' element={<Projects/>} />
      <Route path='/about' element={<About />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    <FooterCom />
    </BrowserRouter>
  )
}

export default App