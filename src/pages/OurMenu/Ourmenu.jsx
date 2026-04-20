import React, { useEffect, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import MenuCard from '../Home/Menu/MenuCard';
import useMenu from '../../hooks/useMenu';
import { initAOS } from '../../utils/aosInit';
import SkeletonCard from '../../Component/SkeletonCard';
import UseText from '../../Component/HeadingText/UseText';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';

const Ourmenu = memo(() => {
  const [menu, loading] = useMenu();
  
  useEffect(() => {
    initAOS();
  }, []);

  const sections = [
    { title: 'Signature Mains', category: 'Main' },
    { title: 'Divine Desserts', category: 'Dessert' },
    { title: 'Artisan Pizzas', category: 'pizza' },
    { title: 'Refreshing Drinks', category: 'Drinks' },
    { title: 'Crispy Salads', category: 'salad' }
  ];

  const scrollToMenu = () => {
    const el = document.getElementById('menu-discovery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Gourmet Menu | MadeBest Restaurant</title>
      </Helmet>

      {/* Immersive Menu Banner */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Menu Masterpiece"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        </div>
        
        <div className="container relative z-10 text-center space-y-8 animate-in fade-in zoom-in duration-1000">
           <span className="text-primary font-bold uppercase tracking-[0.4em] text-sm md:text-base">Culinary Artistry</span>
           <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter">
              OUR <span className="text-primary italic">MENU</span>
           </h1>
           <p className="text-white/80 text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto">
              A symphony of flavors, meticulously crafted for the most discerning palates.
           </p>
           
           <button 
             onClick={scrollToMenu}
             className="group flex flex-col items-center gap-4 mx-auto pt-12 cursor-pointer"
           >
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest group-hover:text-primary transition-colors">Start Discovery</span>
              <div className="w-10 h-16 rounded-full border-2 border-white/20 flex items-start justify-center p-2 group-hover:border-primary transition-colors">
                 <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
              </div>
           </button>
        </div>
      </section>

      {/* Discovery Gallery */}
      <section id="menu-discovery" className="py-24 bg-muted/20">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: "Seasonal Specials", img: "https://i.ibb.co/ZTS6kZh/condiment-craze-collage-design.jpg", badge: "Curated" },
                 { title: "Chef's Tasting", img: "https://i.ibb.co/sqvpYJg/ready-eat-meals-arrangement.jpg", badge: "Exclusive" },
                 { title: "Artisan Picks", img: "https://i.ibb.co/6gfLQgy/side-view-people-with-menus-restaurant.jpg", badge: "Premium" }
               ].map((item, idx) => (
                 <div key={idx} className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-xl" data-aos="zoom-in" data-aos-delay={idx * 100}>
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-10 left-10 space-y-2">
                       <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{item.badge}</span>
                       <h3 className="text-3xl font-black text-white">{item.title}</h3>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Main Menu Feed */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 space-y-32">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          ) : (
            sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-12" data-aos="fade-up">
                <UseText 
                  heading={section.title} 
                  subheading="Masterfully Prepared" 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {menu
                    .filter(item => item.category === section.category)
                    .map((item, mIdx) => (
                      <MenuCard
                        key={item._id || mIdx}
                        _id={item._id}
                        title={item.Title}
                        price={item.price}
                        description={item.description}
                        image={item.img}
                        inx={mIdx}
                      />
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
});

Ourmenu.displayName = 'Ourmenu';

export default Ourmenu;
