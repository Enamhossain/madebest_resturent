import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/AxiosSecure';
import useCart from '../../../hooks/useCart';




function MenuCard({ title, price, description, image, _id }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure()
  const [, refetch] = useCart()
 
  const handleAddToCart = () => {

    if (user && user.email) {
      console.log("User is logged in. Adding to cart...");
      // TODO: Send cart item to the database

      const cartItem = {
        menuId: _id,
        email: user.email,
        title,
        price,
        image
      };


      axiosSecure.post('/carts', cartItem)
        .then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            swal("Good job!", "You clicked the button!", "success", {
              timer: 1500,
              name: `${title}`
            });


          }
          // refetch cart to update cart items count
          refetch()
        })
    }
    else {
      console.log("User is not logged in. Showing validation popup...");
      swal({
        title: "You are not Logged In",
        text: "Please login to add to the cart ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDeleted) => {
        if (willDeleted) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = description.length > 20 ? `${description.slice(0, 70)}...` : description;

  return (
    <div className="max-w-md mx-auto bg-gray-100 md:rounded-l-full shadow-lg overflow-hidden md:max-w-2xl mt-3 relative">
      {/* Heart Icon */}
      <div className="absolute top-0 right-0 m-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4c2.21 0 4 1.78 4 4 0 4.18-8 10-8 10S4 12.18 4 8c0-2.22 1.79-4 4-4z" />
        </svg>
      </div>

      <div className="md:flex">
        <div className="md:shrink-0">
          <img className="h-56 w-full rounded-md object-cover  md:h-full md:w-20 items-center md:rounded-2xl" src={image} alt="Modern building architecture" />
        </div>
        <div className="p-3 flex flex-col justify-between">
          <div>
            <span className="uppercase text-sm text-red-500 font-semibold underline">{price} Taka </span>
            <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</a>
            <p className="mt-2 text-slate-500 overflow-hidden">{showFullDescription ? description : truncatedDescription}</p>
            {description.length > 40 && (
              <button onClick={handleToggleDescription} className="text-orange-600 hover:text-orange-800">
                {showFullDescription ? 'See less' : 'See more'}
              </button>
            )}
          </div>
          {/* Cart Icon */}
          <button onClick={handleAddToCart} className="flex items-center gap-2 px-6 py-2 text-orange-600 rounded-lg duration-150 active:bg-indigo-200 mt-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 6L13 8L17 4" stroke="#e6aa05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
