import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://madebestresturent.vercel.app',
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=300', // Cache for 5 minutes
    }
})

// Add response interceptor for caching and error handling
axiosPublic.interceptors.response.use(
    function (response) {
        // Add cache headers for GET requests
        if (response.config.method === 'get') {
            response.headers['Cache-Control'] = 'public, max-age=300'; // 5 minutes
        }
        
        // Validate response is JSON
        const contentType = response.headers['content-type'];
        if (contentType && !contentType.includes('application/json')) {
            console.warn('Response is not JSON:', contentType);
        }
        
        return response;
    },
    function (error) {
        // Handle JSON parsing errors
        if (error.response) {
            const contentType = error.response.headers['content-type'];
            if (contentType && !contentType.includes('application/json')) {
                // Server returned non-JSON (likely HTML error page)
                error.isJsonError = true;
                error.message = 'Server returned non-JSON response. Please check the API endpoint.';
            }
        }
        return Promise.reject(error);
    }
);

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;