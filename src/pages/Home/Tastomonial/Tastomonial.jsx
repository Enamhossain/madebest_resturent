import { useState, useEffect, memo } from 'react';
import useAxiosPublic from '../../../hooks/axiosPublic';
import { HiStar, HiOutlineChatAlt2 } from 'react-icons/hi';
import UseText from '../../../Component/HeadingText/UseText';

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
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [axiosPublic]);

  const handleShowMoreReviews = () => {
    const startIndex = displayedReviews.length;
    const endIndex = startIndex + reviewsPerPage;
    setDisplayedReviews(reviews.slice(0, endIndex));
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <UseText 
          heading="Guest Reviews" 
          subheading="Stories of Satisfaction" 
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-[2rem] bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayedReviews.length > 0 ? displayedReviews.map((review, idx) => (
              <div 
                key={review._id || idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group relative bg-card p-10 rounded-[2.5rem] border border-border transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -right-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                  <HiOutlineChatAlt2 size={96} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <HiStar 
                        key={i} 
                        className={i < (review.rating || 5) ? 'text-primary' : 'text-muted'} 
                        size={20} 
                      />
                    ))}
                  </div>

                  <p className="text-foreground/80 font-medium italic mb-8 leading-relaxed">
                    "{review.details}"
                  </p>

                  <div className="mt-auto flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xl">
                      {review.name?.charAt(0) || 'G'}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{review.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Verified Guest</p>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 glass-card rounded-[2rem]">
                <p className="text-muted-foreground font-medium">No reviews shared yet. Be the first!</p>
              </div>
            )}
          </div>
        )}

        {displayedReviews.length < reviews.length && (
          <div className="flex justify-center">
            <button 
              onClick={handleShowMoreReviews} 
              className="px-8 py-4 bg-muted hover:bg-primary hover:text-white text-foreground font-bold rounded-full transition-all duration-300"
            >
              Explore More Stories
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

Tastomonial.displayName = 'Tastomonial';

export default Tastomonial;
