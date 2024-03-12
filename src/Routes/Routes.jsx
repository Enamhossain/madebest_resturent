import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Ourmenu from "../pages/OurMenu/Ourmenu";
import OurShop from "../pages/Order/OurShop";
import Login from "../pages/Login/Login";
import Singup from "../pages/Singup/Singup";
import PrivateRoute from './PrivateRoute';
import Secret from "../shared/Secret/Secret";
import DashBoard from "../pages/Dashboard/DashBoard";
import General from "../pages/Dashboard/UserDashBoard/General/General";
import Contact from "../pages/Contact/Contact";
import ViewCart from "../Component/ViewCart";
import DsOrder from "../pages/Dashboard/UserDashBoard/order/DsOrder";
import Reservations from "../pages/Dashboard/UserDashBoard/Reservations/Reservations";
import CheckOrder from "../pages/Dashboard/UserDashBoard/CheckOrder/CheckOrder";
import AdminGenereal from "../pages/Dashboard/AdminDashBoard/General/AdminGenereal";
import AllOrders from "../pages/Dashboard/AdminDashBoard/AllOrders/AllOrders";
import AllUsers from "../pages/Dashboard/AdminDashBoard/AllUsers/AllUsers";
import Customers from "../pages/Dashboard/AdminDashBoard/Customers/Customers";
import ManageBooking from "../pages/Dashboard/AdminDashBoard/Manage Booking/ManageBooking";
import AddItems from "../pages/Dashboard/AdminDashBoard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <Home />
         },
         {
            path: "/ourmenu",
            element: <Ourmenu />
         },
         {
            path: "/order",
            element: <OurShop />
         },
         {
            path: "/contact",
            element: <Contact />
         },
         {
            path: "/login",
            element: <Login />
         },
         {
            path: "/signup",
            element: <Singup />
         },
         {
            path: '/Carts',
            element: <PrivateRoute> <ViewCart /> </PrivateRoute>
         }
      ]

   },

   {
      path: 'dashboard',
      element: <PrivateRoute><DashBoard /></PrivateRoute>,
      children: [
         {
            path: 'general',
            element: <General />
         },
         {
            path: 'orders',
            element: <DsOrder />
         },
         {
            path: 'reservation',
            element: <Reservations />
         },
         {
            path: 'check-orders',
            element: <CheckOrder />
         },
         {
            path: 'Generals',
            element: <AdminGenereal />
         },
         {
            path: 'Addorders',
            element: <AllOrders />
         },
         {
            path: 'AllItems',
            element: <AdminRoute><AddItems/></AdminRoute>
         },
         {
            path: 'AllUsers',
            element: <AllUsers />
         },
         {
            path: 'Customers',
            element: <Customers />
         },
         {
            path: 'Booking',
            element: <ManageBooking />
         }
      ],
   },

]);
