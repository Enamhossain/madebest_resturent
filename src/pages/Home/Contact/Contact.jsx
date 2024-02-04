import React from 'react'
import UseText from '../../../Component/HeadingText/UseText'

function Contact() {
    // const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    // const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Your+Location`;
  
  return (
    <>
    
    
    {/* <main className="grid grid-cols-1 lg:grid-cols-2 py-5">
        {/* Map Section */}
        {/* <div className="lg:h-screen bg-gray-200">
        <iframe
      title="Map"
      width="100%"
      height="100%"
      loading="lazy"
      allowFullScreen
      frameBorder="0"
      src={mapUrl} */}
    {/* /> */} 
  
        {/* </div> */}

        {/* Contact Form Section */}
        <div className="max-w-screen-xl mx-auto   text-gray-800 md:px-8 mt-8 mb-5 font-bold  shadow-lg">
          <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <h3 className="text-indigo-600 font-semibold">Contact</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Get in touch
            </p>
            <p>We’d love to hear from you! Please fill out the form below.</p>
          </div>
          <div className="mt-12 max-w-lg mx-auto">
          <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5"
            >
                <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                    <div>
                        <label className="font-medium">
                            First name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-100 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Last name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                </div>
                <div>
                    <label className="font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-100 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Phone number
                    </label>
                    <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                            <select className="text-sm bg-transparent outline-none rounded-lg h-full">
                                <option>US</option>
                                <option>ES</option>
                                <option>MR</option>
                            </select>
                        </div>
                        <input
                            type="number"
                            placeholder="+1 (555) 000-000"
                            required
                            className="w-full pl-[4.5rem] pr-3 py-2 text-white appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                </div>
                <div>
                    <label className="font-medium">
                        Message
                    </label>
                    <textarea required className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"></textarea>
                </div>
                <button
                    className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                    Submit
                </button>
            </form>
          </div>
        </div>
      {/* </main> */}
    </>
  )
}

export default Contact