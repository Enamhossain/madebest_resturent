import { useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const sliders = [
  {
    img: "https://i.ibb.co/nDDwsw0/flame-grilled-meat-cooking-flames-generative-ai.jpg",
    title: "Culinary Excellence",
    subtitle: "Experience the art of fire-grilled perfection",
    tag: "Signature Dishes"
  },
  {
    img: "https://i.ibb.co/RcKz5NC/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai.jpg",
    title: "Italian Authenticity",
    subtitle: "Hand-crafted pizzas with the finest mozzarella",
    tag: "Hand Tossed"
  },
  {
    img: "https://i.ibb.co/ZM2CwXT/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai-1.jpg",
    title: "Pasta Perfection",
    subtitle: "Hearty bolognese with aged parmesan cheese",
    tag: "Traditional"
  },
  {
    img: "https://i.ibb.co/whLv16L/frying-pan-with-burning-fire-inside-1.jpg",
    title: "Masterful Flavour",
    subtitle: "Where passion meets the flame",
    tag: "Chef's Choice"
  },
  {
    img: "https://i.ibb.co/JcxpjqP/grilled-seafood-paella-gourmet-healthy-meal-generated-by-ai.jpg",
    title: "Seafood Delights",
    subtitle: "Gourmet healthy meals from the deep blue",
    tag: "Fresh Daily"
  },
];

const Banner = memo(() => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const transitionSlider = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlider(index);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const prevSlider = useCallback(() =>
    transitionSlider(currentSlider === 0 ? sliders.length - 1 : currentSlider - 1), 
  [currentSlider, transitionSlider]);

  const nextSlider = useCallback(() =>
    transitionSlider(currentSlider === sliders.length - 1 ? 0 : currentSlider + 1),
  [currentSlider, transitionSlider]);

  useEffect(() => {
    const intervalId = setInterval(nextSlider, 6000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {sliders.map((slide, inx) => (
          <div
            key={inx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              currentSlider === inx ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <img
              src={slide.img}
              className="w-full h-full object-cover"
              alt={slide.title}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-20 h-full flex items-center px-4 md:px-8">
        <div className="max-w-3xl">
          {sliders.map((slide, inx) => (
            <div
              key={inx}
              className={`${currentSlider === inx ? "block" : "hidden"}`}
            >
              <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  {slide.tag}
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none">
                  {slide.title.split(' ')[0]} <br/>
                  <span className="text-primary">{slide.title.split(' ')[1]}</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-xl font-medium">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to="/order"
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full overflow-hidden transition-all hover:pr-12 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] active:scale-95"
                  >
                    <span>Discover Menu</span>
                    <HiArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                  <Link
                    to="/contact"
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-md border border-white/10 transition-all active:scale-95"
                  >
                    Reserver Table
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-4 md:right-12 z-30 flex items-center gap-4">
        <div className="flex items-center gap-2 mr-8">
          {sliders.map((_, inx) => (
            <button
              key={inx}
              onClick={() => transitionSlider(inx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlider === inx ? "w-12 bg-primary" : "w-3 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${inx + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
           <button
            onClick={prevSlider}
            className="p-3 rounded-full border border-white/20 text-white hover:bg-primary hover:border-primary transition-all backdrop-blur-sm"
            aria-label="Previous Slide"
          >
            <HiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlider}
            className="p-3 rounded-full border border-white/20 text-white hover:bg-primary hover:border-primary transition-all backdrop-blur-sm"
            aria-label="Next Slide"
          >
            <HiChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:block z-20 animate-float">
        <div className="glass-card p-6 rounded-3xl w-64 border-primary/20">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-bold">
                 4.9
              </div>
              <div>
                 <p className="text-white font-bold">User Rating</p>
                 <p className="text-white/50 text-xs">Based on 2k+ reviews</p>
              </div>
           </div>
           <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[98%]" />
           </div>
        </div>
      </div>
    </section>
  );
});

Banner.displayName = 'Banner';

export default Banner;
