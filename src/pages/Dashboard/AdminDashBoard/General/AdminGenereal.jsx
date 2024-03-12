import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

function AdminGeneral() {
   // Sample data for demonstration
  const cardData = [
    { title: 'Total Users', value: 1000 },
    { title: 'Active Users', value: 750 },
    { title: 'New Users Today', value: 50 },
    { title: 'Revenue', value: '$10,000' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">General Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((data, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{data.title}</h3>
            <p className="text-2xl mt-2">{data.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AdminGeneral;
