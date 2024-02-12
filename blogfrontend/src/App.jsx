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
import PrivateRoute from './components/PrivateRoute'
import PrivateRouteForAdmin from './components/PrivateRouteForAdmin'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />

    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      
      <Route element={<PrivateRoute />} >
      <Route path='/dashboard' element={<Dashboard />} />
      </Route>

      <Route element={<PrivateRouteForAdmin />} >
      </Route>

      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/projects' element={<Projects/>} />
      <Route path='/about' element={<About />} />


    {/* to be put in admin protected routes */}
      <Route path='/updatepost/:postId' element={<UpdatePost />} />
      <Route path='/post/:postSlug' element={<PostPage />} />
      <Route path='/create-post' element={<CreatePost />} />
    </Routes>

    <FooterCom />
    </BrowserRouter>
  )
}

export default App