// Navbar.js
import React, { useContext, useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import ShoppingCart from '../../Component/ShoppingCart';
import useCart from '../../hooks/useCart';
import LazyImage from '../../Component/LazyImage';

const Navbar = memo(() => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false); // State to manage the cart popup

  const { user, logOut } = useContext(AuthContext)

  const [cart] = useCart();

  const navigation = [
    { title: 'Home', path: '/' },
    { title: 'Contact Us', path: 'contact' },
    { title: 'Our Menu', path: 'ourmenu' },
    { title: 'Our Shop', path: 'order' },
  ];

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const toggleCart = useCallback(() => {
    setCartOpen(prev => !prev);
  }, []);

  const handleSignOut = useCallback(() => {
    logOut()
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  }, [logOut]);

  return (
    <nav className="z-50 border-none w-full md:absolute md:text-sm md:border-none ">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-2 md:py-2 md:block">
          <Link to='/'>
            <LazyImage
              className="bg-gray-900 rounded-full w-30 h-50"
              src="https://i.ibb.co/VNs4X6g/1705932001959oh7xa24u-removebg-preview.png"
              alt="MadeBest Logo"
              width={100}
              height={30}
            />
          </Link>

          <div className="md:hidden">
            <button
              className="text-gray-800 hover:text-gray-900"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`flex-1 pb-3 mt-8  md:block md:pb-0 md:mt-0 ${isMenuOpen ? 'block' : 'hidden'
            }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0  ">
            {navigation.map((item, idx) => (
              <li
                key={idx}
                className="text-black md:text-white    hover:text-orange-600 uppercase font-semibold"
              >
                <Link to={item.path} className=" hover:text-orange-600">
                  {item.title}
                </Link>
              </li>
            ))}

{user && (
              <li className="text-black  md:text-white    hover:text-orange-600 uppercase font-semibold">
                <Link to="dashboard" className=" hover:text-orange-600">
                  Dashboard
                </Link>
              </li>
            )}
               <li onClick={toggleCart} className='text-black md:text-white cursor-pointer bg-black    w-20  md:bg-transparent  md:hover:bg-orange-500 rounded-full   hover:text-orange-600 uppercase font-semibold'> <div className="relative">

              <svg  width="44px" className='mx-auto' height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

              <span className="bg-red-500  text-white w-5 h-5 rounded-full flex items-center justify-center text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">{cart.length}</span>
            </div></li>
            {isCartOpen && <ShoppingCart cart={cart} />}

           

            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0 font-semibold">

              <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0 font-semibold">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="block py-3 text-center text-gray-100 bg-orange-500 p-2 hover:text-black border rounded-lg md:border-none"
                  >
                    Log out
                  </button>
                ) : (
                  <>
                    <li>
                      <Link to='/login' className="block py-3 text-center text-gray-100 bg-orange-500 p-2 hover:text-black border rounded-lg md:border-none">
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link to='/signup' className="block py-3 px-4 font-medium text-center text-white bg-gray-700 hover:bg-black active:bg-orange-700 active:shadow-none rounded-lg shadow md:inline">
                        Sign up
                      </Link>
                    </li>
                  </>
                )}
              </div>

            </div>
          </ul>
        </div>
      </div>
    </nav>

  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
