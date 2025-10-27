import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../Layout/Main";
import Loading from "../Component/Loading";

// Lazy load components for better performance
const Home = lazy(() => import("../pages/Home/Home"));
const Ourmenu = lazy(() => import("../pages/OurMenu/Ourmenu"));
const Login = lazy(() => import("../pages/Login/Login"));
const Singup = lazy(() => import("../pages/Singup/Singup"));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const DashBoard = lazy(() => import("../pages/Dashboard/DashBoard"));
const General = lazy(() => import("../pages/Dashboard/UserDashBoard/General/General"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const ViewCart = lazy(() => import("../Component/ViewCart"));
const DsOrder = lazy(() => import("../pages/Dashboard/UserDashBoard/order/DsOrder"));
const Reservations = lazy(() => import("../pages/Dashboard/UserDashBoard/Reservations/Reservations"));
const CheckOrder = lazy(() => import("../pages/Dashboard/UserDashBoard/CheckOrder/CheckOrder"));
const AdminGenereal = lazy(() => import("../pages/Dashboard/AdminDashBoard/General/AdminGenereal"));
const AllOrders = lazy(() => import("../pages/Dashboard/AdminDashBoard/AllOrders/AllOrders"));
const AllUsers = lazy(() => import("../pages/Dashboard/AdminDashBoard/AllUsers/AllUsers"));
const Customers = lazy(() => import("../pages/Dashboard/AdminDashBoard/Customers/Customers"));
const AddItems = lazy(() => import("../pages/Dashboard/AdminDashBoard/AddItems/AddItems"));
const AdminRoute = lazy(() => import("./AdminRoute"));
const ManageItems = lazy(() => import("../pages/Dashboard/AdminDashBoard/Manage Booking/ManageBooking"));
const PaymentSuccess = lazy(() => import("../pages/Payment/PaymentSuccess"));
const PaymentFailed = lazy(() => import("../pages/Payment/PaymendFailed"));
const Booking = lazy(() => import("../pages/Home/Booking/Booking"));
const OurShop = lazy(() => import("../pages/Order/OurShop"));

// Wrapper component for lazy loading with Suspense
const LazyWrapper = ({ children }) => (
  <Suspense fallback={<Loading />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <LazyWrapper><Home /></LazyWrapper>
         },
         {
            path: "/ourmenu",
            element: <LazyWrapper><Ourmenu /></LazyWrapper>
         },
         {
            path: "/order",
            element: <LazyWrapper><OurShop /></LazyWrapper>
         },
         {
            path: "/contact",
            element: <LazyWrapper><Contact /></LazyWrapper>
         },
         {
            path: "/login",
            element: <LazyWrapper><Login /></LazyWrapper>
         },
         {
            path: "/signup",
            element: <LazyWrapper><Singup /></LazyWrapper>
         },

         {
            path:'/Booking',
            element: <LazyWrapper><Booking /></LazyWrapper>
         },

         
         {
            path: '/Carts',
            element: <LazyWrapper><PrivateRoute> <ViewCart /> </PrivateRoute></LazyWrapper>
         },
         
         {
            path: 'payment/success/:tranId',
            element: <LazyWrapper><PaymentSuccess /></LazyWrapper>
         },
         {
            path: 'payment/failed/:tranId',
            element: <LazyWrapper><PaymentFailed /></LazyWrapper>
         },
      ]

   },

   {
      path: 'dashboard',
      element: <LazyWrapper><PrivateRoute><DashBoard /></PrivateRoute></LazyWrapper>,
      children: [
         {
            path: 'general',
            element: <LazyWrapper><General /></LazyWrapper>
         },
         {
            path: 'orders',
            element: <LazyWrapper><DsOrder /></LazyWrapper>
         },
         {
            path: 'reservation',
            element: <LazyWrapper><Reservations /></LazyWrapper>
         },
         {
            path: 'check-orders',
            element: <LazyWrapper><CheckOrder /></LazyWrapper>
         },
         {
            path: 'Generals',
            element: <LazyWrapper><AdminGenereal /></LazyWrapper>
         },
         {
            path: 'Addorders',
            element: <LazyWrapper><AllOrders /></LazyWrapper>
         },
         {
            path: 'AllItems',
            element: <LazyWrapper><AdminRoute><AddItems/></AdminRoute></LazyWrapper>
         },
         {
            path: 'AllUsers',
            element: <LazyWrapper><AllUsers /></LazyWrapper>
         },
         {
            path: 'Customers',
            element: <LazyWrapper><Customers /></LazyWrapper>
         },
         {
            path: 'manageitems',
            element: <LazyWrapper><ManageItems /></LazyWrapper>
         },
          
      ],
   },

  

]);
