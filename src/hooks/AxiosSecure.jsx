import axios from 'axios'


export const useAxiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})

function AxiosSecure() {
  return useAxiosSecure;
}

export default AxiosSecure