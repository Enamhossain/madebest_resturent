import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../shared/Footer/Footer'
import Navbar from '../shared/Navbar/Navbar'

function Main() {
  const location = useLocation()
  const hideHeaderFooter = location.pathname.includes('login') ||  location.pathname.includes('signup')
  
  return (
    <div>
      {!hideHeaderFooter && <Navbar />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </div>
  )
}

export default Main
