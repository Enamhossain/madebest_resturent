
import React from 'react'
import Banner from './Banner/Banner'
import Category from './Category/Category'
import Discount from './Discount/Discount'
import DiseMenu from './Menu/DiseMenu'
import Service from './Service/Service'
// import Contact from './Contact/Contact'
// import ReserverBooking from './Reserve/ReserverBooking'
import Tastomonial from './Tastomonial/Tastomonial'
import { Helmet } from 'react-helmet-async'



 function Home() {
  return (
   <div>
      <Helmet>
        <title>Home | MadeBest</title>
      </Helmet>

      <Banner/>
      <Category/>
      <Discount/>
      <DiseMenu/>
      {/* <ReserverBooking/> */}
      <Service/>
      <Tastomonial/>
      {/* <Contact/> */}
   </div>
  )
}
export default Home