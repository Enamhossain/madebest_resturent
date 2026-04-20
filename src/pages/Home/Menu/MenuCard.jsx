import React, { useContext, memo, useCallback } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/AxiosSecure';
import useCart from '../../../hooks/useCart';
import LazyImage from '../../../Component/LazyImage';
import { HiPlus, HiOutlineHeart } from 'react-icons/hi';

const MenuCard = memo(({ title, price, description, image, _id, inx }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = useCallback(() => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        title,
        price,
        image
      };

      axiosSecure.post('/carts', cartItem)
        .then(res => {
          if (res.data.insertedId) {
            swal("Added!", `${title} has been added to your cart.`, "success", {
              timer: 1500,
              buttons: false,
            });
            refetch();
          }
        })
        .catch(err => {
           console.error('Error adding to cart:', err);
           swal("Error", "Could not add item to cart.", "error");
        });
    } else {
      swal({
        title: "Login Required",
        text: "Please sign in to add delicious items to your cart!",
        icon: "info",
        buttons: ["Maybe later", "Login now"],
        dangerMode: false,
      }).then((login) => {
        if (login) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  }, [user, _id, title, price, image, axiosSecure, refetch, navigate, location]);

  return (
    <div 
      data-aos="fade-up" 
      data-aos-delay={inx * 100}
      className="group relative flex flex-col h-full bg-card rounded-[2.5rem] p-4 border border-border transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 overflow-hidden"
    >
      {/* Dynamic Price Badge */}
      <div className="absolute top-8 right-8 z-10">
        <div className="px-5 py-2 bg-primary/90 backdrop-blur-md text-white font-black rounded-full shadow-lg border border-white/20">
          ${price}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-8 left-8 z-10 flex flex-col gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
         <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-colors">
            <HiOutlineHeart size={20} />
         </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem]">
        <LazyImage 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={image} 
          alt={title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 pt-6">
        <h3 className="text-2xl font-black text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 font-medium">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 leading-none mb-1">Price</span>
            <span className="text-xl font-black text-foreground">${price}</span>
          </div>

          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 pl-6 pr-4 py-3 bg-foreground text-background rounded-2xl font-bold transition-all hover:bg-primary hover:text-white active:scale-95 group/btn"
          >
            <span>Add Order</span>
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                <HiPlus />
            </div>
          </button>
        </div>
      </div>
      
      {/* Background Micro-decoration */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    </div>
  );
});

MenuCard.displayName = 'MenuCard';

export default MenuCard;
