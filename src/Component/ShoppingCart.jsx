import { useState } from "react";

    
const ShoppingCart = () => { 

      const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product Name 1', size: 'XXS', color: 'White', quantity: 1 },
        // Add more items as needed
      ]);
    
      const [isCartOpen, setCartOpen] = useState(true); 
    
      const handleCloseCart = () => {
        setCartOpen(false); // Close the cart popup
      };
    
      const handleQuantityChange = (itemId, newQuantity) => {
        // Update the quantity of the specified item in the cart
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      };
    
      return (
        <>
          {isCartOpen && (
            <div className="fixed top-0 right-0 z-50 border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6">
              {/* Close button */}
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
    
              {/* Cart items */}
              <div className="mt-4 space-y-6">
                <ul className="space-y-4">
                  {/* Cart items */}
                  {cartItems.map(item => (
                    <li key={item.id} className="flex items-center gap-4">
                      {/* Item image */}
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Item"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {/* Item details */}
                      <div>
                        <h3 className="text-sm text-gray-900">{item.name}</h3>
                        <dl className="mt-0.5 space-y-px text-xs text-gray-600">
                          <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">{item.size}</dd>
                          </div>
                          <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">{item.color}</dd>
                          </div>
                        </dl>
                      </div>
                      {/* Item quantity */}
                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor={`quantity-${item.id}`} className="sr-only">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            id={`quantity-${item.id}`}
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-none"
                            onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                          />
                        </form>
                        {/* Remove item button */}
                        <button className="text-gray-600 transition hover:text-red-600">
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
    
                {/* Cart actions */}
                <div className="space-y-4 text-center">
                  <a
                    href="#"
                    className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                  >
                    View my cart ({cartItems.length})
                  </a>
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
    }
    

export default ShoppingCart