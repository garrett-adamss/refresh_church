"use client";

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

// Reviews verified on Google Maps in November 2026. Use calendar years so
// their displayed dates do not become stale like fixed relative dates.
const reviews = [
  {
    name: "Kidslik65 Nunya",
    rating: 5,
    text: "Highly recommend. This is a spirit filled church.",
    date: "2026"
  },
  {
    name: "Will Groulx",
    rating: 5,
    text: "Great people and vibes",
    date: "2026"
  },
  {
    name: "Kelley Golay",
    rating: 5,
    text: "Visiting from Jerome, Idaho. People were very friendly and genuine. Loved the worship music.  The message was biblically solid and substantive. We will be back again sometime."
  }
];

export default function GoogleReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // Change review every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="mb-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="flex items-center mr-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Google Reviews</h2>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <a className="ml-2 text-gray-600 text-sm underline" href="https://www.google.com/maps/place/Refresh+Church/@43.638515,-116.480845,17z/data=!4m8!3m7!1s0x54afab6678a860ad:0x82e71e5f1b73360!8m2!3d43.638515!4d-116.480845!9m1!1b1!16s%2Fg%2F11mr0q5s1n" >See all Google reviews</a>
            </div>
          </div>
        </div>

        {/* Reviews container with swipe transition */}
        <div className="relative overflow-hidden w-full">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(calc(-${currentIndex} * 100% / ${reviews.length}))`,
              width: `${reviews.length * 100}%`
            }}
          >
            {reviews.map((review, index) => (
              <div 
                key={index}
                className="flex-shrink-0"
                style={{ 
                  width: `calc(100% / ${reviews.length})`,
                  maxWidth: `calc(100% / ${reviews.length})`
                }}
              >
                <div className="w-full overflow-hidden">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-gray-600 font-semibold text-lg">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <h3 className="font-semibold text-gray-900 truncate">{review.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center flex-shrink-0">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        {review.date && <span className="ml-2 text-gray-500 text-sm whitespace-nowrap">{review.date}</span>}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed break-words">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

