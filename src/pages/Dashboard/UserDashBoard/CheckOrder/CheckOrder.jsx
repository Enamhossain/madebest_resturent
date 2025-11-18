import React, { useState, useEffect, memo } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import Loading from '../../../../Component/Loading';
import { FaCheckCircle, FaTimesCircle, FaClock, FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import swal from 'sweetalert';

const CheckOrder = memo(() => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, paid, unpaid
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email, filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Fetch user-specific orders
      const response = await axiosSecure.get(`/order/user/${user.email}`);
      let userOrders = response.data?.data || response.data || [];

      // Apply filter
      let filteredOrders = userOrders;
      if (filter === 'paid') {
        filteredOrders = userOrders.filter(order => order.paidStatus === true);
      } else if (filter === 'unpaid') {
        filteredOrders = userOrders.filter(order => order.paidStatus === false);
      }

      // Sort by date (newest first) - already sorted on server
      setOrders(filteredOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback: try to fetch all orders and filter client-side
      try {
        const response = await axiosSecure.get('/order');
        const allOrders = response.data?.data || response.data || [];
        const userOrders = allOrders.filter(order => 
          order.cus_email?.toLowerCase() === user.email?.toLowerCase() ||
          order.Email?.toLowerCase() === user.email?.toLowerCase()
        );
        
        let filteredOrders = userOrders;
        if (filter === 'paid') {
          filteredOrders = userOrders.filter(order => order.paidStatus === true);
        } else if (filter === 'unpaid') {
          filteredOrders = userOrders.filter(order => order.paidStatus === false);
        }
        
        setOrders(filteredOrders);
      } catch (fallbackError) {
        console.error('Fallback fetch also failed:', fallbackError);
        setOrders([]);
      }
      setLoading(false);
    }
  };

  const getStatusBadge = (paidStatus) => {
    if (paidStatus) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
          <FaCheckCircle className="mr-1" />
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
        <FaClock className="mr-1" />
        Pending
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  const calculateTotal = (order) => {
    if (order.total_amount) {
      return parseFloat(order.total_amount).toFixed(2);
    }
    if (order.cartItems && Array.isArray(order.cartItems)) {
      return order.cartItems.reduce((sum, item) => {
        return sum + (parseFloat(item.price || 0) * parseInt(item.quantity || 1));
      }, 0).toFixed(2);
    }
    return '0.00';
  };

  if (loading) {
    return (
      <div className="w-full p-8">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Helmet>
        <title>My Orders | MadeBest Dashboard</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-8 px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <FaShoppingBag className="mr-3" />
              My Orders
            </h1>
            <p className="text-orange-100">Track and manage your order history</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{orders.length}</p>
            <p className="text-sm text-orange-100">Total Orders</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'paid'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Paid ({orders.filter(o => o.paidStatus).length})
          </button>
          <button
            onClick={() => setFilter('unpaid')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'unpaid'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({orders.filter(o => !o.paidStatus).length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-6">
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FaShoppingBag className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h3>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <a
              href="/order"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        Order #{order.transaction_id || order._id?.toString().slice(-8) || `ORD-${index + 1}`}
                      </h3>
                      {getStatusBadge(order.paidStatus)}
                    </div>
                    <p className="text-sm text-gray-500">
                      Placed on: {formatDate(order.createdAt || order._id)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                      ${calculateTotal(order)}
                    </p>
                    <p className="text-sm text-gray-500">Total Amount</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-200">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-orange-500" />
                      Delivery Address
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {order.cus_add1 || order.address || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <FaPhone className="mr-2 text-orange-500" />
                      Contact
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {order.cus_phone || order.phoneNumber || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                {order.cartItems && Array.isArray(order.cartItems) && order.cartItems.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-3">Order Items</h4>
                    <div className="space-y-2">
                      {order.cartItems.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.title || item.name || 'Item'}</p>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity || 1} × ${parseFloat(item.price || 0).toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-800">
                            ${(parseFloat(item.price || 0) * parseInt(item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transaction ID */}
                {order.transaction_id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Transaction ID: <span className="font-mono text-gray-700">{order.transaction_id}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

CheckOrder.displayName = 'CheckOrder';

export default CheckOrder;
