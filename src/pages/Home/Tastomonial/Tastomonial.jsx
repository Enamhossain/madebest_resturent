import { useState, useEffect, memo } from 'react';
import useAxiosPublic from '../../../hooks/axiosPublic';

const Tastomonial = memo(() => {
  const [reviews, setReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const reviewsPerPage = 3;

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get('/review?limit=9')
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setReviews(data);
          setDisplayedReviews(data.slice(0, reviewsPerPage));
        } else {
          setReviews([]);
          setDisplayedReviews([]);
        }
        setLoading(false);
      })
      .catch(error => {
        // Handle JSON parsing errors and network errors gracefully
        if (error.response) {
          // Server responded with error status
          console.error('Error fetching reviews:', error.response.status, error.response.data);
        } else if (error.request) {
          // Request made but no response
          console.error('Error fetching reviews: No response from server');
        } else {
          // Error setting up request
          console.error('Error fetching reviews:', error.message);
        }
        setReviews([]);
        setDisplayedReviews([]);
        setLoading(false);
      });
  }, [axiosPublic]);

  const handleShowMoreReviews = () => {
    const startIndex = displayedReviews.length;
    const endIndex = startIndex + reviewsPerPage;
    setDisplayedReviews(reviews.slice(0, endIndex));
  };

  if (loading) {
    return (
      <section className="block">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div className="h-12 w-96 bg-gray-300 rounded mx-auto mb-12 animate-pulse"></div>
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-md border border-solid border-gray-200 bg-white p-8 animate-pulse">
                <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-40 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>
                <div className="h-20 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="block">
    {/* Container */}
    <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
      {/* Heading */}
      <h2 className="mx-auto mb-8 max-w-3xl text-center text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">What our clients are saying</h2>
      {/* Contents */}
      <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mb-8">
        {/* Map through displayed reviews array */}
        {displayedReviews.length > 0 ? displayedReviews.map((review) => (
          <div key={review._id} className="grid grid-cols-1 gap-6 rounded-md border border-solid border-[#cdcdcd] bg-white p-8 md:p-10">
            <div className="text-[#636262]">Name: {review.name}</div>
            <div className="text-[#636262]">Rating: {review.rating}</div>
            <div className="text-[#636262]">Comment: {review.details}</div>
          </div>
        )) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No reviews available yet.
          </div>
        )}
      </div>
      {/* Text Button */}
      <div className="flex flex-col">
        {displayedReviews.length < reviews.length && (
          <button onClick={handleShowMoreReviews} className="mx-auto font-bold text-black hover:text-orange-500 transition-colors">Check more reviews</button>
        )}
      </div>
    </div>
  </section>
  );
});

Tastomonial.displayName = 'Tastomonial';

export default Tastomonial;
