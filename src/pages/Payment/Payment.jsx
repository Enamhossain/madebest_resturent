// import React from 'react';
// import { loadStripe } from "@stripe/stripe-js";
// import CheckOutForm from './CheckOutForm';
// import { Elements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

// const Payment = () => {
//     return (
//         <div className="w-full">
//             <div className=" w-full bg-white p-8 shadow-lg rounded-lg">
//                 <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>
//                 <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                     <Elements stripe={stripePromise}>
//                         <CheckOutForm />
//                     </Elements>
//                 </div>
//                 <p className="text-center text-gray-500 text-sm">Secure payment powered by Stripe</p>
//             </div>
//         </div>
//     );
// };

// export default Payment;
