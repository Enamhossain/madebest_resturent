import { useEffect, useState, useCallback, memo } from "react";

const sliders = [
  {
    img: "https://i.ibb.co/nDDwsw0/flame-grilled-meat-cooking-flames-generative-ai.jpg",
    title: "Escape 1",
  },
  {
    img: "https://i.ibb.co/RcKz5NC/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai.jpg",
    title: "Escape 2",
  },
  {
    img: "https://i.ibb.co/ZM2CwXT/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai-1.jpg",
    title: "Escape 3",
  },
  {
    img: "https://i.ibb.co/whLv16L/frying-pan-with-burning-fire-inside-1.jpg",
    title: "Escape 4",
  },
  {
    img: "https://i.ibb.co/JcxpjqP/grilled-seafood-paella-gourmet-healthy-meal-generated-by-ai.jpg",
    title: "Escape 5",
  },
];

const Banner = memo(() => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const prevSlider = useCallback(() =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? sliders.length - 1 : currentSlider - 1
    ), []);

  const nextSlider = useCallback(() =>
    setCurrentSlider((currentSlider) =>
      currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
    ), []);

  useEffect(() => {
    // Preload images for better UX
    sliders.forEach((slide, idx) => {
      if (idx <= 1) { // Preload first 2 images
        const img = new Image();
        img.src = slide.img;
      }
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCurrentSlider((currentSlider) =>
          currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
        ),
      5000
    );
    return () => clearInterval(intervalId);
  }, []);

  const handleButtonClick = useCallback(() => {
    const sectionElement = document.getElementById("menu-section");
    if (sectionElement) {
      const offsetTop = sectionElement.offsetTop;
      window.scroll({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  const handleImageLoad = (idx) => {
    setLoadedImages(prev => new Set([...prev, idx]));
  };

  return (
    <>
      <div className="mx-auto h-[320px] md:h-[640px] flex flex-col lg:flex-row items-center overflow-hidden gap-5 lg:gap-10 cursor-auto">
        <div className="">
          <div className="absolute w-full h-full flex items-center justify-between z-20 px-5">
            <button
              onClick={prevSlider}
              aria-label="Previous slide"
              className="flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
            >
              <svg
                viewBox="0 0 1024 1024"
                className="w-4 h-4 md:w-6 md:h-6 icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#0095FF"
                    d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
                  ></path>
                </g>
              </svg>
            </button>

            <button
              onClick={nextSlider}
              aria-label="Next slide"
              className="flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
            >
              <svg
                viewBox="0 0 1024 1024"
                className="w-4 h-4 md:w-6 md:h-6 icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                transform="rotate(180)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#0095FF"
                    d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>

          <div className=" hidden md:flex justify-center items-center rounded-full z-50 absolute bottom-1/3  w-full gap-1">
            {sliders.map((_, inx) => (
              <button
                key={inx}
                onClick={() => setCurrentSlider(inx)}
                className={`rounded-full duration-300 bg-white ${
                  currentSlider === inx ? "w-10" : "w-2"
                } h-2`}
              ></button>
            ))}
          </div>

          <div
            className="ease-linear duration-300 flex transform-gpu relative"
            style={{ transform: `translateX(-${currentSlider * 100}%)` }}
          >
            {sliders.map((slide, inx) => (
              <div key={inx} className="min-w-full duration-200 relative">
                <img
                  src={slide.img}
                  className="w-full h-80 md:h-[680px] object-cover"
                  alt={`Slider - ${inx + 1}`}
                  loading={inx < 2 ? "eager" : "lazy"}
                  onLoad={() => handleImageLoad(inx)}
                  decoding="async"
                />
                <div className="absolute top-1/2 left-4 sm:left-28 transform -translate-y-1/2 p-4 md:p-8 rounded-lg shadow-xl  text-white bg-opacity-80 md:flex md:items-center md:justify-center">
                  <div className="text-center md:text-left md:max-w-lg lg:max-w-xl">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4">
                      Indulge Your Senses in Culinary Bliss at{" "}
                      <span className="text-orange-600">MadeBest</span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl mb-4">
                      Welcome to a Gastronomic Journey of Flavor and Elegance
                      <span> </span>
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-3 md:space-x-3">
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-400 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none cursor-pointer"
                      >
                        Order Now
                      </a>
                      <button onClick={handleButtonClick}>
                        <a
                          href="#reserve"
                          className="bg-yellow-500 cursor-pointer text-gray-800 hover:bg-yellow-400 py-2 px-4 rounded-full uppercase tracking-wide font-semibold transition duration-300"
                        >
                          Reserve Your Table
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 p-2 bg-white">
        {sliders.map((slide, inx) => (
          <img
            onClick={() => setCurrentSlider(inx)}
            key={inx}
            src={slide.img}
            className={`w-10 md:w-20 h-6 sm:h-8 md:h-12 transition-opacity ${
              currentSlider === inx ? "border-2 border-black p-px opacity-100" : "opacity-60 hover:opacity-90"
            } rounded-md md:rounded-lg box-content cursor-pointer`}
            alt={slide.title}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </>
  );
});

Banner.displayName = 'Banner';

export default Banner;
