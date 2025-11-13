import React, { memo } from 'react';
import { FaTrash } from 'react-icons/fa';
import useCart from '../../../../hooks/useCart';
import Loading from '../../../../Component/Loading';
import SkeletonCard from '../../../../Component/SkeletonCard';

const DsOrder = memo(() => {
  const [cart, , loading] = useCart();

  if (loading) {
    return (
      <div className='w-full'>
        <h2 className="text-2xl font-bold mb-4 text-center bg-orange-700 text-white p-2">Order List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Calculate total price for each item
  

  return (
    <div className='w-full'>
      <h2 className="text-2xl font-bold mb-4 text-center bg-orange-700 text-white p-2 ">Order List</h2>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">total</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <button className='text-red-600'>
                        <FaTrash />
                   </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

DsOrder.displayName = 'DsOrder';

export default DsOrder;
