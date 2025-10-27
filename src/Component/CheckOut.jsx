import React from 'react'
import { Controller } from 'react-hook-form'

// eslint-disable-next-line react/prop-types
export const CheckOut = ({handleSubmit,control,onSubmit,setOpenModal,openModal}) => {
  return (
    <div className="flex justify-end">
   
    <div
      onClick={() => setOpenModal(false)}
      className={`fixed flex justify-center items-center z-[100] ${
        openModal ? "visible opacity-1" : "invisible opacity-0"
      } inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute w-full lg:w-[500px] bg-white drop-shadow-2xl rounded-lg ${
          openModal
            ? "opacity-1 duration-300 translate-y-0"
            : "-translate-y-20 opacity-0 duration-150"
        }`}
      >
        <h1 className="text-center font-extrabold text-2xl mt-5">
          Payment
        </h1>
        <form className="p-12" onSubmit={handleSubmit(onSubmit)}>
          <svg
            onClick={() => setOpenModal(false)}
            className="w-10 mx-auto mr-0 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841"
              fill="#000000"
            />
          </svg>

          <div className="space-y-5">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Name"
                  className="border bg-slate-50 border-gray-300 rounded-md p-2 w-full"
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="tel"
                  placeholder="Phone Number"
                  className="border bg-slate-50 border-gray-300 rounded-md p-2 w-full"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email Address"
                  className="border bg-slate-50 border-gray-300 rounded-md p-2 w-full"
                />
              )}
            />
            <Controller
              name="postcode"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Postcode"
                  className="border bg-slate-50 border-gray-300 rounded-md p-2 w-full"
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Address"
                  className="border bg-slate-50 border-gray-200 rounded-md p-2 w-full"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-black hover:bg-gray-900 text-white rounded-md px-4 py-2 mt-4"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}
