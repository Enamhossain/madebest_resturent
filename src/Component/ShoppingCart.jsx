import { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/axiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ShoppingCart = () => {
  const [cart, refetch] = useCart();
  const axios = useAxiosPublic();
  const [cartItems, setCartItems] = useState(cart);
  const [isCartOpen, setCartOpen] = useState(true);
  const { user } = useContext(AuthContext);
console.log(user)

  useEffect(() => {
    // Filter out cart items based on email
    const filteredCart = cart.filter(item => item.email !== user);
    setCartItems(filteredCart);
  }, [cart, user]); 

  const handleCloseCart = () => {
    setCartOpen(false); // Close the cart popup
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    newQuantity = parseFloat(newQuantity);

    if (isNaN(newQuantity) || newQuantity < 1) {
      console.error("Invalid quantity:", newQuantity);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
  };

  const handleDelete = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/carts/${id}`)
          .then(res => {
            if (res.status === 200) {
              swal("Success!", "Item deleted successfully", "success");
              refetch(); // Refetch cart data to update the UI
            } else {
              swal("Error", "Failed to delete item", "error");
            }
          })
          .catch(error => {
            console.error("Error deleting item:", error);
            swal("Error", "An error occurred while deleting the item", "error");
          });
      }
    });
  };

 

  return (
    <>
      {isCartOpen && (
        <div className="fixed top-0 right-0 z-50 border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6">
          <button
            className="absolute top-4 right-4 text-gray-600 transition hover:scale-110"
            onClick={handleCloseCart}
          >
            <span className="sr-only">Close cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mt-4 space-y-6">
            <ul className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b py-2">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt="Item" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="text-sm text-gray-900">{item.title}</h3>
                      <p className="text-xs text-gray-600">Price: {item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, parseFloat(item.quantity) - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2 py-1">{(item.quantity)}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, parseFloat(item.quantity) + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                    >
                      +
                    </button>
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </ul>

            <div className="space-y-4 text-center">
              <Link
                to="/Carts"
                className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
              >
                View my cart ({cartItems.length})
              </Link>
              <a
                href="#"
                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Checkout
              </a>
              <a
                href="#"
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
              >
                Continue shopping
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
