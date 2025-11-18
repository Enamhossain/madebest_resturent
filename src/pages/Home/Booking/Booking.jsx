import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/axiosPublic';
import swal from 'sweetalert';
import UseText from '../../../Component/HeadingText/UseText';
import LazyImage from '../../../Component/LazyImage';

const Booking = memo(() => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axios = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Construct booking data
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
    
    console.log(bookingData);
    
    // Send booking data to the server using Axios
    axios.post("/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    })
    .then((response) => {
      const result = response.data;
      console.log(result);
      swal("Success!", "Your booking has been submitted successfully!", "success");
      reset();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    })
    .catch((error) => {
      console.error('Error submitting booking:', error);
      swal("Error", "Failed to submit booking. Please try again.", "error");
    });
  };

  const featuredServices = [
    {
      img: "https://i.ibb.co/K7DgFFg/dev-asangbam-Sj-G7-MA4n8-S0-unsplash.jpg",
      title: "Corporate Events",
      description: "Professional catering for your business needs",
      width: 400,
      height: 256
    },
    {
      img: "https://i.ibb.co/Y2Mp58P/shawnanggg-nmp-W-Www-VSc-unsplash.jpg",
      title: "Wedding Celebrations",
      description: "Make your special day unforgettable",
      width: 400,
      height: 256
    },
    {
      img: "https://i.ibb.co/vc1ZRLj/priscilla-du-preez-W3-SEy-ZODn8-U-unsplash.jpg",
      title: "Private Dining",
      description: "Intimate gatherings with exquisite cuisine",
      width: 400,
      height: 256
    }
  ];

  return (
    <div>
      <Helmet>
        <title>Book Your Table | MadeBest</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-24 md:py-32 mt-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Reserve Your <span className="text-yellow-400">Perfect Table</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Experience culinary excellence at MadeBest. Book your table today and indulge in an unforgettable dining experience.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-3 px-8 rounded-full uppercase tracking-wide font-semibold transition duration-300 transform hover:scale-105"
          >
            Explore Our Menu
          </Link>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <UseText heading="Our Services" subheading="Featured" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <LazyImage
                    src={service.img}
                    alt={service.title}
                    width={service.width}
                    height={service.height}
                    quality={75}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <UseText heading="Book Your Experience" subheading="Reservation" />
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...register("fullName", { required: "Full name is required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-sm mt-1 block">{errors.fullName.message}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Please enter a valid email address"
                        }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone", { 
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9+\-\s()]+$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm mt-1 block">{errors.phone.message}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Guests <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="guests"
                      {...register("guests", { required: "Please select number of guests" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                    >
                      <option value="">Select guests</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="10+">10+ Guests</option>
                    </select>
                    {errors.guests && (
                      <span className="text-red-500 text-sm mt-1 block">{errors.guests.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      {...register("date", { required: "Date is required" })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                    />
                    {errors.date && (
                      <span className="text-red-500 text-sm mt-1 block">{errors.date.message}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="time"
                      {...register("time", { required: "Time is required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                    >
                      <option value="">Select time</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                      <option value="9:00 PM">9:00 PM</option>
                    </select>
                    {errors.time && (
                      <span className="text-red-500 text-sm mt-1 block">{errors.time.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    {...register("category", { required: "Please select a category" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                  >
                    <option value="">Select Category</option>
                    <option value="Corporate">Corporate Booking</option>
                    <option value="Wedding">Wedding Booking</option>
                    <option value="Private">Private Booking</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.category.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests or Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300 resize-none"
                    placeholder="Any special dietary requirements, allergies, or requests..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4 px-8 rounded-full uppercase tracking-wide font-semibold transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MadeBest?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Timing</h3>
                <p className="text-gray-600">Book at your convenience with flexible reservation options</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
                <p className="text-gray-600">Experience world-class service and attention to detail</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Exquisite Cuisine</h3>
                <p className="text-gray-600">Savor the finest dishes crafted by our expert chefs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

Booking.displayName = 'Booking';

export default Booking;
