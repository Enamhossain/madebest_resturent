import React, { useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiArrowRight } from 'react-icons/hi';
import PageSkeleton from '../../Component/PageSkeleton';
import LazyImage from '../../Component/LazyImage';

const Contact = memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageSkeleton type="contact" />;
  }

  const contactInfo = [
    {
      icon: <HiLocationMarker className="w-6 h-6" />,
      title: "Visit Us",
      details: ["768 Gulsan Market, Mirpur", "Dhaka - 1280, Bangladesh"],
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      icon: <HiPhone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+880 182 233 499", "Mon-Fri from 10am to 11pm"],
      color: "bg-primary/10 text-primary"
    },
    {
      icon: <HiMail className="w-6 h-6" />,
      title: "Email Us",
      details: ["hello@madebest.com", "support@madebest.com"],
      color: "bg-amber-500/10 text-amber-500"
    },
    {
      icon: <HiClock className="w-6 h-6" />,
      title: "Working Hours",
      details: ["Tue - Sun: 11:00 AM - 11:00 PM", "Monday: Closed"],
      color: "bg-emerald-500/10 text-emerald-500"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Get in Touch | MadeBest Restaurant</title>
        <meta name="description" content="Connect with Dhaka's finest gourmet restaurant. Contact us for private dining reservations, corporate events, and general inquiries." />
      </Helmet>

      {/* Immersive Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src="https://i.ibb.co/whLv16L/frying-pan-with-burning-fire-inside-1.jpg"
            alt="Contact Hero"
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container relative z-10 px-4 text-center mt-20">
           <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
             Contact Excellence
           </span>
           <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             Let's Start a <span className="text-primary italic">Conversation</span>
           </h1>
           <p className="max-w-2xl mx-auto text-lg text-white/70 font-medium">
             Whether you're planning a private event or just want to say hi, 
             our team is here to provide exceptional service.
           </p>
        </div>
      </section>

      {/* Contact Interaction Grid */}
      <section className="py-24 -mt-20 relative z-20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Info Cards */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info, idx) => (
                <div 
                  key={idx} 
                  className="glass-card p-6 rounded-3xl border-border/50 hover:border-primary/30 transition-all group"
                  data-aos="fade-right"
                  data-aos-delay={idx * 100}
                >
                  <div className="flex items-start gap-5">
                    <div className={`p-4 rounded-2xl ${info.color} transition-transform group-hover:scale-110`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{info.title}</h3>
                      {info.details.map((detail, dIdx) => (
                        <p key={dIdx} className="text-muted-foreground font-medium">{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Contact Form */}
            <div className="lg:col-span-2" data-aos="fade-left">
              <div className="glass-card p-8 md:p-12 rounded-[40px] border-border/50 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                
                <h2 className="text-3xl font-black text-foreground mb-8">Send us a <span className="text-primary">Message</span></h2>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-foreground/70 ml-2">Full Name</label>
                       <input 
                         type="text" 
                         placeholder="John Doe"
                         className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-foreground/70 ml-2">Email Address</label>
                       <input 
                         type="email" 
                         placeholder="john@example.com"
                         className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium" 
                       />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-foreground/70 ml-2">Subject</label>
                     <select className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium appearance-none">
                        <option>General Inquiry</option>
                        <option>Private Dining Reservation</option>
                        <option>Corporate Event Hosting</option>
                        <option>Feedback & Suggestions</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-foreground/70 ml-2">Your Message</label>
                     <textarea 
                       rows="5" 
                       placeholder="How can we help you?"
                       className="w-full px-6 py-4 rounded-3xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium resize-none"
                     ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white font-black rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] active:scale-95"
                  >
                    <span>Transmit Message</span>
                    <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Map Integration */}
      <section className="pb-24 px-4 overflow-hidden">
        <div className="container" data-aos="zoom-in-up">
           <div className="relative rounded-[40px] overflow-hidden border border-border/50 shadow-2xl h-[500px]">
              <iframe
                title="Location Map"
                className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-[1.1]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5824941916325!2d90.34960687611867!3d23.815668262276587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e27f052565%3A0xe67b848cf6473ba7!2sMirpur%20Shopping%20Center!5e0!3m2!1sen!2sbd!4v1705934521453!5m2!1sen!2sbd"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="absolute top-8 left-8 glass-card p-6 rounded-3xl border-primary/20 pointer-events-none hidden md:block">
                 <p className="text-primary font-black uppercase text-xs tracking-widest mb-1">Our Location</p>
                 <p className="text-foreground font-bold">Visit MadeBest Today</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
