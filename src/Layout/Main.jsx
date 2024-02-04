import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../shared/Footer/Footer'
import Navbar from '../shared/Navbar/Navbar'

function Main() {
  return (
    <div>
         <Navbar/>
        <Outlet></Outlet>
        <Footer></Footer>

    </div>
  )
}

export default Main