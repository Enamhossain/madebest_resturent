import React from 'react'

function MenuCard({ title, price, description, image }) {

  return (
    <div className="max-w-md mx-auto bg-white md:rounded-l-full shadow-lg overflow-hidden md:max-w-2xl">
  <div className="md:flex">
    <div className="md:shrink-0">
      <img className="h-48 w-full object-cover md:h-full md:w-20 items-center md:rounded-2xl " src={image} alt="Modern building architecture"/>
    </div>
    <div className="p-3">
      <span className="uppercase  text-sm text-red-500 font-semibold underline">{price}</span>
      <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</a>
      <p className="mt-2 text-slate-500">{description}</p>
    </div>
  </div>

</div>
  )
}

export default MenuCard