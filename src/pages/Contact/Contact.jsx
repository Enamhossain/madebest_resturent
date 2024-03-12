import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 mt-28">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">Get in touch with us for any inquiries or assistance. We're here to help!</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-4 py-8 text-gray-100">
        <h2 className="text-3xl font-bold mb-4 text-black">Send us a message</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
            <input type="text" id="name" name="name" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input type="email" id="email" name="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
            <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"></textarea>
          </div>
          <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Send Message</button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Address */}
            <div className="bg-white rounded-lg p-6">
              <FaMapMarkerAlt className="text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p>123 Street, City, Country</p>
            </div>
            {/* Phone */}
            <div className="bg-white rounded-lg p-6">
              <FaPhone className="text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p>+1234567890</p>
            </div>
            {/* Email */}
            <div className="bg-white rounded-lg p-6">
              <FaEnvelope className="text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p>info@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="container mx-auto px-4 py-12">
        {/* Replace the iframe src attribute with your map embed code */}
        <iframe
          title="Location Map"
          className="w-full h-96 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31409.674898691144!2d-74.00739354854392!3d40.712781874220776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU5JzU4LjIiTiA3NMKwMDknMjIuMCJX!5e0!3m2!1sen!2sus!4v1646019179675!5m2!1sen!2sus"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
