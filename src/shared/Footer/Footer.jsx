import { memo, lazy, Suspense } from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import LazyImage from '../../Component/LazyImage';

const Footer = memo(() => {







    const footerNavs = [
        {
            href: 'javascript:void()',
            name: 'About'
        },
        {
            href: 'javascript:void()',
            name: 'Blog'
        },
        {
            href: 'javascript:void()',
            name: 'Contact'
        },
        {
            href: 'javascript:void()',
            name: 'Team'
        },
        {
            href: 'javascript:void()',
            name: 'Careers'
        },

        {
            href: 'javascript:void()',
            name: 'Support'
        }
    ]


    return (
        <footer className="pt-10  text-white text-lg relative" style={{ backgroundImage: 'url(https://i.ibb.co/27tp6gk/wepik-export-20240125182837v-R6t.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="max-w-screen-xl  md:px-8">
                <div className="grid  grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="mt-2">
                        <h4 className="text-xl mb-1 font-semibold text-orange-500 uppercase">Know About MadeBest</h4>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque soluta suscipit debitis quos rem officiis</p>

                        <LazyImage 
                          src="https://i.ibb.co/VNs4X6g/1705932001959oh7xa24u-removebg-preview.png" 
                          alt="Logo"
                          width={150}
                          height={60}
                          className="w-auto h-auto"
                        />
                    </div>

                    <div>
                        <h4 className="text-3xl mb-4 font-semibold text-orange-500 uppercase">Opening Hours</h4>
                        <table class="table-auto">
                            <thead>

                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td></td>
                                    <td>Closing</td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td></td>
                                    <td className='text-gray-400'>11 Am to 11 pm</td>
                                </tr>
                                <tr className="">
                                    <td>Wednesday</td>
                                    <td></td>
                                    <td className='text-gray-400'>11 Am to 11 pm</td>

                                </tr>
                                <tr className="">
                                    <td>Thursday</td>
                                    <td></td>
                                    <td className='text-gray-400'>11 Am to 11 pm</td>
                                </tr>
                                <tr className="">
                                    <td>Friday</td>
                                    <td></td>
                                    <td className='text-gray-400'>11 Am to 11 pm</td>

                                </tr>
                                <tr className="">
                                    <td>Saturday</td>
                                    <td></td>
                                    <td className='text-gray-400'>11 Am to 11 pm</td>

                                </tr>
                                <tr className="">
                                    <td>Sunday</td>
                                    <td></td>
                                    <td className='text-gray-400'>11 Am to 11 pm</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h4 className="text-3xl mb-4 font-semibold text-orange-500 uppercase">Our Location</h4>

                        <span className=" text-lg font-semibold">Address</span>
                        <p>768 Gulsan Market,Mirpur,Dhaka 1280 </p>

                        <hr className="border-gray-500" />
                        <span className=" text-lg font-semibold">Phone</span>
                        <p> (+880)182233499 </p>
                        <hr className="border-gray-500" />
                        <span className=" text-lg font-semibold">Email</span>
                        <p>info@madebest.com </p>
                        <hr className="border-gray-500" />

                    </div>


                    <div className=" mt-6 md:mt-0">

                        <h3 className="text-orange-500 text-3xl font-semibold ">Newsletter</h3>
                        <p>Subcribe our newsletter & get all promo !</p>


                        <form onSubmit={(e) => e.preventDefault()} className=" gap-x-3 md:justify-end">
                            <div className="relative">
                                <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <button className=" mt-5 w-auto py-3 px-4 font-medium text-sm text-center text-black bg-orange-600 hover:bg-yellow-500 active:bg-yellow-300 active:shadow-none rounded-lg shadow">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <hr />

                <div className="">
                    <ul className="md:items-center justify-center hidden mt-8 space-y-2  sm:space-x-2 sm:space-y-0">
                        {
                            footerNavs.map((item, idx) => (
                                <li className=" hover:text-orange-600 m-2 uppercase">
                                    <a key={idx} href={item.href}>
                                        {item.name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                    <div className=" mt-8 items-center justify-center md:justify-between sm:flex ">
                        <div className="mt-4 sm:mt-0  ml-44 uppercase">
                            &copy; 2022 madebest All rights reserved.
                        </div>
                        <div className="mt-6 sm:mt-0 ml-48 flex flex-col sm:flex-row">
                            <ul className="flex items-center space-x-4">
                                <li className="w-10 h-10 border rounded-full  items-center justify-center">
                                    <a href="javascript:void()">
                                        <FaTwitter className="w-10 h-8 text-blue-400" />
                                    </a>
                                </li>

                                <li className="w-10 h-10 border rounded-full  items-center justify-center">
                                    <a href="javascript:void()">
                                        <FaFacebook className="w-10 h-8 text-blue-700" />
                                    </a>
                                </li>

                                <li className="w-10 h-10 border rounded-full items-center justify-center">
                                    <a href="javascript:void()">
                                        <FaInstagram className="w-10 h-8 text-blue-500" />
                                    </a>
                                </li>

                                <li className="w-10 h-10 border rounded-full items-center justify-center">
                                    <a href="javascript:void()">
                                        <FaLinkedin className="w-10 h-8 text-red-600 rounded-full" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>


            </div>
        </footer>
    )
})

Footer.displayName = 'Footer';

export default Footer;