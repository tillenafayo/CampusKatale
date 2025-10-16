import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
         {/* <Route path="/login" element={<LoginPage />} /> */}
        {/*<Route path="/signup" element={<SignupPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route path="/add-listing" element={<AddListingPage />} />
        <Route path="/chat/:userId" element={<ChatPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} /> */} 
      </Routes>
  )
}

export default App;
