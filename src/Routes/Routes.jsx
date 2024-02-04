import {createBrowserRouter} from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../pages/Home/Home"
import Ourmenu from "../pages/OurMenu/Ourmenu"

export const router = createBrowserRouter([
    {
       path:"/",
       element:<Main/>,
       children:[
         {
            path:'/',
            element:<Home/>
         },
         {
            path:'/ourmenu',
            element:<Ourmenu/>

         }

       ]
    }
])