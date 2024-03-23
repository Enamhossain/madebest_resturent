import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://madebestresturent.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;