import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import { FaUsers, FaClipboardList, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

function AdminGeneral() {
  const axiosSecure = useAxiosSecure();
  const [cardData, setCardData] = useState([]);
  console.log(cardData)
  // Sample data for demonstration

  useEffect(() => {
    axiosSecure.get('/general')
      .then(response => {
        const data = response.data;
        setCardData([
          { title: 'Total Users', value: data.users, icon: <FaUsers /> },
          { title: 'Total Items', value: data.menuItems, icon: <FaClipboardList /> },
          { title: 'Orders', value: data.orders, icon: <FaShoppingCart /> },
          { title: 'Revenue', value: data.revenue, icon: <FaDollarSign /> }
        ]);
      })
      .catch(error => {
        console.error('Error fetching general information:', error);

      });
  }, []);

  const getRandomRgbColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };


  return (
    <div className='w-full'>
      <h2 className="text-2xl font-bold mb-4 bg-gray-900 text-center text-white p-3">General Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
       
          {cardData.map((data, index) => (
            <div key={index} className={`p-4 rounded-lg shadow-md text-white`} style={{ backgroundColor: getRandomRgbColor() }}>
              <div className="flex items-center justify-center mb-2">
                {data.icon}
                <h3 className="text-lg font-semibold ml-2">{data.title}</h3>
              </div>
              <p className="text-2xl mt-2">{data.value}</p>
            </div>
          ))}

        </div>
        </div>
    
      );
}
      export default AdminGeneral;
