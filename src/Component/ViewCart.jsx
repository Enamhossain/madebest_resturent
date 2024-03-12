import React, { useState } from 'react';
import useCart from '../hooks/useCart';
import { FaMinus, FaPlus } from 'react-icons/fa';
import useAxiosPublic from '../hooks/axiosPublic';
;

function ViewCart() {
    const [cart, refetch] = useCart();
    const [updatedCart, setUpdatedCart] = useState([...cart]);
    const axios = useAxiosPublic();


   

    const handleQuantityChange = (itemId, newQuantity) => {
        // Ensure the new quantity is within the allowed range (min: 1)
        newQuantity = Math.max(newQuantity, 1);

        const updatedItems = updatedCart.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setUpdatedCart(updatedItems);
    };

    const handleDelete = id => {
        axios.delete(`/carts/${id}`)
            .then(res => {
                console.log(res);
                // Check the response status and show a success message if necessary
                if (res.status === 200) {
                    swal("Success!", "Item deleted successfully", "success");
                    refetch(); // Refetch cart data to update the UI
                } else {
                    // Handle other status codes if necessary
                    swal("Error", "Failed to delete item", "error");
                }
            })
        refetch();
    };

    // Calculate total price
    const totalPrice = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="">
            {/* Hero Section */}
            <div className="bg-gray-800 text-white py-12">
                <div className=" px-28  mt-28">
                    <h1 className="text-3xl font-bold mb-4 ">Your Cart</h1>
                    <p className="text-gray-100 text-lg">View and manage items in your cart.</p>
                </div>
            </div>


            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <header className="text-center">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                        </header>

                        <div className="mt-8">
                            <ul className="space-y-4">
                                {cart.map(item => (
                                    <li key={item.id} className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="size-16 rounded object-cover"
                                        />

                                        <div>
                                            <h3 className="text-sm text-gray-900">{item.title}</h3>

                                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                <div>
                                                    <dt className="inline">{item.price}</dt>
                                                </div>
                                            </dl>
                                        </div>

                                        <div className="flex flex-1 items-center justify-end gap-2">
                                            <div className="flex items-center gap-1 rounded border border-gray-200">
                                                <button type="button" onClick={() => handleQuantityChange(item._id, item.quantity - 1)} className="size-10 leading-10 text-gray-600 transition hover:opacity-75">
                                                    <FaMinus />
                                                </button>

                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    className="h-10 w-16 rounded border-gray-200 bg-white text-black text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                    readOnly
                                                />

                                                <button type="button" onClick={() => handleQuantityChange(item._id, item.quantity + 1)} className="size-10 leading-10 text-gray-600 transition hover:opacity-75">
                                                    <FaPlus />
                                                </button>
                                            </div>

                                            <button onClick={() => handleDelete(item._id)} className="text-gray-600 transition hover:text-red-600">
                                                <span className="sr-only">Remove item</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}

                            </ul>

                            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                <div className="w-screen max-w-lg space-y-4">
                                    <dl className="space-y-0.5 text-sm text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Subtotal</dt>
                                            <dd>{totalPrice}</dd>
                                        </div>

                                        {/* Add VAT, Discount, and Total sections here if needed */}
                                    </dl>

                                    <div className="flex justify-end">
                                        <a
                                            href="#"
                                            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ViewCart;
