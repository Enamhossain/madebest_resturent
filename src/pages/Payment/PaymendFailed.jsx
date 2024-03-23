import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      {/* Message section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
        <FaExclamationCircle className="text-6xl text-red-600 mb-4" /> {/* React icon */}
        <p className="text-lg text-gray-800 mb-2">Your payment was not successful.</p>
      </div>

      {/* Additional content */}
      <div className="text-center">
        <p className="text-lg text-gray-800 mb-4">Please try again later or contact support for assistance.</p>
        {/* You can add more content here */}
      </div>

      {/* You can customize the message or add any additional content here */}
    </div>
  );
};

export default PaymentFailed;
