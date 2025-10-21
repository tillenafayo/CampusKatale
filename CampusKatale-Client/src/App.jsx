import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/*<Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/add-listing" element={<AddListingPage />} />
        <Route path="/chat/:userId" element={<ChatPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} /> */} 
      </Routes>
  )
}

export default App;
import {Routes, Route,} from "react-router-dom";

function App(){
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/marketplace" element={<Marketplace/>}/>
  </Routes>
}

export default App;
