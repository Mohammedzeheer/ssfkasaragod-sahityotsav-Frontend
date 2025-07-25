import { useEffect, useState } from "react";
import { getEvents } from "../api/apiCall";

export default function EventImageCarousel() {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getEvents();
        const data = res;
        if (data) {
          const activeEvents = data.filter((event) => event.status === "active");
          setImages(activeEvents);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStartIndex((prev) => {
        if (isMobile) {
          // Mobile: scroll one image at a time
          return (prev + 1) % images.length;
        } else {
          // Desktop: scroll one position at a time through all images
          return (prev + 1) % images.length;
        }
      });
    }, isMobile ? 2000 : 3000); // 2 seconds for mobile, 3 seconds for desktop

    return () => clearInterval(interval);
  }, [images.length, isMobile]);

  // Get the current images to display based on device type
  const getVisibleImages = () => {
    if (isMobile) {
      // Mobile: show only one image at a time
      return [images[currentStartIndex]].filter(Boolean);
    } else {
      // Desktop: show 5 images in a single row, scrolling through all images
      const visible = [];
      const imagesToShow = Math.min(5, images.length); // Show up to 5 images or all if less than 5
      
      for (let i = 0; i < imagesToShow; i++) {
        const index = (currentStartIndex + i) % images.length;
        visible.push(images[index]);
      }
      return visible;
    }
  };

  const handleDotClick = (index) => {
    setCurrentStartIndex(index);
  };

  const visibleImages = getVisibleImages();

  if (images.length === 0) {
    return (
      <div className="w-full py-8">
        <div className="flex justify-center items-center h-64 bg-gray-100 rounded-xl">
          <p className="text-gray-500">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4">
      {/* Main carousel container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Images container */}
        <div className={`gap-4 mb-6 ${
          isMobile 
            ? "flex justify-center" 
            : "flex justify-center"
        }`}>
          {visibleImages.map((img, displayIndex) => (
            <div
              key={`${currentStartIndex}-${displayIndex}`}
              className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isMobile ? "w-80 max-w-[90vw]" : "w-48 flex-shrink-0"
              }`}
            >
              {/* Instagram Portrait Aspect Ratio Container (1080:1350 = 4:5) */}
              <div className="relative bg-white rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/5' }}>
                <img
                  src={img.image}
                  alt={img.title || `Event ${displayIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg'; // Fallback image
                  }}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-sm mb-1">
                      {img.title || 'Event'}
                    </h3>
                    {img.date && (
                      <p className="text-xs opacity-90">{img.date}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentStartIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentStartIndex(prev => 
                prev === 0 ? images.length - 1 : prev - 1
              )}
              className="absolute left-1 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentStartIndex(prev => 
                (prev + 1) % images.length
              )}
              className="absolute right-1 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
