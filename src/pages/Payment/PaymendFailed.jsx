// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
        <FaExclamationCircle className="text-6xl text-red-600 mb-4" /> 
        <p className="text-lg text-gray-800 mb-2">Your payment was not successful.</p>
      </div>
    
      <div className="text-center">
        <p className="text-lg text-gray-800 mb-4">Please try again later or contact support for assistance.</p>
  
      </div>


    </div>
  );
};

export default PaymentFailed;
