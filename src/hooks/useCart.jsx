
const useCart = () =>{
    const { data, isLoading, error } = useQuery('example', async () => {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      });
    
}

export default useCart