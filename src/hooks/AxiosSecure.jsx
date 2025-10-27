import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://madebestresturent.vercel.app',
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    }
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)

    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        function (response) {
            // Add cache headers for GET requests
            if (response.config.method === 'get') {
                response.headers['Cache-Control'] = 'private, max-age=300'; // 5 minutes
            }
            
            return response;
        },
        async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await logOut()
                navigate('/login')
            }
        
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;