// import { useEffect, useState } from "react";
import useAxiosPublic from "./axiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {

    const axiosPublic = useAxiosPublic();
    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/menu');
            return res.data;
        }
    })


    return [menu, loading, refetch]
}

export default useMenu;