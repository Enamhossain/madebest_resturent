// import { useEffect, useState } from "react";
import useAxiosPublic from "./axiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    
    const { data: menu = [], isPending: loading, refetch, isError, error } = useQuery({
        queryKey: ['menu'], 
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            const rawData = res.data?.data || res.data || [];
            
            // Normalize data to ensure consistency
            return rawData.map(item => ({
                ...item,
                // Ensure Title is always accessible via Title property (some items might have title)
                Title: item.Title || item.title || 'Untitled Dish',
                // Handle local asset paths from API which won't work in browser
                img: (item.img && !item.img.startsWith('..')) 
                    ? item.img 
                    : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
                // Ensure category is lowercase for consistent filtering
                category: item.category?.toLowerCase() || 'unclassified'
            }));
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return [menu, loading, refetch, isError, error];
}

export default useMenu;