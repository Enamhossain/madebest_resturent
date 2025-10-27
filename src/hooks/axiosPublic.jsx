import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://madebestresturent.vercel.app',
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=300', // Cache for 5 minutes
    }
})

// Add response interceptor for caching
axiosPublic.interceptors.response.use(
    function (response) {
        // Add cache headers for GET requests
        if (response.config.method === 'get') {
            response.headers['Cache-Control'] = 'public, max-age=300'; // 5 minutes
        }
        
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;