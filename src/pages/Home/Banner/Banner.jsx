import { useEffect, useState } from "react";

import img1 from '../../../assets/Banner/flame-grilled-meat-cooking-flames-generative-ai.jpg'
import img2 from '../../../assets/Banner/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai(1).jpg'
import img3 from '../../../assets/Banner/grilled-seafood-paella-gourmet-healthy-meal-generated-by-ai.jpg'
import img4 from '../../../assets/Banner/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai.jpg'
import img5 from '../../../assets/Banner/arabic-shaurma-with-stuffings-lavash.jpg'

const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const sliders = [
    { img: img1, title: "Escape 1", text: "Delicious food made with love. Explore our diverse menu and experience a culinary journey like never before." },
    { img: img2, title: "Escape 2" },
    { img: img3, title: "Escape 3" },
    { img: img4, title: "Escape 4" },
    { img: img5, title: "Escape 5" },
  ];

  const prevSlider = () =>
    setCurrentSlider((currentSlider) => (currentSlider === 0 ? sliders.length - 1 : currentSlider - 1));

  const nextSlider = () =>
    setCurrentSlider((currentSlider) => (currentSlider === sliders.length - 1 ? 0 : currentSlider + 1));

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentSlider((currentSlider) => (currentSlider === sliders.length - 1 ? 0 : currentSlider + 1)), 5000);
    return () => clearInterval(intervalId);
  }, [currentSlider, sliders.length]);

  return (

    <>
      <div className="mx-auto h-[320px] md:h-[640px] flex flex-col lg:flex-row items-center overflow-hidden gap-5 lg:gap-10  cursor-auto">
   
       
        {/* slider container */}
        <div className="">
          {/* arrow */}
          <div className="absolute w-full h-full flex items-center justify-between z-20 px-5">
            {/* arrow left */}
            <button onClick={prevSlider} className="flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8">
              <svg viewBox="0 0 1024 1024" className="w-4 h-4 md:w-6 md:h-6 icon" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
                </g>
              </svg>
            </button>
            {/* arrow right */}
            <button onClick={nextSlider} className="flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8">
              <svg viewBox="0 0 1024 1024" className="w-4 h-4 md:w-6 md:h-6 icon" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(180)">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
                </g>
              </svg>
            </button>
          </div>
          {/* dots */}
          <div className=" hidden md:flex justify-center items-center rounded-full z-50 absolute bottom-1/3  w-full gap-1">
            {sliders.map((_, inx) => (
              <button
                key={inx}
                onClick={() => setCurrentSlider(inx)}
                className={`rounded-full duration-300 bg-white ${currentSlider === inx ? "w-10" : "w-2"} h-2`}
              ></button>
            ))}
          </div>
          {/* slider container */}
          <div className="ease-linear duration-300 flex transform-gpu relative" style={{ transform: `translateX(-${currentSlider * 100}%)` }}>
  {/* sliders */}
  {sliders.map((slide, inx) => (
    <div key={inx} className="min-w-full duration-200 relative">
      <img
        src={slide.img}
        className="w-full h-80 md:h-[680px] object-cover"
        alt={`Slider - ${inx + 1}`}
      />
      <div className="absolute top-1/2 left-4 sm:left-28 transform -translate-y-1/2 p-4 md:p-8 rounded-lg shadow-xl overflow-hidden text-white bg-opacity-80 md:flex md:items-center md:justify-center">
        <div className="text-center md:text-left md:max-w-lg lg:max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4">
            Indulge Your Senses in Culinary Bliss at <span className="text-orange-600">MadeBest</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-4">
            Welcome to a Gastronomic Journey of Flavor and Elegance
            <span> </span>
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 md:space-x-3">
            <a
              href="javascript:void(0)"
              className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-400 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none cursor-pointer"
            >
              Order Now
            </a>
            <a
              href="#reserve"
              className="bg-yellow-500 text-gray-800 hover:bg-yellow-400 py-2 px-4 rounded-full uppercase tracking-wide font-semibold transition duration-300"
            >
              Reserve Your Table
            </a>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
     

      </div>
      {/* slider container */}
      <div className="flex justify-center items-center gap-3 p-2 bg-white">
        {/* sliders */}
        {sliders.map((slide, inx) => (
          <img
            onClick={() => setCurrentSlider(inx)}
            key={inx}
            src={slide.img}
            className={`w-10 md:w-20 h-6 sm:h-8 md:h-12 ${currentSlider === inx ? 'border-2 border-black p-px' : ''} rounded-md md:rounded-lg box-content cursor-pointer`}
            alt={slide.title}
          />
        ))}
      </div>
     
    </>


  );
};

export default Banner;
