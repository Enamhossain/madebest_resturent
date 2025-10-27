import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/axiosPublic';
import swal from 'sweetalert';

function Booking() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const axios = useAxiosPublic()

 const navigate = useNavigate()

  const onSubmit = (data) => {
      // Construct booking data
      const bookingData = {
          name: data.fullName,
          email: data.email,
          message: data.message,
          category: data.category
      };
    console.log(bookingData)
      // Send booking data to the server using Axios
      axios.post("/booking",  {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData)
      })
      .then((response) => {
          const result = response.data;
          // Handle response
          console.log(result);
          swal("successfully Booking ");
      })
      .catch((error) => {
          // Handle error
          console.error('Error submitting booking:', error);
          swal("order successfully not  booking")
          // Optionally, you can show an error message to the user
      });
      navigate('/')
  };
  
  
  

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Booking Page</h1>
          <p className="text-lg mb-8">Explore our services and book your experience today!</p>
          <Link to="/services" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-full uppercase tracking-wide font-semibold transition duration-300">
            Explore Services
          </Link>
        </div>
      </section>

      {/* Booking Image Grid */}
      <section className="container mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Replace the URLs with your actual image URLs */}
          <img src="https://i.ibb.co/K7DgFFg/dev-asangbam-Sj-G7-MA4n8-S0-unsplash.jpg" className='w-full h-56' alt="Img" />
          <img src="https://i.ibb.co/Y2Mp58P/shawnanggg-nmp-W-Www-VSc-unsplash.jpg" className='w-full h-56' alt="Img" />
          <img src="https://i.ibb.co/vc1ZRLj/priscilla-du-preez-W3-SEy-ZODn8-U-unsplash.jpg" className='w-full h-56' alt="Img" />

        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Book Your Experience</h2>
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" {...register("fullName", { required: true })} className="border rounded-md p-3" />
              {errors.fullName && <span className="text-red-500">This field is required</span>}
              <input type="email" placeholder="Email Address" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} className="border rounded-md p-3" />
              {errors.email && <span className="text-red-500">Please enter a valid email address</span>}

            </div>
            <textarea placeholder="Message" {...register("message")} className="border rounded-md p-3 mt-4 w-full"></textarea>
            <select {...register("category", { required: true })} className="border rounded-md p-3 mt-5">
              <option value="">Select Category</option>
              <option value="Corporate">Corporate Booking</option>
              <option value="Wedding">Wedding Booking</option>
              <option value="Private">Private Booking</option>
            </select>
            {errors.category && <span className="text-red-500">Please select a category</span>}
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-full mt-6 block mx-auto">Submit</button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default Booking;
