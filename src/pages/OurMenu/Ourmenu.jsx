import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import MenuCard from '../Home/Menu/MenuCard';
import useMenu from '../../hooks/useMenu';
import Loading from '../../Component/Loading';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
function Ourmenu() {
  const [menu,loading] = useMenu();
  
  useEffect(() => {
    AOS.init();
}, []);


  const sections = [
    { title: 'Main Dish', category: 'Main' },
    { title: 'Dessert', category: 'Dessert' },
    { title: 'Pizza', category: 'pizza' },
    { title: 'Drinks', category: 'Drinks' },
    { title: 'Salad', category: 'salad' }
  ];

  if (loading) {
    return <Loading/>; // Render loading state if data is still being fetched
  }
  const handleButtonClick = () => {
    const sectionElement = document.getElementById('menu-section');
    if (sectionElement) {
      const offsetTop = sectionElement.offsetTop;
      window.scroll({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ position: 'relative' }} className='bg-gray-100'>
      <Helmet>
        <title>Our menu | MadeBest</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>

      {/* Banner */}
      <div className="p-6 py-12 " style={{
        backgroundImage: 'url(https://i.ibb.co/Y2B7YpJ/Black-Orange-Modern-Food-Promotion-Banner.png)',
        backgroundSize: 'cover',
        width: '100%',
        height: '80vh',
        backgroundPosition: 'center',
      }}>
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <button className=" font-bold  mt-96  text-sm  text-center rounded-lg shadow-lg focus:shadow-none " onClick={handleButtonClick}>
              <svg width="212px" height="112px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f7f7f7" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.576"> <path d="M9 13L12 16M12 16L15 13M12 16V8M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z" stroke="#ff7b00" stroke-width="0.096" stroke-linecap="round" stroke-linejoin="round"></path> </g><g id="SVGRepo_iconCarrier"> <path d="M9 13L12 16M12 16L15 13M12 16V8M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z" stroke="#ff7b00" stroke-width="0.648" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
         <div   data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
         <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Delicious Food Menu Gallery
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Check out our mouth-watering dishes.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 container mx-auto">
            {/* Sample food images */}
            <div className="relative">
              <img
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                src='https://i.ibb.co/ZTS6kZh/condiment-craze-collage-design.jpg'
                alt="Delicious Food 1"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-2xl font-extrabold ">Seasonal Special</p>
              </div>
            </div>
            <div className="relative">
              <img
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                src='https://i.ibb.co/sqvpYJg/ready-eat-meals-arrangement.jpg'
                alt="Delicious Food 2"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-2xl font-extrabold">50% OFF Today</p>
              </div>
            </div>
            <div className="relative col-span-1 lg:col-span-2">
              <img
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                src='https://i.ibb.co/6gfLQgy/side-view-people-with-menus-restaurant.jpg'
                alt="Delicious Food 3"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-4xl font-extrabold">Special Menu</p>
              </div>
              </div>
              </div>
         </div>
          

          {/* Render Menu Sections */}
        <div id='menu-section'>
        {sections.map((section, index) => (
            <div key={index} className="mt-10">
              <h2 className="text-3xl font-extrabold text-center text-orange-500 uppercase border-orange-500 pb-4">
                {section.title}
              </h2>
              <hr className="w-80 border-gray-800 text-center mx-auto" />
              <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
                {/* Filter and render menu items for the current section */}
                {menu
                  .filter(item => item.category === section.category)
                  .map((item, index) => (
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
            </div>
          ))}
        </div>
        </div>
      

  );
}

export default Ourmenu;
