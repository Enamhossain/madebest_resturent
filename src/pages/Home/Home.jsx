
import React, { Suspense, memo } from 'react'
import { Helmet } from 'react-helmet-async'
import Loading from '../../Component/Loading'
import Banner from './Banner/Banner'

// Lazy load non-critical components
const Category = React.lazy(() => import('./Category/Category'))
const Discount = React.lazy(() => import('./Discount/Discount'))
const DiseMenu = React.lazy(() => import('./Menu/DiseMenu'))
const Service = React.lazy(() => import('./Service/Service'))
const Tastomonial = React.lazy(() => import('./Tastomonial/Tastomonial'))

function Home() {
  return (
   <div>
      <Helmet>
        <title>Home | MadeBest</title>
      </Helmet>

      <Banner/>
      <Suspense fallback={<Loading />}>
        <Category/>
        <Discount/>
        <DiseMenu/>
        <Service/>
        <Tastomonial/>
      </Suspense>
   </div>
  )
}
export default memo(Home)