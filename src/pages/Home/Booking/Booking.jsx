import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/axiosPublic';
import swal from 'sweetalert';
import UseText from '../../../Component/HeadingText/UseText';
import LazyImage from '../../../Component/LazyImage';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineUserGroup, HiOutlineSparkles } from 'react-icons/hi';

const Booking = memo(() => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axios = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const bookingData = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      guests: data.guests,
      message: data.message,
      category: data.category
    };
    
    axios.post("/booking", bookingData)
    .then(() => {
      swal("Table Reserved!", "We've received your request and will confirm shortly.", "success", {
        buttons: false,
        timer: 3000,
      });
      reset();
      setTimeout(() => navigate('/'), 3000);
    })
    .catch((error) => {
      console.error('Booking error:', error);
      swal("Submission Failed", "Please check your details and try again.", "error");
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Reserve a Table | MadeBest Restaurant</title>
      </Helmet>

      {/* Premium Discovery Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Dining Experience"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-sm md:text-base">Elite Reservations</span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter">
              A TABLE FOR <span className="text-primary italic">MEMORY</span>
            </h1>
            <p className="text-white/80 text-lg md:text-2xl font-light max-w-2xl mx-auto">
              Secure your spot at MadeBest and embark on a culinary journey defined by passion and perfection.
            </p>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-24 relative -mt-32 z-20">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Info Column */}
              <div className="lg:col-span-4 space-y-12 h-full">
                 <div className="bg-foreground text-background p-10 rounded-[3rem] space-y-8 shadow-2xl h-full flex flex-col justify-center">
                    <HiOutlineSparkles className="text-primary" size={48} />
                    <h2 className="text-4xl font-black leading-tight">Exceptional<br/>Dining Awaits</h2>
                    <p className="text-background/60 leading-relaxed">
                       From intimate dinners to grand celebrations, our dedicated team ensures every detail is masterfully executed.
                    </p>
                    <div className="pt-8 space-y-6">
                       <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
                             <HiOutlineClock size={24} />
                          </div>
                          <div>
                             <h4 className="font-bold">Opening Hours</h4>
                             <p className="text-sm text-background/60">Tue - Sun: 11:00 AM - 11:00 PM</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
                             <HiOutlineUserGroup size={24} />
                          </div>
                          <div>
                             <h4 className="font-bold">Large Groups</h4>
                             <p className="text-sm text-background/60">For 10+ guests, contact us directly.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-8 bg-card border border-border p-10 md:p-16 rounded-[3rem] shadow-2xl">
                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Full Name</label>
                          <input 
                            {...register("fullName", { required: true })}
                            className="w-full bg-muted/30 border border-border rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors"
                            placeholder="John Doe"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Email Address</label>
                          <input 
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            className="w-full bg-muted/30 border border-border rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors"
                            placeholder="john@example.com"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Phone Number</label>
                          <input 
                            {...register("phone", { required: true })}
                            className="w-full bg-muted/30 border border-border rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors"
                            placeholder="+880 1XXX-XXXXXX"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Occasion</label>
                          <select 
                            {...register("category", { required: true })}
                            className="w-full bg-muted/30 border border-border rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors appearance-none"
                          >
                             <option value="General">General Dining</option>
                             <option value="Birthday">Birthday</option>
                             <option value="Anniversary">Anniversary</option>
                             <option value="Corporate">Corporate</option>
                             <option value="Wedding">Wedding</option>
                          </select>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">
                             <HiOutlineCalendar /> Preferred Date
                          </label>
                          <input 
                            type="date"
                            {...register("date", { required: true })}
                            className="w-full bg-muted/30 border border-border rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">
                             <HiOutlineClock /> Time Slot
                          </label>
                          <select 
                            {...register("time", { required: true })}
                            className="w-full bg-muted/30 border border-border rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors appearance-none"
                          >
                             <option value="11:00 AM">11:00 AM</option>
                             <option value="12:00 PM">12:00 PM</option>
                             <option value="02:00 PM">02:00 PM</option>
                             <option value="07:00 PM">07:00 PM</option>
                             <option value="08:00 PM">08:00 PM</option>
                             <option value="09:00 PM">09:00 PM</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">
                             <HiOutlineUserGroup /> Guests
                          </label>
                          <select 
                            {...register("guests", { required: true })}
                            className="w-full bg-muted/30 border border-border rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors appearance-none"
                          >
                             {[2, 3, 4, 5, 6, 8, 10].map(n => <option key={n} value={n}>{n} Persons</option>)}
                          </select>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Special Requests</label>
                       <textarea 
                         {...register("message")}
                         rows="4"
                         className="w-full bg-muted/30 border border-border rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors resize-none"
                         placeholder="Let us know if you have any allergies or special requirements..."
                       />
                    </div>

                    <div className="pt-8">
                       <button 
                         type="submit"
                         className="w-full py-6 bg-primary text-white font-black text-lg uppercase tracking-widest rounded-3xl transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/20 active:scale-[0.98]"
                       >
                          Confirm Reservation
                       </button>
                    </div>
                 </form>
              </div>

           </div>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="py-24 bg-muted/30 overflow-hidden">
         <div className="container mx-auto px-4">
            <UseText 
              heading="The Atmosphere" 
              subheading="Designed for Comfort" 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
               {[
                 "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=600&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1550966841-3eeec17819ce?q=80&w=600&auto=format&fit=crop"
               ].map((img, i) => (
                 <div key={i} className="h-96 rounded-[3rem] overflow-hidden group">
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Atmosphere" />
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
});

Booking.displayName = 'Booking';

export default Booking;
