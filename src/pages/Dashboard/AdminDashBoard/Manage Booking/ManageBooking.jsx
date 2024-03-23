import React, { useState } from 'react';
import useMenu from '../../../../hooks/useMenu';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import swal from 'sweetalert';
import { FaEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Loading from '../../../../Component/Loading';
const imageHostKey = import.meta.env.VITE_IMG_HOSTING_KEY
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
function ManageItems() {
  const [menu, loading, refetch] = useMenu(); // Fetch menu items using custom hook
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleDeleteItem = async (item) => {
      try {
          const result = await swal({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
          });

          if (result) {
              const res = await axiosSecure.delete(`/menu/${item._id}`);
              if (res.data.deletedCount > 0) {
                  // If item is successfully deleted, refetch to update UI
                  swal("Success!", `${item.Title} has been deleted`, "success");
                  refetch();
              }
          }
      } catch (error) {
          console.error("Error deleting item:", error);
          swal("Error", "Failed to delete item", "error");
      }
  };

  const handleEditItem = (item) => {
      // Set the editItem state to the selected item and show the edit modal
      setEditItem(item);
      setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
      // Close the edit modal and reset the form
      setShowEditModal(false);
      reset();
  };

  const onSubmit = async (data) => {
     const imageFile = { image: data.img[0] }
     const res = await axiosSecure.post(imageHostingApi, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
 
      console.log(res.data);
  
      if (res.data.success) {
        const menuItem = {
          Title: data.Title,
          description: data.description,
          category: data.category,
          img: res.data.data.display_url,
          price: data.price,
        };
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
        console.log(menuRes.data);
        if (menuRes.data.insertedId) {
          swal("Success!", "Item added successfully!", "success");
          reset();
        }
      } else {
        swal("Error!", "Failed to upload image", "error");
      }
    }


  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-4 text-center bg-gray-900 p-3 text-white">Manage Menu Items</h2>
      {loading ? (
       <Loading/>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item) => (
                <tr key={item._id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{item.Title}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={item.img} alt={item.title} className=" w-72 h-28 object-cover" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 ">${item.price}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center ">
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition-colors duration-300 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditItem(item)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showEditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Edit Item</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      {...register("Title")}
                      type="text"
                      id="Title"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm bg-gray-300 border-gray-600 rounded-md"
                      defaultValue={editItem.title}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      {...register("price")}
                      type="text"
                      id="price"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm bg-gray-300 border-gray-300 rounded-md"
                      defaultValue={editItem.price}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium  text-gray-700">Description</label>
                    <textarea
                      {...register("description")}
                      id="description"
                      rows="3"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm bg-gray-300 border-gray-300 rounded-md"
                      defaultValue={editItem.description}
                    ></textarea>
                  </div>
                  <fieldset className="w-48 overflow-hidden  mx-auto dark:text-gray-100">
              <label htmlFor="files" className="block text-sm font-medium">Attachments</label>
              <div className="flex">
                <input {...register('img')} type="file" name="img" id="files" className="px-5 py-2 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400  " />
              </div>
            </fieldset>
                  <div className="flex justify-end mt-2">
                    <button type="button" onClick={handleCloseEditModal} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2">Cancel</button>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Update</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ManageItems;
