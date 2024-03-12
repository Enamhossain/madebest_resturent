import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    // Request interceptor to attach the JWT token to every request
    const navigate = useNavigate()

    const { logOut } = useContext(AuthContext)

    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem('access-token');
            // console.log('Request intercepted by interceptor:', token);
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        function (error) {
            // If request fails, handle error here
            return Promise.reject(error);
        }
    );

    // Response interceptor to handle unauthorized and forbidden access
    axiosSecure.interceptors.response.use(
        function (response) {
            // If request succeeds, return the response directly
            return response;
        },
           async (error)  => {
            // If request fails, check the status code
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // Handle unauthorized or forbidden access here
                // console.log('Unauthorized or forbidden access:', error.response.status);
                 await logOut()
                navigate('/login')
            }
            // Return the error to continue propagating it
            return Promise.reject(error);
        }
    );


    return axiosSecure;



};

export default useAxiosSecure;