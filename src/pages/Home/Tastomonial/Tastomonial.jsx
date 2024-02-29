import React, { useState, useEffect } from 'react';

const Tastomonial = () => {
  const [reviews, setReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const reviewsPerPage = 3;

  useEffect(() => {
    fetch('http://localhost:5000/review')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setDisplayedReviews(data.slice(0, reviewsPerPage));
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  const handleShowMoreReviews = () => {
    const startIndex = displayedReviews.length;
    const endIndex = startIndex + reviewsPerPage;
    setDisplayedReviews(reviews.slice(0, endIndex));
  };
  return (
    <section className="block">
    {/* Container */}
    <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
      {/* Heading */}
      <h2 className="mx-auto mb-8 max-w-3xl text-center text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">What our clients are saying</h2>
      {/* Contents */}
      <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mb-8">
        {/* Map through displayed reviews array */}
        {displayedReviews.map((review, index) => (
          <div key={index} className="grid grid-cols-1 gap-6 rounded-md border border-solid border-[#cdcdcd] bg-white p-8 md:p-10">
            <div className="text-[#636262]">Restaurant: {review.restaurant_name}</div>
            <div className="text-[#636262]">Reviewer: {review.reviewer_name}</div>
            <div className="text-[#636262]">Rating: {review.rating}</div>
            <div className="text-[#636262]">Comment: {review.comment}</div>
          </div>
        ))}
      </div>
      {/* Text Button */}
      <div className="flex flex-col">
        {!showAll && displayedReviews.length < reviews.length && (
          <button onClick={handleShowMoreReviews} className="mx-auto font-bold text-black">Check more reviews</button>
        )}
      </div>
    </div>
  </section>
  );
};

export default Tastomonial;
