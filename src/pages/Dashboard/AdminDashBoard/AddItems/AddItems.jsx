import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import swal from 'sweetalert';
const imageHostKey = import.meta.env.VITE_IMG_HOSTING_KEY
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
function AddItems() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.img[0]); // Assuming the input field for the image is named 'img'
    
      const res = await axiosPublic.post(imageHostingApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data); // <-- Corrected to use 'res' instead of 'response'
      if(res.data.success){
        const menuItem = {
          Title: data.Title,
          description: data.description,
          category: data.category,
          img: res.data.data.display_url,
          price: data.price,
        }
        const menuRes = await axiosSecure.post('/menu', menuItem)
        console.log(menuRes.data)
        if(menuRes.data.insertedId){
          swal("Success!", "Item added successfully!", "success");
          reset();
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  

  return (
    <div className='w-full'>
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-12 w-full">
        <div className="w-full  text-center">
          <h1 className="text-4xl font-bold ">Add Items</h1>
          <p className="mt-4 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper eros vel ultricies sodales.</p>
        </div>
      </div>

      {/* Add Item Section */}
      <div className="max-w-lg mx-auto mt-8 px-4 ">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Add Item</h2>
        <div className="bg-white shadow-md rounded-lg  p-14">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Recipe Name</label>
              <input type="text" id="Title" {...register('Title', { required: true })} className="mt-1 p-3 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.title && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Recipe Details</label>
              <textarea id="description" rows="3" {...register('description', { required: true })} className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              {errors.description && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="w-full">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input type="text" id="price" {...register('price', { required: true })} className="mt-1 block p-2 w-full bg-gray-200 border-gray-300 rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                {errors.price && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="w-full">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select id="category" {...register('category', { required: true })} className="mt-1 block p-2 w-full bg-gray-200 border-gray-300 rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select category...</option>
                  <option value="popular">popular</option>
                  <option value="Main">Main</option>
                  <option value="Drinks">Drinks</option>
                  <option value="pizza">pizza</option>
                  <option value="salad">salad</option>
                  <option value="soup">soup</option>
                  <option value="Dessert">Dessert</option>
                </select>
                {errors.category && <span className="text-red-500">This field is required</span>}
              </div>
            </div>
            <fieldset className="w-48 overflow-hidden  mx-auto dark:text-gray-100">
              <label htmlFor="files" className="block text-sm font-medium">Attachments</label>
              <div className="flex">
                <input {...register('img')} type="file" name="img" id="files" className="px-10 py-4 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400" />
              </div>
            </fieldset>
            <div className="flex justify-center mx-auto mt-5">
              <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Item</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItems;
