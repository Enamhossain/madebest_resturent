import { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/axiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { HiX, HiMinus, HiPlus, HiOutlineTrash, HiShoppingBag } from 'react-icons/hi';

const ShoppingCart = ({ onClose }) => {
  const [cart, refetch] = useCart();
  const axios = useAxiosPublic();
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setCartItems(
      cart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        price: parseFloat(item.price) || 0,
      }))
    );
  }, [cart]);

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  const handleDelete = (id) => {
    swal({
      title: "Remove Item?",
      text: "Are you sure you want to remove this item from your cart?",
      icon: "warning",
      buttons: ["Cancel", "Remove"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/carts/${id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            swal("Error", "Could not remove item", "error");
          });
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <HiShoppingBag size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Your Cart</h2>
            <p className="text-xs text-muted-foreground">{cartItems.length} items selected</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
        >
          <HiX size={24} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
            <HiShoppingBag size={64} className="text-muted-foreground/30" />
            <div>
              <p className="text-lg font-bold">Your cart is empty</p>
              <p className="text-sm">Start adding some delicious items!</p>
            </div>
            <Link
              to="/order"
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white font-bold rounded-full text-sm"
            >
              Order Now
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="group relative flex gap-4 p-3 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-foreground line-clamp-1">{item.title}</h3>
                  <p className="text-primary font-black">${item.price}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background transition-colors text-muted-foreground opacity-50 cursor-not-allowed">
                      <HiMinus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                    <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background transition-colors text-primary opacity-50 cursor-not-allowed">
                      <HiPlus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer / Summary */}
      {cartItems.length > 0 && (
        <div className="p-6 border-t border-border bg-muted/30 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>${getCartTotal()}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Delivery Fee</span>
              <span className="text-green-500 font-bold uppercase text-[10px]">Free</span>
            </div>
            <div className="flex justify-between text-xl font-black text-foreground pt-2 border-t border-border/50">
              <span>Total</span>
              <span className="text-primary">${getCartTotal()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/order"
              onClick={onClose}
              className="w-full py-4 bg-foreground text-background text-center font-bold rounded-2xl hover:bg-foreground/90 transition-all"
            >
              Check Out
            </Link>
            <button
              onClick={onClose}
              className="text-sm text-muted-foreground font-bold hover:text-primary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;


