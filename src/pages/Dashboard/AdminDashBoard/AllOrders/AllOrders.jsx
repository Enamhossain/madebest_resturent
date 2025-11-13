import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you have Axios configured in your project
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import swal from 'sweetalert';
import Loading from '../../../../Component/Loading';

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  
  useEffect(() => {
    // Fetch all orders data when the component mounts
    axiosSecure.get('/order')
      .then(response => {
        const ordersData = response.data?.data || response.data || [];
        setOrders(ordersData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching all orders:', error);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return <Loading />;
  }


  const handleDeleteOrder = (orderId) => {
    axiosSecure.delete(`/order/${orderId}`)
    .then(response => {
      // Assuming successful deletion, update the state to reflect the changes
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      swal('Order deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting order:', error);
    });
};

  return (
    <div className='w-full'>
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">All Orders</h1>
          <p className="mt-4 text-lg">View all orders placed by customers</p>
        </div>
      </div>

   {/* Orders Section */}
   <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">All Orders List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p className="mt-2">Customer: {order.name}</p>
              <p className="mt-2">Address: {order.address}</p>
              <p className="mt-2">Total Amount: ${order.total_amount}</p>
              <p className="mt-2">Paid Status: {order.paidStatus ? 'Paid' : 'Unpaid'}</p>
              {/* Add more details as needed */}
              <button onClick={() => handleDeleteOrder(order._id)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
            </div>
          ))}
      </div>
      </div>
      </div>
   
  );
}

export default AllOrders;
