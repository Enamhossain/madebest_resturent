import React from 'react'

const Tastomonial = () => {
    const testimonials = [
        {
          stars: [1, 2, 3, 4, 5],
          content: "Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet luctus venenatis elit ut aliquam, purus sit amet luctus venenatis",
          name: "Laila Bahar",
          role: "Designer",
          image: "https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945e53e6cf8f_Ellipse%2011%20(1).svg",
        },
        {
          stars: [1, 2, 3, 4, 5],
          content: "Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet luctus venenatis elit ut aliquam, purus sit amet luctus venenatis",
          name: "Laila Bahar",
          role: "Designer",
          image: "https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945e53e6cf8f_Ellipse%2011%20(1).svg",
        },
        {
          stars: [1, 2, 3, 4, 5],
          content: "Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet luctus venenatis elit ut aliquam, purus sit amet luctus venenatis",
          name: "Laila Bahar",
          role: "Designer",
          image: "https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945e53e6cf8f_Ellipse%2011%20(1).svg",
        },
        // Add more testimonials as needed
      ];
      
  return (
   
 <section className="block">
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* Heading */}
        <h2 className="mx-auto mb-8 max-w-3xl text-center text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">What our clients are saying</h2>
        {/* Contents */}
        <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mb-8">
          {/* Map through testimonials array */}
          {testimonials.map((testimonial, index) => (
            <div key={index} className="grid grid-cols-1 gap-6 rounded-md border border-solid border-[#cdcdcd] bg-white p-8 md:p-10">
              <div className="flex">
                {/* Render stars using a loop */}
                {testimonial.stars.map((star, starIndex) => (
                  <img key={starIndex} src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a947e84e6cf91_Vector.svg" alt="" className="mr-1 inline-block w-3.5 flex-none" />
                ))}
              </div>
              <div className="text-[#636262]">{`"${testimonial.content}"`}</div>
              <div className="flex flex-row items-start">
                <img src={testimonial.image} alt="" className="mr-4 inline-block h-16 w-16 object-cover" />
                <div className="flex flex-col items-start">
                  <h6 className="text-base font-bold">{testimonial.name}</h6>
                  <p className="text-sm text-[#636262] sm:text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Text Button */}
        <div className="flex flex-col">
          <a href="#" className="mx-auto font-bold text-black">Check all reviews</a>
        </div>
      </div>
    </section>

  )
}

export default Tastomonial