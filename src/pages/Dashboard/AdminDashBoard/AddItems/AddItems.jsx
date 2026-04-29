import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import swal from 'sweetalert';
import { FaUtensils, FaCloudUploadAlt, FaPlus, FaRegFileAlt, FaTags, FaDollarSign } from 'react-icons/fa';

const imageHostKey = import.meta.env.VITE_IMG_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

const AddItems = memo(() => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.img[0]);
    
      const res = await axiosPublic.post(imageHostingApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if(res.data.success){
        const menuItem = {
          Title: data.Title,
          description: data.description,
          category: data.category,
          img: res.data.data.display_url,
          price: parseFloat(data.price),
        };
        
        const menuRes = await axiosSecure.post('/menu', menuItem);
        if(menuRes.data.insertedId){
          swal({
            title: "Success!",
            text: "Menu item has been added successfully.",
            icon: "success",
            buttons: false,
            timer: 2000
          });
          reset();
        }
      }
    } catch (error) {
      console.error('Error uploading item:', error);
      swal("Error!", "Failed to add item. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Dish</h2>
          <p className="text-gray-500 mt-1">Create a new entry in your restaurant's digital menu.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-orange-50/50 p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
            <FaUtensils size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Item Details</h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Basic Information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipe Name */}
            <div className="space-y-2 col-span-full">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <FaRegFileAlt className="text-orange-500" />
                Recipe Name
              </label>
              <input 
                type="text" 
                placeholder="e.g. Grilled Salmon with Asparagus"
                {...register('Title', { required: true })} 
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 border transition-all outline-none focus:ring-4 focus:ring-orange-500/10 ${
                  errors.Title ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                }`}
              />
              {errors.Title && <p className="text-xs font-bold text-red-500">Dish title is required</p>}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <FaTags className="text-orange-500" />
                Category
              </label>
              <select 
                {...register('category', { required: true })} 
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 border transition-all outline-none focus:ring-4 focus:ring-orange-500/10 ${
                  errors.category ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                }`}
              >
                <option value="">Select category...</option>
                <option value="popular">Popular</option>
                <option value="Main">Main Course</option>
                <option value="Drinks">Drinks</option>
                <option value="pizza">Pizza</option>
                <option value="salad">Salad</option>
                <option value="soup">Soup</option>
                <option value="Dessert">Dessert</option>
              </select>
              {errors.category && <p className="text-xs font-bold text-red-500">Please select a category</p>}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <FaDollarSign className="text-orange-500" />
                Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  {...register('price', { required: true })} 
                  className={`w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border transition-all outline-none focus:ring-4 focus:ring-orange-500/10 ${
                    errors.price ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                  }`}
                />
              </div>
              {errors.price && <p className="text-xs font-bold text-red-500">Price is required</p>}
            </div>

            {/* Details */}
            <div className="space-y-2 col-span-full">
              <label className="text-sm font-bold text-gray-700">Recipe Details</label>
              <textarea 
                rows="4" 
                placeholder="Describe the ingredients, taste, and preparation..."
                {...register('description', { required: true })} 
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 border transition-all outline-none focus:ring-4 focus:ring-orange-500/10 resize-none ${
                  errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                }`}
              ></textarea>
              {errors.description && <p className="text-xs font-bold text-red-500">Description is required</p>}
            </div>

            {/* Image Upload */}
            <div className="col-span-full pt-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <FaCloudUploadAlt className="text-orange-500 text-lg" />
                  Item Image
                </label>
                <div className="relative group">
                  <input 
                    type="file" 
                    id="img-upload"
                    {...register('img', { required: true })} 
                    className="hidden"
                  />
                  <label 
                    htmlFor="img-upload"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-3xl cursor-pointer transition-all ${
                      errors.img ? 'border-red-300 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 hover:bg-orange-50/50 hover:border-orange-300'
                    }`}
                  >
                    <FaCloudUploadAlt className="text-gray-300 group-hover:text-orange-400 mb-2 transition-colors" size={32} />
                    <p className="text-sm font-bold text-gray-500 group-hover:text-orange-500 transition-colors">
                      Click to upload image
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
                {errors.img && <p className="text-xs font-bold text-red-500 mt-2">Item image is required</p>}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-orange-500 text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-orange-200 hover:bg-orange-600 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Adding Item...</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Add to Menu</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

AddItems.displayName = 'AddItems';

export default AddItems;
