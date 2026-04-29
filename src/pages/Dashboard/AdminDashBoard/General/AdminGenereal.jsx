import React, { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import { FaUsers, FaClipboardList, FaShoppingCart, FaDollarSign, FaArrowUp, FaChartLine } from 'react-icons/fa';
import Loading from '../../../../Component/Loading';

const AdminGeneral = memo(() => {
  const axiosSecure = useAxiosSecure();

  // Use React Query for faster fetching, caching, and automatic refetching
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-general-stats'],
    queryFn: async () => {
      const response = await axiosSecure.get('/general');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-gray-200 rounded-lg mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-2xl mt-8"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-2xl border border-red-100 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
          <FaChartLine size={24} />
        </div>
        <h3 className="text-lg font-bold text-red-900">Failed to load statistics</h3>
        <p className="text-red-600 mt-2">There was an error fetching the dashboard data. Please try again later.</p>
      </div>
    );
  }

  const statCards = [
    { 
      title: 'Total Users', 
      value: stats?.users || 0, 
      icon: <FaUsers />, 
      color: 'bg-blue-500', 
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+12%',
      description: 'Since last month'
    },
    { 
      title: 'Menu Items', 
      value: stats?.menuItems || 0, 
      icon: <FaClipboardList />, 
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      trend: '+5',
      description: 'Newly added'
    },
    { 
      title: 'Total Orders', 
      value: stats?.orders || 0, 
      icon: <FaShoppingCart />, 
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      trend: '+18%',
      description: 'Last 7 days'
    },
    { 
      title: 'Total Revenue', 
      value: `$${stats?.revenue?.toLocaleString() || 0}`, 
      icon: <FaDollarSign />, 
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: '+24%',
      description: 'Compared to target'
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live Updates
          </span>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={index} 
            className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${card.lightColor} rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500`}></div>
            
            <div className="relative flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.lightColor} ${card.textColor} rounded-2xl flex items-center justify-center text-xl transition-colors group-hover:${card.color} group-hover:text-white`}>
                  {card.icon}
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${card.lightColor} ${card.textColor}`}>
                  <FaArrowUp size={8} />
                  {card.trend}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{card.title}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{card.value}</h3>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-xs text-gray-400 font-medium">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Chart Section (Placeholder for visualization) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Revenue & Growth</h3>
            <p className="text-sm text-gray-500 mt-1">Real-time performance analytics</p>
          </div>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-500/20">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Year</option>
          </select>
        </div>
        
        {/* Simple Placeholder for Chart */}
        <div className="h-64 w-full bg-gray-50 rounded-2xl flex items-center justify-center border border-dashed border-gray-200 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <FaChartLine size={48} className="animate-float" />
            <p className="font-bold">Growth Visualization Ready</p>
            <p className="text-xs">Select data parameters to view detailed trends</p>
          </div>
        </div>
      </div>
    </div>
  );
});

AdminGeneral.displayName = 'AdminGeneral';

export default AdminGeneral;
