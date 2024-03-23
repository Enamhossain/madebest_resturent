import React from 'react';
import UseText from '../../../Component/HeadingText/UseText';
import './Service.css'
import { Link } from 'react-router-dom';

function Service() {
  return (
    <div className='p-8 service  '  id='reserver' >
      <UseText heading={'Our Service'} subheading={'Services'}></UseText>
      <article className="flex flex-wrap container mx-auto  bg-white transition drop-shadow-xl ">
        <div className="md:basis-1/2">
          <img alt="Guitar" src='https://i.ibb.co/RTpf1ZJ/crop-man-eating-dessert-cafe.jpg' className="h-60 w-full object-cover" />
        </div>
        <div className=" block md:flex md:flex-1 md:flex-col ">
          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
            <a href="#">
              <h3 className="font-bold uppercase text-gray-900">Corporate</h3>
            </a>
            <p className="mt-2 mb-4  md:w-1/2 text-sm/relaxed text-gray-700">
              Enhance your corporate events with our professional services. Whether it's a business meeting or a conference, we provide top-notch solutions to make your events successful.
            </p>
            <Link to="/Booking" className="rounded-full shadow-lg  bg-yellow-300  p-3  text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400">
              Book Now
            </Link>
          </div>
        </div>
      </article>

      <article className="flex flex-wrap-reverse  container mx-auto bg-white transition drop-shadow-xl  mt-8 ">
        <div className="md:flex md:flex-1 md:flex-col ">
          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          
              <h3 className="font-bold uppercase text-gray-900">Wedding Event</h3>
            
            <p className="mt-2 mb-4  md:w-1/2 text-sm/relaxed text-gray-700">
              Make your special day memorable with our wedding and event services. From elegant decorations to flawless execution, we ensure your celebrations are perfect and stress-free.
            </p>
            <Link to="/Booking" className="rounded-full shadow-lg  bg-yellow-300  p-3  text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400">
              Book Now
            </Link>
          </div>
        </div>
        <div className="md:basis-1/2 ">
          <img alt="Guitar" src= 'https://i.ibb.co/j3V6qp4/close-up-people-serving-themselves-fruits-buffet-restaurant.jpg'  className=" md:h-60 md:w-full object-cover" />
        </div>
      </article>

      <article className="flex flex-wrap  container mx-auto bg-white transition drop-shadow-xl  mt-8 ">
        <div className="md:basis-1/2 ">
          <img alt="Guitar" src='https://i.ibb.co/mGh12Yd/man-holding-smartphone-newspaper-during-breakfast.jpg' className="md:h-64 w-full object-cover" />
        </div>
        <div className="md:flex md:flex-1 md:flex-col">
          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
            <a href="#">
              <h3 className="font-bold uppercase text-gray-900">Private Dining</h3>
            </a>
            <p className="mt-2 mb-4 md:w-1/2 text-sm/relaxed text-gray-700">
              Experience an exclusive dining atmosphere with our private dining services. From intimate gatherings to corporate dinners, we provide a curated culinary experience, ensuring your event is both delightful and sophisticated.
            </p>
            <Link to="/Booking" className="rounded-full shadow-lg bg-yellow-300 p-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400">
              Book Now
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Service;
