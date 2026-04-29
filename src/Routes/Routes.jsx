import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Main from "../Layout/Main";
import Loading from "../Component/Loading";
import { lazyWithRetry } from "../utils/lazyWithRetry";

// Lazy load components with retry logic to handle deployment updates
const Home = lazyWithRetry(() => import("../pages/Home/Home"));
const Ourmenu = lazyWithRetry(() => import("../pages/OurMenu/Ourmenu"));
const Login = lazyWithRetry(() => import("../pages/Login/Login"));
const Singup = lazyWithRetry(() => import("../pages/Singup/Singup"));
const PrivateRoute = lazyWithRetry(() => import('./PrivateRoute'));
const DashBoard = lazyWithRetry(() => import("../pages/Dashboard/DashBoard"));
const General = lazyWithRetry(() => import("../pages/Dashboard/UserDashBoard/General/General"));
const Contact = lazyWithRetry(() => import("../pages/Contact/Contact"));
const ViewCart = lazyWithRetry(() => import("../Component/ViewCart"));
const DsOrder = lazyWithRetry(() => import("../pages/Dashboard/UserDashBoard/order/DsOrder"));
const Reservations = lazyWithRetry(() => import("../pages/Dashboard/UserDashBoard/Reservations/Reservations"));
const CheckOrder = lazyWithRetry(() => import("../pages/Dashboard/UserDashBoard/CheckOrder/CheckOrder"));
const AdminGenereal = lazyWithRetry(() => import("../pages/Dashboard/AdminDashBoard/General/AdminGenereal"));
const AllOrders = lazyWithRetry(() => import("../pages/Dashboard/AdminDashBoard/AllOrders/AllOrders"));
const AllUsers = lazyWithRetry(() => import("../pages/Dashboard/AdminDashBoard/AllUsers/AllUsers"));
const Customers = lazyWithRetry(() => import("../pages/Dashboard/AdminDashBoard/Customers/Customers"));
const AddItems = lazyWithRetry(() => import("../pages/Dashboard/AdminDashBoard/AddItems/AddItems"));
const AdminRoute = lazyWithRetry(() => import("./AdminRoute"));
const ManageItems = lazyWithRetry(() => import("../pages/Dashboard/AdminDashBoard/Manage Booking/ManageBooking"));
const PaymentSuccess = lazyWithRetry(() => import("../pages/Payment/PaymentSuccess"));
const PaymentFailed = lazyWithRetry(() => import("../pages/Payment/PaymendFailed"));
const Booking = lazyWithRetry(() => import("../pages/Home/Booking/Booking"));
const OurShop = lazyWithRetry(() => import("../pages/Order/OurShop"));

// Wrapper component for lazy loading with Suspense
const LazyWrapper = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
};

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
