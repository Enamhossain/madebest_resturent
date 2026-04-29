import React, { useState } from 'react';
import { 
  FaChartBar, 
  FaClipboardList, 
  FaUtensils, 
  FaUserFriends, 
  FaMoneyBillAlt, 
  FaHome, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaBell,
  FaSearch,
  FaUserCircle
} from 'react-icons/fa';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';
import ScrollToTop from '../../Component/ScrollToTop';

function DashBoard() {
  const [isAdmin] = useAdmin();
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const adminMenuItems = [
    { name: 'Overview', icon: <FaChartBar />, path: 'generals' },
    { name: 'All Orders', icon: <FaClipboardList />, path: 'Addorders' },
    { name: 'Add Items', icon: <FaUtensils />, path: 'AllItems' },
    { name: 'Manage Booking', icon: <FaUserFriends />, path: 'manageitems' },
    { name: 'All Users', icon: <FaClipboardList />, path: 'AllUsers' },
    { name: 'Customers', icon: <FaMoneyBillAlt />, path: 'customers' },
  ];

  const userMenuItems = [
    { name: 'Overview', icon: <FaChartBar />, path: 'general' },
    { name: 'My Orders', icon: <FaClipboardList />, path: 'orders' },
    { name: 'Reservations', icon: <FaUserFriends />, path: 'reservation' },
    { name: 'Check Orders', icon: <FaClipboardList />, path: 'check-orders' }
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const isActive = (path) => {
    const currentPath = location.pathname.split('/').pop();
    return currentPath === path;
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <ScrollToTop />
      <Helmet>
        <title>Dashboard | MadeBest</title>
      </Helmet>

      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-e border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 transition-transform group-hover:scale-105">
                <FaUtensils className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">MadeBest</h1>
                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">Restaurant Admin</p>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            <div className="px-3 mb-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Main Menu</p>
            </div>
            
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 group"
            >
              <FaHome className="text-lg group-hover:text-orange-500" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="pt-4 pb-2 px-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Dashboard</p>
            </div>

            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
                  isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'
                }`}>
                  {item.icon}
                </span>
                <span className="font-semibold">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-200 shadow-sm mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{user?.displayName || 'User'}</p>
                <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-100"
            >
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl border border-transparent focus-within:border-orange-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
              <FaSearch className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search dashboard..." 
                className="bg-transparent border-none outline-none text-sm font-medium w-64 text-gray-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors group">
              <FaBell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900">{user?.displayName}</p>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                  {isAdmin ? 'Administrator' : 'Customer'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm ring-2 ring-gray-100">
                 {user?.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                 ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                       <FaUserCircle size={24} />
                    </div>
                 )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <section className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-gray-50/50">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            <Outlet />
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}} />
    </div>
  );
}

export default DashBoard;
