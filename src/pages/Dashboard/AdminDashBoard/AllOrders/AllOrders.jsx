import React, { memo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import swal from 'sweetalert';
import { FaTrash, FaShoppingBag, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';

const AllOrders = memo(() => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Use React Query for orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const response = await axiosSecure.get('/order');
      return response.data?.data || response.data || [];
    },
  });

  // Mutation for deleting orders
  const deleteMutation = useMutation({
    mutationFn: (orderId) => axiosSecure.delete(`/order/${orderId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders']);
      swal({
        title: "Deleted!",
        text: "Order has been removed successfully.",
        icon: "success",
        buttons: false,
        timer: 1500
      });
    },
    onError: (error) => {
      console.error('Error deleting order:', error);
      swal("Error!", "Could not delete the order.", "error");
    }
  });

  const handleDeleteOrder = (orderId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this order data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMutation.mutate(orderId);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Order Management</h2>
          <p className="text-gray-500 mt-1">Review and manage all customer orders.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
          <FaShoppingBag className="text-orange-500" />
          <span className="font-bold text-gray-700">{orders.length}</span>
          <span className="text-gray-400 text-sm font-medium">Total Orders</span>
        </div>
      </div>

      {/* Orders Grid */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-dashed border-gray-300 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
            <FaShoppingBag size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No orders found</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">When customers place orders, they will appear here for management.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xs">
                    #ORD
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                    <p className="text-xs font-bold text-gray-900 truncate w-32">...{order._id?.slice(-8)}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                  order.paidStatus 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {order.paidStatus ? <FaCheckCircle size={10} /> : <FaClock size={10} />}
                  {order.paidStatus ? 'Paid' : 'Unpaid'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1">
                <div className="flex items-start gap-3">
                  <FaUser className="text-gray-400 mt-1 flex-shrink-0" size={14} />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</p>
                    <p className="text-sm font-bold text-gray-800">{order.name || 'Unknown'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" size={14} />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery Address</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{order.address || 'No address provided'}</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" size={12} />
                    <span className="text-[11px] font-bold text-gray-500">Recently Placed</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                    <p className="text-xl font-black text-orange-600">${order.total_amount?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-4 bg-gray-50/50 border-t border-gray-100 mt-auto">
                <button 
                  onClick={() => handleDeleteOrder(order._id)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all duration-200 text-sm group-hover:shadow-md"
                >
                  <FaTrash size={14} />
                  <span>Remove Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

AllOrders.displayName = 'AllOrders';

export default AllOrders;
