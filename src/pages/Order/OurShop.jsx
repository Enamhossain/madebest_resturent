import React from 'react';

function OurShop() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section bg-gray-800 text-white py-20 px-4">
        <div className="container mx-auto mt-20 mr-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Welcome to Our Shop</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">Explore our delicious menu and find your favorites.</p>
          <button className="bg-red-500 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-red-600">Order Now</button>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">About Us</h2>
          <p className="text-lg mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat mattis metus, at lobortis nisl feugiat in. Aliquam erat volutpat. Fusce tristique arcu in efficitur hendrerit.</p>
          <p className="text-lg mb-4">In hac habitasse platea dictumst. Nullam sollicitudin dui id arcu ultricies, vel convallis sapien ultrices. Vivamus vel elit sit amet mi hendrerit consequat nec nec lorem.</p>
          <p className="text-lg mb-4">Curabitur nec pharetra dui, non rhoncus erat. Suspendisse potenti. Integer tincidunt lectus ac eros suscipit, et tempus nulla vestibulum.</p>
        </div>
      </div>

      {/* Shop Images Section */}
      <div className="shop-images-section py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="shop-image-item">
            <img src="https://img.freepik.com/free-photo/pork-hock-german-with-sauces-dark-background_1150-45508.jpg?t=st=1709575880~exp=1709579480~hmac=ed108c3e4514207e7d50236d869ddda83eb8ad66df9a841ac81747ade76bc1b9&w=996" alt="Shop Image 1" className="rounded-lg w-full h-auto" />
          </div>
          <div className="shop-image-item">
            <img src="https://img.freepik.com/free-photo/tortilla-wrap-with-falafel-fresh-salad-vegan-tacos-vegetarian-healthy-food_2829-6193.jpg?t=st=1709575332~exp=1709578932~hmac=4490dd8e7810d12f8bf86025d27b21f707f105b4824f5fc32543bad8abe2dc00&w=996" alt="Shop Image 2" className="rounded-lg w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Grid Images Section */}
      <div className="grid-images-section py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="grid-image-item">
            <img src="https://img.freepik.com/free-photo/side-view-fried-meat-with-french-fries-ketchup_141793-4908.jpg?t=st=1709575351~exp=1709578951~hmac=583fa53a9631e62095704f75465898f579eeaa4418451f789a15b52f62d639f8&w=996" alt="Grid Image 1" className="rounded-lg w-full h-auto" />
          </div>
          <div className="grid-image-item">
            <img src="https://img.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg?w=996" alt="Grid Image 2" className="rounded-lg w-full h-auto" />
          </div>
          <div className="grid-image-item">
            <img src="https://img.freepik.com/free-photo/fresh-grill-bbq-chicken_144627-7526.jpg?t=st=1709575415~exp=1709579015~hmac=75dc5a29219995fac7055ff1d9a7a7ebf05edda070fd25b75850660aee22ad77&w=996" alt="Grid Image 3" className="rounded-lg w-full h-auto" />
          </div>
        </div>
      </div>
    

      {/* Testimonials Section */}
      <div className="testimonials-section py-20 px-4 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="testimonial-item p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in turpis nec nisi fermentum tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."</p>
              <p className="text-sm font-bold">- John Doe</p>
            </div>
            <div className="testimonial-item p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg mb-4">"Integer feugiat sem at nisi placerat suscipit. Nulla ultrices massa libero, ac cursus erat lobortis non. In pulvinar aliquet nisi, nec varius risus aliquet vel."</p>
              <p className="text-sm font-bold">- Jane Smith</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurShop;
