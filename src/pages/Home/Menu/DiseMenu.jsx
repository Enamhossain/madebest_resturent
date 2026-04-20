import React from 'react';
import UseText from '../../../Component/HeadingText/UseText';
import MenuCard from './MenuCard';
import { Link } from 'react-router-dom';
import useMenu from '../../../hooks/useMenu';
import Loading from '../../../Component/Loading';
import { HiArrowRight } from 'react-icons/hi';

function DiseMenu() {
  const [menu, loading] = useMenu();
  const popular = menu.filter(item => item.category === 'popular');

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <UseText 
          subheading="Our Specialties" 
          heading="Chef's Recommended" 
        />
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loading />
            </div>
          ) : (
            popular.map((item, index) => (
              <MenuCard
                key={item._id || index}
                _id={item._id}
                title={item.Title}
                price={item.price}
                description={item.description}
                image={item.img}
                inx={index}
              />
            ))
          )}
        </div>

        <div className="flex justify-center">
          <Link
            to="/ourmenu"
            className="group flex items-center gap-3 px-10 py-4 bg-foreground text-background font-bold rounded-full hover:bg-primary transition-all duration-300 shadow-xl"
          >
            <span>Explore Full Menu</span>
            <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DiseMenu;
