// import { useEffect, useState } from "react";
import useAxiosPublic from "./axiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    
    const { data: menu = [], isPending: loading, refetch, isError, error } = useQuery({
        queryKey: ['menu'], 
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            return res.data;
        },
        // Advanced Caching Strategy
        staleTime: 1000 * 60 * 60, // Consider data fresh for 1 hour
        gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false, // Prevent extra calls when switching tabs
        refetchOnMount: false, // Don't refetch if we already have data
    });

    return [menu, loading, refetch, isError, error];
}

export default useMenu;