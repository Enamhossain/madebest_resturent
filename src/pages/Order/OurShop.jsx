import React, { useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import PageSkeleton from '../../Component/PageSkeleton';
import LazyImage from '../../Component/LazyImage';
import UseText from '../../Component/HeadingText/UseText';

const shopGalleries = [
  {
    title: "Gourmet Selections",
    images: [
      "https://img.freepik.com/free-photo/pork-hock-german-with-sauces-dark-background_1150-45508.jpg?w=996",
      "https://img.freepik.com/free-photo/tortilla-wrap-with-falafel-fresh-salad-vegan-tacos-vegetarian-healthy-food_2829-6193.jpg?w=996"
    ]
  },
  {
    title: "Daily Specials",
    images: [
      "https://img.freepik.com/free-photo/side-view-fried-meat-with-french-fries-ketchup_141793-4908.jpg?w=996",
      "https://img.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg?w=996",
      "https://img.freepik.com/free-photo/fresh-grill-bbq-chicken_144627-7526.jpg?w=996"
    ]
  }
];

const OurShop = memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageSkeleton type="shop" />;
  }

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Our Shop | MadeBest Restaurant</title>
      </Helmet>

      {/* Modern Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
           <img 
              src="https://images.unsplash.com/photo-1550966841-3eeec17819ce?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-60 scale-105"
              alt="Shop Banner"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Official Merchandise</span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none">
              Gourmet <span className="text-primary">Shop</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-medium max-w-xl">
              Bring the MadeBest experience to your home. Explore our curated selection of premium ingredients and signature items.
            </p>
          </div>
        </div>
      </section>

      {/* Shop Galleries */}
      <section className="py-24 container mx-auto px-4">
        <div className="space-y-32">
          {shopGalleries.map((gallery, gIdx) => (
            <div key={gIdx} className="space-y-12">
               <UseText 
                  heading={gallery.title} 
                  subheading="Exclusively MadeBest" 
               />
               
               <div className={`grid gap-8 ${gallery.images.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                  {gallery.images.map((img, iIdx) => (
                    <div 
                      key={iIdx} 
                      className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-muted transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                      data-aos="fade-up"
                      data-aos-delay={iIdx * 100}
                    >
                       <LazyImage 
                          src={img} 
                          alt={`${gallery.title} - ${iIdx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                          <button className="px-6 py-3 bg-primary text-white font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                             Quick View
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Footer Call-to-Action */}
      <section className="py-24 bg-foreground text-background">
         <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-black max-w-3xl mx-auto leading-tight">
               Want Special <span className="text-primary">Curated</span> Packages?
            </h2>
            <p className="text-background/60 text-lg max-w-2xl mx-auto">
               Our team can put together custom gift hampers or event boxes specifically tailored for your needs. Reach out for corporate orders.
            </p>
            <button className="px-12 py-5 bg-primary text-white font-black rounded-full hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] transition-all active:scale-95">
               Contact Corporate Sales
            </button>
         </div>
      </section>
    </div>
  );
});

OurShop.displayName = 'OurShop';

export default OurShop;
