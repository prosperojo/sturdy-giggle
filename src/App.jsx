import React from 'react'
import NavBar from './components/NavBar'
import {Routes, Route } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import BlogPost from './pages/BlogPost'
import Home from './pages/Home'
import GetStarted from './pages/GetStarted'
import './css/App.css'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/CreatePost' element={<CreatePost />} />
        <Route path='/BlogPost' element={<BlogPost />} />
        <Route path='/SignUp' element={<GetStarted />} />
      </Routes>
    </div>
  )
}

export default App