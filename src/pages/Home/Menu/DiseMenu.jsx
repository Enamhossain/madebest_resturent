import React from 'react';
import UseText from '../../../Component/HeadingText/UseText';
import MenuCard from './MenuCard';

import Fish from '../../../assets/MenusItems/salmon-steak-white-plate.jpg';
import Beef from '../../../assets/MenusItems/beef-meat-plate.jpg';
import Kabab from '../../../assets/MenusItems/chicken-kebab-lavash-servede.jpg';
import Wings from '../../../assets/MenusItems/ChickenWings.jpg';
import Pasta from '../../../assets/MenusItems/Pasta.jpg';
import Pizza from '../../../assets/MenusItems/vegetarian-pizza.jpg';
import birger from '../../../assets/MenusItems/birger-with-meat-tomatoess.jpg';
import spaghetti from '../../../assets/MenusItems/spaghetti-with-vegetables.jpg';
import vegetarian from '../../../assets/MenusItems/shaurma-inside-lavash-bread-with-french-fries-ketchup.jpg';
import backgroundImg from '../../../assets/bg/flat-lay-plate-mussels-pasta-with-copyspace.jpg'
import { Link } from 'react-router-dom';

function DiseMenu() {
  const Items = [
    {
      Title: 'Fish Fillet',
      Price: '150 TAKA',
      description: 'Indulge in our Fish Fillet, a culinary masterpiece. Delicately seasoned, perfectly seared – a seafood sensation in every bite.',
      img: Fish,
    },
    {
      Title: 'Beef Delight',
      Price: '180 TAKA',
      description: 'Savor the richness of our Beef Delight, expertly prepared for an unforgettable dining experience.',
      img: Beef,
    },
    {
      Title: 'Chicken Kabab',
      Price: '120 TAKA',
      description: 'Enjoy the succulence of our Chicken Kabab, a flavorful delight served with lavash.',
      img: Kabab,
    },
    {
      Title: 'Crispy Chicken Wings',
      Price: '100 TAKA',
      description: 'Treat yourself to our Crispy Chicken Wings, seasoned to perfection and served with your favorite dip.',
      img: Wings,
    },
    {
      Title: 'Pasta Perfection',
      Price: '130 TAKA',
      description: 'Delight in the exquisite taste of our Pasta Perfection, a symphony of flavors in every forkful.',
      img: Pasta,
    },
    {
      Title: 'Vegetarian Pizza',
      Price: '160 TAKA',
      description: 'Satisfy your taste buds with our Vegetarian Pizza, loaded with fresh vegetables and melted cheese.',
      img: Pizza,
    },
    {
      Title: 'Burger Bliss',
      Price: '140 TAKA',
      description: 'Experience Burger Bliss with our juicy and flavorful cheeseburger, a classic favorite.',
      img: birger,
    },
    {
      Title: 'Spaghetti Veggie Delight',
      Price: '120 TAKA',
      description: 'Delve into the Veggie Delight with our Spaghetti, a hearty blend of fresh vegetables and pasta.',
      img: spaghetti,
    },
    {
      Title: 'Fresh Garden Salad',
      Price: '90 TAKA',
      description: 'Revitalize your senses with our Fresh Garden Salad, a healthy and refreshing choice.',
      img: vegetarian,
    },
    // Add more items as needed
  ];

  return (
    <div
      className='mt-5 p-3 '
      style={{
        // backgroundImage: `url(${backgroundImg})`, // Use the imported image variable
        // backgroundRepeat: 'no-repeat',
        // filter: 'grayscale(0%) brightness(80%) contrast(140%) ',
        // backgroundPosition:'center',
        // backgroundSize:'100%',
        // backgroundColor:'rgba(255, 0, 0, 0.3)'
      }}
    >
      <UseText subheading={'Menus'} heading={'Discover Our Menus'} />

      <div className='container mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 '>
        {Items.map((item, index) => (
          <MenuCard
            key={index}
            title={item.Title}
            price={item.Price}
            description={item.description}
            image={item.img}
          />
        ))}
      </div>
      <div className=" flex justify-center items-center mb-10">
        <button className="bg-orange-500 hover:bg-black text-white font-bold py-2 px-4 mt-2 rounded-full">
         <Link to='ourmenu'>  View All</Link>
        </button>
      </div>
    </div>
  );
}

export default DiseMenu;
