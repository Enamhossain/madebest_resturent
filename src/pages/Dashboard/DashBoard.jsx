import React from 'react';
import { FaChartBar, FaClipboardList, FaUtensils, FaUserFriends, FaMoneyBillAlt } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { Helmet } from 'react-helmet-async';
import useAdmin from '../../hooks/useAdmin';

function DashBoard() {
  const [ cart ] = useCart();
  
  
  const [ isAdmin ] = useAdmin();
  
  // You can change this based on your authentication logic

  // Define menu items for both admin and user
  const adminMenuItems = [
    { name: 'General', icon: <FaChartBar />, path: 'generals' },
    { name: 'All Orders', icon: <FaClipboardList />, path: 'Addorders' },
    { name: 'Add Items', icon: <FaUtensils />, path: 'AllItems' },
    { name: 'Manage Booking', icon: <FaUserFriends />, path: 'Booking' },
    { name: 'All Users', icon: <FaClipboardList />, path: 'AllUsers' },
    { name: 'Customers', icon: <FaMoneyBillAlt />, path: 'customers' },
    { name: 'Reports', icon: <FaChartBar />, path: 'reports' },
];

const userMenuItems = [
    { name: 'General', icon: <FaChartBar />, path: 'general' },
    { name: 'Orders', icon: <FaClipboardList />, path: 'orders' },
    { name: 'Reservations', icon: <FaUserFriends />, path: 'reservation' },
    { name: 'Check Orders', icon: <FaClipboardList />, path: 'check-orders' }
];

  // Select menu items based on isAdmin flag
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className="flex">
        <Helmet>
        <title>Dashboard | MadeBest</title>
      </Helmet>
      <div>
        <div className="flex h-screen flex-1 flex-col justify-between border-e bg-white ">
          <div className="px-4 py-6 font-semibold">
            <h1 className="text-2xl font-bold text-orange-600"> <Link to='/'> Restaurant Dashboard</Link> </h1>
            <ul className="mt-8 space-y-4 font-semibold">
              {/* Map over menuItems array to render menu items dynamically */}
              {menuItems.map((item, index) => (
                <li key={index}>
                  {/* Use Link component to navigate to dynamic routes */}
                  <Link to={item.path} className="block flex items-center rounded-lg bg-gray-100 hover:bg-orange-500 px-4 py-2 text-sm font-medium text-gray-700">
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-1">
        {/* Rendering nested routes using Outlet */}
        <Outlet />
      </div>
    </div>
  );
}

export default DashBoard;
