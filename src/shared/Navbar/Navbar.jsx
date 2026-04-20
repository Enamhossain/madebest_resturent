import React, { useContext, useState, memo, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import ShoppingCart from '../../Component/ShoppingCart';
import useCart from '../../hooks/useCart';
import LazyImage from '../../Component/LazyImage';
import { HiMenuAlt3, HiX, HiOutlineShoppingBag, HiUserCircle } from 'react-icons/hi';
import { useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/axiosPublic';

const Navbar = memo(() => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const location = useLocation();
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();

  const navigation = [
    { title: 'Home', path: '/' },
    { title: 'Our Menu', path: '/ourmenu' },
    { title: 'Our Shop', path: '/order' },
    { title: 'Contact', path: '/contact' },
  ];

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
  const toggleCart = useCallback(() => setCartOpen(prev => !prev), []);

  const handleSignOut = useCallback(() => {
    logOut().catch(error => console.error('Error signing out:', error));
  }, [logOut]);

  const isActive = (path) => location.pathname === path;

  // Prefetching logic for faster transitions
  const prefetchMenu = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ['menu'],
      queryFn: async () => {
        const res = await axiosPublic.get('/menu');
        return res.data;
      },
      staleTime: 1000 * 60 * 60,
    });
  }, [queryClient, axiosPublic]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-background/80 backdrop-blur-lg shadow-lg border-b border-border' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300">
               <LazyImage
                src="https://i.ibb.co/VNs4X6g/1705932001959oh7xa24u-removebg-preview.png"
                alt="MadeBest Logo"
                className="w-full h-full object-cover p-1 bg-white"
                width={48}
                height={48}
              />
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              Made<span className="text-primary">Best</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    onMouseEnter={item.path === '/ourmenu' ? prefetchMenu : undefined}
                    className={`text-sm font-semibold uppercase tracking-wider transition-all hover:text-primary relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full ${
                      isActive(item.path) 
                        ? 'text-primary after:w-full' 
                        : isScrolled ? 'text-foreground' : 'text-white/90'
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <Link 
                    to="/dashboard"
                    className={`text-sm font-semibold uppercase tracking-wider transition-all hover:text-primary ${
                      isActive('/dashboard') ? 'text-primary' : isScrolled ? 'text-foreground' : 'text-white/90'
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>

            <div className="flex items-center gap-4 pl-6 border-l border-border/20">
              {/* Cart Button */}
              <button 
                onClick={toggleCart}
                className={`relative p-2 rounded-full transition-all hover:bg-primary/10 ${
                  isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-primary'
                }`}
                aria-label="View Cart"
              >
                <HiOutlineShoppingBag className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* User Actions */}
              {user ? (
                <div className="flex items-center gap-3">
                   <div className="flex flex-col items-end">
                      <span className={`text-xs font-medium ${isScrolled ? 'text-foreground' : 'text-white/80'}`}>{user.displayName || 'User'}</span>
                      <button 
                        onClick={handleSignOut}
                        className="text-[10px] uppercase font-bold text-primary hover:underline"
                      >
                        Sign Out
                      </button>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <HiUserCircle className={`w-8 h-8 ${isScrolled ? 'text-primary' : 'text-white'}`} />
                   </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link 
                    to="/login"
                    className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:bg-primary/10 ${
                      isScrolled ? 'text-foreground' : 'text-white'
                    }`}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    className="text-sm font-semibold px-6 py-2 bg-primary text-white rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-95"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleCart}
              className={`relative p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              <HiOutlineShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-[110] bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
             <span className="text-2xl font-bold">Made<span className="text-primary">Best</span></span>
             <button onClick={toggleMenu} className="p-2 bg-muted rounded-full">
                <HiX className="w-6 h-6" />
             </button>
          </div>
          
          <ul className="flex flex-col gap-6 mb-12">
            {navigation.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  onClick={toggleMenu}
                  onMouseEnter={item.path === '/ourmenu' ? prefetchMenu : undefined}
                  className={`text-2xl font-bold ${isActive(item.path) ? 'text-primary' : 'text-foreground/70'}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link 
                  to="/dashboard"
                  onClick={toggleMenu}
                  className={`text-2xl font-bold ${isActive('/dashboard') ? 'text-primary' : 'text-foreground/70'}`}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
            {user ? (
              <button 
                onClick={() => { handleSignOut(); toggleMenu(); }}
                className="w-full py-4 bg-muted text-foreground font-bold rounded-2xl"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={toggleMenu}
                  className="w-full py-4 bg-muted text-center text-foreground font-bold rounded-2xl"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  onClick={toggleMenu}
                  className="w-full py-4 bg-primary text-center text-white font-bold rounded-2xl"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleCart} />
          <div className="relative w-full max-w-md bg-background h-full shadow-2xl animate-in slide-in-from-right duration-300">
            <ShoppingCart cart={cart} onClose={toggleCart} />
          </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
