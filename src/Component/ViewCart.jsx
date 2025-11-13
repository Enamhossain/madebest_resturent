import React, { useState, useEffect, useCallback, memo } from "react";
import useCart from "../hooks/useCart";
import { FaMinus, FaPlus } from "react-icons/fa";
import useAxiosPublic from "../hooks/axiosPublic";
import swal from "sweetalert";
import { useForm, Controller } from "react-hook-form";
import LazyImage from "./LazyImage";

const ViewCart = memo(function ViewCart() {
  const [cart, refetch, loading] = useCart();
  const axios = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const { control, handleSubmit, reset } = useForm();
  const [cartItems, setCartItems] = useState([]);

  

  useEffect(() => {
    setCartItems(
      cart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        price: parseFloat(item.price) || 0,
      }))
    );
  }, [cart]);
  
  const onSubmit = (data) => {
    // Construct order data
    const orderData = {
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      Email: data.Email,
      cartItems: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity, // Include the quantity of each item
      })),
    };

    // Send order data to the server
    fetch("https://madebestresturent.vercel.app/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((result) => {
        window.location.replace(result.url);
        console.log(result);
      });
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [openModal]);

  const handleDelete = (id) => {
    axios
      .delete(`/carts/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          swal("Success!", "Item deleted successfully", "success");
          refetch();
        } else {
          swal("Error", "Failed to delete item", "error");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        swal("Error", "Failed to delete item", "error");
      });
  };

  const handleAddToCart = (item) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const handleRemoveFromCart = (item) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem._id === item._id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div className="">
        <div className="bg-gray-800 text-white py-12">
          <div className="px-28 mt-28">
            <div className="h-10 w-48 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-300 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 w-32 bg-gray-300 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="h-8 w-20 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow h-64 animate-pulse">
              <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-gray-800 text-white py-12">
        <div className=" px-28  mt-28">
          <h1 className="text-3xl font-bold mb-4 ">Your Cart</h1>
          <p className="text-gray-100 text-lg">
            View and manage items in your cart.
          </p>
        </div>
      </div>

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item._id} className="flex items-center gap-4">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className="size-16 rounded object-cover"
                      width={64}
                      height={64}
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">{item.title}</h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">
                            {parseFloat(item.price).toFixed(2)}
                          </dt>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <div className="flex items-center gap-1 rounded border border-gray-200">
                        <button
                          type="button"
                          onClick={() => handleRemoveFromCart(item)}
                          className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                        >
                          <FaMinus />
                        </button>

                        <p className="text-black ">{item.quantity}</p>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-gray-600 transition hover:text-red-600"
                      >
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
                      <dd>Total: ${getCartTotal().toFixed(2)}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <a
                      onClick={() => setOpenModal(true)}
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                    <div
                      onClick={() => setOpenModal(false)}
                      className={`fixed flex justify-center items-center z-[100] ${
                        openModal ? "visible opacity-1" : "invisible opacity-0"
                      } inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute w-full lg:w-[500px] bg-white drop-shadow-2xl rounded-lg ${
                          openModal
                            ? "opacity-1 duration-300 translate-y-0"
                            : "-translate-y-20 opacity-0 duration-150"
                        }`}
                      >
                        <h1 className="text-center font-extrabold text-2xl mt-5 ">
                          Payment{" "}
                        </h1>
                        <form
                          className="p-12"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <svg
                            onClick={() => setOpenModal(false)}
                            className="w-10 mx-auto mr-0 cursor-pointer"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                              fill="#000000"
                            ></path>
                          </svg>

                          <div className="space-y-5">
                            <Controller
                              name="name"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }} // Add the required rule here
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="Name"
                                  className="border bg-slate-50 border-gray-300 rounded-md p-2 w-full"
                                />
                              )}
                            />
                            <Controller
                              name="phoneNumber"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }} // Add the required rule here
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="tel"
                                  placeholder="Phone Number"
                                  className="border bg-slate-50 border-gray-300 rounded-md p-2 w-full"
                                />
                              )}
                            />
                            <Controller
                              name="Email"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }} // Add the required rule here
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="email"
                                  placeholder="Email Address"
                                  className="border bg-slate-50 border-gray-300 rounded-md p-2 w-full"
                                />
                              )}
                            />
                            <Controller
                              name="postcode"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }} // Add the required rule here
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="Postcode"
                                  className="border bg-slate-50 border-gray-300 rounded-md p-2 w-full"
                                />
                              )}
                            />
                            <Controller
                              name="address"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }} // Add the required rule here
                              render={({ field }) => (
                                <textarea
                                  {...field}
                                  placeholder="Address"
                                  className="border bg-slate-50 border-gray-200 rounded-md p-2 w-full"
                                />
                              )}
                            />
                          </div>
                          <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md"
                          >
                            Pay{" "}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

ViewCart.displayName = 'ViewCart';

export default ViewCart;
