import React from 'react'
import UseText from '../../../Component/HeadingText/UseText'

function Category() {
  return (
    <div className='bg-white p-4'>
        <UseText heading={'Our Food Category'} subheading={'open 10Am to  11pm'}>
          
        </UseText>
        
        <div className='container mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 mt-14'>
    <div className='Burger '>
        <span className="flex justify-center items-center text-6xl text-center align-middle">🍔</span>
        <h3 className="text-lg font-semibold mt-4 text-gray-700 text-center">Savory Bliss Burger</h3>
        <p className='description text-gray-600 text-center'>Indulge in the rich flavors of our signature burger. A treat for your taste buds!</p>
    </div>
 
    <div className='noodles  '>
        <span className="flex justify-center items-center text-6xl text-center align-middle">🍜</span>
        <h3 className="text-lg font-semibold mt-4 text-gray-700 text-center">Delicious Noodles</h3>
        <p className='description text-gray-600 text-center'>Savor the exquisite taste of our mouthwatering noodle dishes.</p>
    </div>
    <div className='pizza '>
    <span className="flex justify-center items-center text-6xl text-center align-middle">🍕</span>
    <h3 className="text-lg font-semibold mt-4 text-gray-700 text-center">Pepperoni Paradise Pizza</h3>
    <p className='description text-gray-600 text-center'>Indulge in the savory goodness of our Pepperoni Paradise Pizza!</p>
</div>
<div className='crispy-chicken '>
    <span className="flex justify-center items-center text-6xl text-center align-middle">🍗</span>
    <h3 className="text-lg font-semibold mt-4 text-gray-700 text-center">Crispy Chicken Delight</h3>
    <p className='description text-gray-600 text-center'>Experience the perfect crunch with our Crispy Chicken Delight!</p>
</div>

</div>



    </div>
  )
}

export default Category