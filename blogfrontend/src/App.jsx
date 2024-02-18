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
import Search from './pages/Search'

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

    {/* admin protected routes */}
      <Route element={<PrivateRouteForAdmin />} >
      <Route path='/create-post' element={<CreatePost />} />
      <Route path='/updatepost/:postId' element={<UpdatePost />} />
      </Route>

      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/search' element={<Search />} />
      <Route path='/projects' element={<Projects/>} />
      <Route path='/about' element={<About />} />
      <Route path='/post/:postSlug' element={<PostPage />} />
    </Routes>

    <FooterCom />
    </BrowserRouter>
  )
}

export default App