// import React from 'react';
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import swal from 'sweetalert';

// const CheckOutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
    
//         if (!stripe || !elements) {
//             return;
//         }
    
//         const card = elements.getElement(CardElement);
    
//         if (card === null) {
//             return;
//         }
    
//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card,
//         });
    
//         if (error) {
//             console.log('[error]', error);
//             // Display SweetAlert error message
//             Swal({
//                 icon: 'error',
//                 title: 'Payment Failed',
//                 text: 'An error occurred while processing your payment. Please try again.',
//             });
//         } else {
//             console.log('[PaymentMethod]', paymentMethod);
//             // Display SweetAlert success message
//             swal({
//                 icon: 'success',
//                 title: 'Payment Successful',
//                 text: 'Your payment has been processed successfully.',
//             });
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="mx-auto max-w-md p-18 bg-white shadow-md rounded-lg">
//         <div className="mb-6">
//             <label htmlFor="card" className="block text-sm font-medium text-gray-700">Card Details</label>
//             <div className="mt-1">
//                 <CardElement
//                     id="card"
//                     className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
//                 />
//             </div>
//         </div>
//         <button 
//             type="submit" 
//             disabled={!stripe} 
//             className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
//         >
//             Pay Now
//         </button>
//     </form>
//     );
// };

// export default CheckOutForm;
