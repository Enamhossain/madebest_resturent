import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { refetch, data: cart = [], isLoading } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Ensure query is only executed when user email is available
    });

    return [cart, refetch, isLoading];
};

export default useCart;
