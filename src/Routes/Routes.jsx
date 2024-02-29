import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Ourmenu from "../pages/OurMenu/Ourmenu";
import OurShop from "../pages/Order/OurShop";
import Login from "../pages/Login/Login";
import Singup from "../pages/Singup/Singup";
import PrivateRoute from './PrivateRoute';
import Secret from "../shared/Secret/Secret";

export const router = createBrowserRouter([
    {
       path: "/",
       element: <Main/>,
       children: [
         {
            path: "/",
            element: <Home/>
         },
         {
            path: "/ourmenu",
            element: <Ourmenu/>
         },
         {
            path: "/order",
            element: <OurShop/>
         },
         {
            path: "/login",
            element: <Login/>
         },
         {
            path: "/signup",
            element: <Singup/>
         },
         {
            path: '/secret',
            element: <PrivateRoute><Secret></Secret></PrivateRoute>
          }
       ]

    },

]);
