import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { refetch, data: cart = [], isLoading, isError, error } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
        staleTime: 1000 * 30, // 30 seconds stale time for cart
        gcTime: 1000 * 60 * 5, // 5 minutes garbage collection
        refetchOnWindowFocus: true, // Refetch when returning to tab
        retry: 2,
    });

    return [cart, refetch, isLoading, isError, error];
};

export default useCart;
