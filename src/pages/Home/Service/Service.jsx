import React, { memo } from 'react';
import UseText from '../../../Component/HeadingText/UseText';
import { Link } from 'react-router-dom';
import LazyImage from '../../../Component/LazyImage';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const services = [
  {
    title: "Corporate Excellence",
    subtitle: "Business Dining & Events",
    description: "Elevate your professional gatherings with our bespoke corporate catering. From high-stakes board meetings to grand conferences, we deliver culinary perfection that reflects your company's standards.",
    image: "https://i.ibb.co/RTpf1ZJ/crop-man-eating-dessert-cafe.jpg",
    tags: ["Professional", "Efficient", "Gourmet"]
  },
  {
    title: "Wedding Perfection",
    subtitle: "Memorable Celebrations",
    description: "Transform your special day into a timeless masterpiece. Our wedding services combine elegant aesthetics with exquisite flavors to ensure your celebration is as unique and beautiful as your love story.",
    image: "https://i.ibb.co/j3V6qp4/close-up-people-serving-themselves-fruits-buffet-restaurant.jpg",
    tags: ["Elegant", "Flawless", "Bespoke"],
    reverse: true
  },
  {
    title: "Private Dining",
    subtitle: "Exclusive Culinary Journeys",
    description: "Experience the ultimate in culinary intimacy. Our private dining sessions offer a curated atmosphere where every detail is tailored to your preferences, creating an unforgettable sensory experience.",
    image: "https://i.ibb.co/mGh12Yd/man-holding-smartphone-newspaper-during-breakfast.jpg",
    tags: ["Intimate", "Curated", "Premium"]
  }
];

const Service = memo(() => {
  return (
    <section className="py-24 bg-muted/20" id="reserver">
      <div className="container mx-auto px-4">
        <UseText 
          heading="Our Special Services" 
          subheading="Unforgettable Experiences" 
        />
        
        <div className="space-y-24 md:space-y-32">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className={`flex flex-col gap-12 items-center ${service.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              data-aos={service.reverse ? "fade-right" : "fade-left"}
            >
              {/* Image Side */}
              <div className="flex-1 w-full relative">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] scale-95 group-hover:scale-100 transition-transform duration-500 blur-2xl" />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <LazyImage 
                      alt={service.title} 
                      src={service.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  
                  {/* Floating Tags */}
                  <div className={`absolute bottom-6 flex gap-2 ${service.reverse ? 'left-6' : 'right-6'}`}>
                    {service.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                   <h4 className="text-primary font-bold tracking-widest uppercase text-sm">
                      {service.subtitle}
                   </h4>
                   <h3 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                      {service.title}
                   </h3>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                   {service.description}
                </p>

                <div className="pt-4">
                  <Link 
                    to="/Booking" 
                    className="group inline-flex items-center gap-4 text-foreground font-black text-lg transition-colors hover:text-primary"
                  >
                    <span className="relative">
                      Book This Service
                      <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary transition-all group-hover:w-full" />
                    </span>
                    <div className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                      <HiOutlineArrowNarrowRight size={24} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Service.displayName = 'Service';

export default Service;
