import React from 'react'

function UseText({heading,subheading}) {
  return (
    <div className="text-center mb-4 container mx-auto">
    <p className="font-semibold text-yellow-400 text-xl uppercase  pb-3">---{subheading}---</p>
    <hr className='w-64 divide-orange-500 text-center mx-auto' />

    <h2 className="font-semibold text-orange-500 text-3xl uppercase  border-orange-500 pb-4">{heading}</h2>
    <hr className='w-80 border-orange-500 text-center mx-auto' />
  </div>
  
  
  )
}

export default UseText