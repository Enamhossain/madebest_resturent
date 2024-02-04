import React from 'react'

function Discount() {
  return (

 <div className='grid md:grid-cols-2 gap-3 mx-auto container mt-16 mb-20'>

<div className="relative bg-cover bg-center    md:rounded-xl h-64 md:h-80  shadow-lg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",filter: 'grayscale(0%) brightness(80%) contrast(140%) '} }>
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-white text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white   backdrop-filter">Grab the Deal</h1>
      <p className="text-lg md:text-xl font-lg">20% Discount</p>
    </div>
  </div>
</div>
<div className="relative bg-cover bg-center   md:rounded-xl h-64 md:h-80  shadow-lg" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/grilled-burger-fresh-fries-cheese-tomato-onion-perfect-meal-generated-by-artificial-intelligence_188544-130089.jpg?size=626&ext=jpg&ga=GA1.2.421846980.1704784421&semt=sph')",filter: 'grayscale(0%) brightness(80%) contrast(140%) '} }>
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-white text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white   backdrop-filter">Yummy burger</h1>
      <p className="text-lg md:text-xl font-lg">25% Discount</p>
    </div>
  </div>
</div>

 </div>

  
  )
}

export default Discount