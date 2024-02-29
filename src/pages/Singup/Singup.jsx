import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import swal from 'sweetalert';

function Singup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();
    const { createUser} = useContext(AuthContext)

    const navigate = useNavigate()
    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');
     
 

    const onSubmit = (data) => {
        console.log(data);
        if (data.password !== data.confirmPassword) {
            // Passwords do not match, handle accordingly
            return;
        }

        createUser(data.email, data.password)
        
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                swal("Good job!", "You clicked the button!", "success");
                navigate('/')
            })
            .catch(error => {
                // Handle sign-up errors
                console.error(error);
            });
    };





    return (
        
        <section className="bg-white">
              <Helmet>
              <title>Sing Up | MadeBest</title>
               </Helmet>
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://i.ibb.co/7bv8L6R/high-angle-woman-ordering-takeaway-food-smartphone.jpg"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white" href="#">
                            <span className="sr-only">Home</span>
                            <svg
                                className="h-8 sm:h-10"
                                viewBox="0 0 28 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Squid 🦑
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                            quibusdam aperiam voluptatum.
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <a
                                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                                href="#"
                            >
                                <span className="sr-only">Home</span>
                                <svg
                                    className="h-8 sm:h-10"
                                    viewBox="0 0 28 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>

                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                Welcome to Squid 🦑
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                quibusdam aperiam voluptatum.
                            </p>
                        </div>
                        <div>
                            <div className="mt-5 space-y-2">
                                <h3 className="text-gray-800 text-2xl text-center font-bold sm:text-3xl">Create your accont</h3>
                                <p className=" text-center">You have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sing In</Link></p>
                            </div>

                            <div className="">

                                <p className=" text-center mt-2 text-md font-semibold bg-white "> continue with</p>
                            </div>
                            <div className="grid grid-cols-3 gap-x-3">
                                <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_17_40)">
                                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_17_40">
                                                <rect width="48" height="48" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.095 43.5014C33.2083 43.5014 43.1155 28.4946 43.1155 15.4809C43.1155 15.0546 43.1155 14.6303 43.0867 14.2079C45.0141 12.8138 46.6778 11.0877 48 9.11033C46.2028 9.90713 44.2961 10.4294 42.3437 10.6598C44.3996 9.42915 45.9383 7.49333 46.6733 5.21273C44.7402 6.35994 42.6253 7.16838 40.4198 7.60313C38.935 6.02428 36.9712 4.97881 34.8324 4.6285C32.6935 4.27818 30.4988 4.64256 28.5879 5.66523C26.677 6.68791 25.1564 8.31187 24.2615 10.2858C23.3665 12.2598 23.1471 14.4737 23.6371 16.5849C19.7218 16.3885 15.8915 15.371 12.3949 13.5983C8.89831 11.8257 5.81353 9.33765 3.3408 6.29561C2.08146 8.4636 1.69574 11.0301 2.2622 13.4725C2.82865 15.9148 4.30468 18.0495 6.38976 19.4418C4.82246 19.3959 3.2893 18.9731 1.92 18.2092V18.334C1.92062 20.6077 2.7077 22.8112 4.14774 24.5707C5.58778 26.3303 7.59212 27.5375 9.8208 27.9878C8.37096 28.3832 6.84975 28.441 5.37408 28.1567C6.00363 30.1134 7.22886 31.8244 8.87848 33.0506C10.5281 34.2768 12.5197 34.9569 14.5747 34.9958C12.5329 36.6007 10.1946 37.7873 7.69375 38.4878C5.19287 39.1882 2.57843 39.3886 0 39.0777C4.50367 41.9677 9.74385 43.5007 15.095 43.4937" fill="#1DA1F2" />
                                    </svg>
                                </button>
                                <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_910_21)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0005 1C18.303 1.00296 12.7923 3.02092 8.45374 6.69305C4.11521 10.3652 1.23181 15.452 0.319089 21.044C-0.593628 26.636 0.523853 32.3684 3.47174 37.2164C6.41963 42.0643 11.0057 45.7115 16.4099 47.5059C17.6021 47.7272 18.0512 46.9883 18.0512 46.36C18.0512 45.7317 18.0273 43.91 18.0194 41.9184C11.3428 43.3608 9.93197 39.101 9.93197 39.101C8.84305 36.3349 7.26927 35.6078 7.26927 35.6078C5.09143 34.1299 7.43223 34.1576 7.43223 34.1576C9.84455 34.3275 11.1123 36.6194 11.1123 36.6194C13.2504 40.2667 16.7278 39.2116 18.0949 38.5952C18.3095 37.0501 18.9335 35.999 19.621 35.4023C14.2877 34.8017 8.68408 32.7548 8.68408 23.6108C8.65102 21.2394 9.53605 18.9461 11.156 17.2054C10.9096 16.6047 10.087 14.1785 11.3905 10.8829C11.3905 10.8829 13.4054 10.2427 17.9916 13.3289C21.9253 12.2592 26.0757 12.2592 30.0095 13.3289C34.5917 10.2427 36.6026 10.8829 36.6026 10.8829C37.9101 14.1706 37.0875 16.5968 36.8411 17.2054C38.4662 18.9464 39.353 21.2437 39.317 23.6187C39.317 32.7824 33.7015 34.8017 28.3602 35.3905C29.2186 36.1334 29.9856 37.5836 29.9856 39.8122C29.9856 43.0051 29.9578 45.5736 29.9578 46.36C29.9578 46.9962 30.391 47.7391 31.6071 47.5059C37.0119 45.7113 41.5984 42.0634 44.5462 37.2147C47.4941 32.3659 48.611 26.6326 47.6972 21.0401C46.7835 15.4476 43.8986 10.3607 39.5587 6.68921C35.2187 3.01771 29.7067 1.00108 24.0085 1H24.0005Z" fill="#191717" />
                                            <path d="M9.08887 35.264C9.03721 35.3826 8.84645 35.4181 8.69146 35.3351C8.53646 35.2522 8.42122 35.098 8.47686 34.9755C8.5325 34.853 8.71928 34.8214 8.87428 34.9044C9.02927 34.9874 9.14848 35.1455 9.08887 35.264Z" fill="#191717" />
                                            <path d="M10.0626 36.3428C9.98028 36.384 9.88612 36.3955 9.79622 36.3753C9.70632 36.3551 9.62629 36.3045 9.56979 36.2321C9.41479 36.0662 9.38298 35.837 9.50221 35.7342C9.62143 35.6315 9.83606 35.6789 9.99105 35.8449C10.146 36.0108 10.1818 36.24 10.0626 36.3428Z" fill="#191717" />
                                            <path d="M11.0085 37.714C10.8614 37.8167 10.6111 37.714 10.472 37.5085C10.4335 37.4716 10.4029 37.4274 10.382 37.3785C10.3611 37.3297 10.3503 37.2771 10.3503 37.224C10.3503 37.1709 10.3611 37.1183 10.382 37.0694C10.4029 37.0205 10.4335 36.9763 10.472 36.9395C10.619 36.8407 10.8694 36.9395 11.0085 37.141C11.1476 37.3425 11.1516 37.6112 11.0085 37.714Z" fill="#191717" />
                                            <path d="M12.2921 39.0417C12.161 39.1879 11.8947 39.1484 11.6761 38.9508C11.4575 38.7532 11.4059 38.4845 11.537 38.3423C11.6682 38.2 11.9344 38.2395 12.161 38.4331C12.3875 38.6268 12.4312 38.8994 12.2921 39.0417Z" fill="#191717" />
                                            <path d="M14.0923 39.8162C14.0327 40.0019 13.7625 40.0849 13.4922 40.0059C13.222 39.9268 13.0432 39.7055 13.0948 39.5159C13.1465 39.3262 13.4207 39.2393 13.6949 39.3262C13.9691 39.4131 14.144 39.6226 14.0923 39.8162Z" fill="#191717" />
                                            <path d="M16.0557 39.9505C16.0557 40.1442 15.8331 40.3101 15.547 40.3141C15.2608 40.318 15.0264 40.16 15.0264 39.9663C15.0264 39.7727 15.2489 39.6067 15.535 39.6028C15.8212 39.5988 16.0557 39.753 16.0557 39.9505Z" fill="#191717" />
                                            <path d="M17.8838 39.6463C17.9196 39.8399 17.7208 40.0414 17.4347 40.0888C17.1486 40.1363 16.8982 40.0217 16.8624 39.832C16.8267 39.6423 17.0333 39.4368 17.3115 39.3855C17.5897 39.3341 17.848 39.4526 17.8838 39.6463Z" fill="#191717" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_910_21">
                                                <rect width="48" height="48" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>

                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} action="#" className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    id="FirstName"
                                    name="first_name"
                                    {...register("first_name", { required: true })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.first_name && <span>This field is required</span>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    id="LastName"
                                    name="last_name"
                                    {...register("last_name", { required: true })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.last_name && <span className='text-red-700'>This field is required</span>}
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    {...register("email", { required: true })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.email && <span className='text-red-700'>This field is required</span>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    {...register("password", { required: 'Password is required', required:'true', minLength:6,
                                    maxLength:20,
                                 
                                })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-500">Password is must be 8 charecther</p>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">Password Confirmation</label>
                                <input
                                    type="password"
                                    id="PasswordConfirmation"
                                    name="confirmPassword"
                                    {...register("confirmPassword", {
                                        required: 'Please confirm your password',
                                        validate: value =>
                                            value === password || 'The passwords do not match'
                                    })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                            </div>


                            <div className="col-span-6">
                                <label htmlFor="MarketingAccept" className="flex gap-4">
                                    <input
                                        type="checkbox"
                                        id="MarketingAccept"
                                        name="marketing_accept"
                                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                                    />

                                    <span className="text-sm text-gray-700">
                                        I want to receive emails about events, product updates and company announcements.
                                    </span>
                                </label>
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                    and
                                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button type='submit' 
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <Link to="/login" className="text-gray-700 underline">Log in</Link>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default Singup