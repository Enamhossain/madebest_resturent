import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../shared/Footer/Footer'
import Navbar from '../shared/Navbar/Navbar'

function Main() {
  const location = useLocation()
  const removeheaderfooter = location.pathname.includes('login') ||  location.pathname.includes('singup')
  return (
    <div>
        { removeheaderfooter || <Navbar/> }
        <Outlet></Outlet>
        { removeheaderfooter ||  <Footer></Footer> }

    </div>
  )
}

export default Main