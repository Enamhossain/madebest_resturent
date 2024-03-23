import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing a material icon

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      {/* Hero section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-800 mb-2">Your payment was successfully processed.</p>
        <FaCheckCircle className="inline-block text-6xl text-green-600 mb-4" /> {/* Material icon */}
      </div>

      {/* Additional content */}
      <div className="text-center">
        <p className="text-lg text-gray-800 mb-4">Thank you for your purchase.</p>
        {/* You can add more content here */}
      </div>

      {/* You can customize the success message or add any additional content here */}
    </div>
  );
};

export default PaymentSuccess;
