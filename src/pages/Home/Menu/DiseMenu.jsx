import React, { useEffect, useState } from 'react';
import UseText from '../../../Component/HeadingText/UseText';
import MenuCard from './MenuCard';
import {Link} from 'react-router-dom'
import useMenu from '../../../hooks/useMenu';


function DiseMenu() {
  const [menu] = useMenu();
  const popular = menu.filter(item => item.category === 'popular');

  


  return (
    <div
      className='mt-5 p-3 '
      style={{
       
      }}
    >
      <UseText subheading={'Menus'} heading={'Discover Our Menus'} />
  
      <br />
      <div className='container mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 mt-5 '>
        {popular.map((item, index) => (
       
          <MenuCard
            key={index}
            _id={item._id}
            title={item.Title}
            price={item.price}
            description={item.description}
            image={item.img}
        
            
          />
        ))}
      </div>
      <div className=" flex justify-center items-center mb-10">
        <Link to='/ourmenu'
          className="bg-orange-500 hover:bg-black text-white font-bold py-2 px-4 mt-2 rounded-full"
        
        >
          View All
        </Link>
      </div>
    </div>
  );
}

export default DiseMenu;
