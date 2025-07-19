import { useEffect, useState } from 'react';
import { getGallery } from '../api/apiCall';
import Footer from '../components/Footer';
import Navbar1 from '../components/Navbar1';

// Add shimmer animation styles
const shimmerStyles = `
  @keyframes shimmer {
    0% {
      background-position: -400% 0;
    }
    100% {
      background-position: 400% 0;
    }
  }
  
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
`;

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getGallery();
        const data = res;
        if (data) {
          setImages(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch gallery:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDownload = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageName || `gallery-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const openPreview = (image, index) => {
    setSelectedImage({ ...image, index });
    setIsPreviewOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = selectedImage.index;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage({ ...images[newIndex], index: newIndex });
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPreviewOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closePreview();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPreviewOpen, selectedImage]);

  if (loading) {
    return (
      <>
      <Navbar1 />
        <div className="container mx-auto px-4 py-8 pt-28">
          <div className='flex justify-center mb-10'>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#335C67]">Gallery</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Shimmer Image Placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:400%_100%]"></div>
                </div>
                
                {/* Shimmer Card Footer */}
                <div className="p-4">
                  <div className="mb-2">
                    <div className="h-4 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%]"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%]"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 w-full z-50">
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
    <Navbar1 />
      <style>{shimmerStyles}</style>    
      <div className="container mx-auto px-4 py-8 pb-36 pt-28">
        <div className='flex justify-center mb-10'>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#335C67]">
            Gallery
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image Container */}
              <div 
                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => openPreview(image, index)}
              >
                <img
                  src={image.path}
                  alt={`gallery-${index}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPreview(image, index);
                      }}
                      className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 font-medium"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                      </svg>
                      Preview
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(image.path, `gallery-image-${index + 1}`);
                      }}
                      className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 font-medium"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                        />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => openPreview(image, index)}
                    className="text-[#c7d9a7] hover:text-[#b5c796] transition-colors duration-200"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDownload(image.path, `gallery-image-${index + 1}`)}
                    className="text-[#c7d9a7] hover:text-[#b5c796] transition-colors duration-200"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {images.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No images found in the gallery.</div>
          </div>
        )}
      </div>
      
      {/* Image Preview Modal */}
      {isPreviewOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Previous button */}
          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Next button */}
          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            </button>
          
          {/* Image container */}
          <div className="relative max-w-full max-h-full">
            <img
              src={selectedImage.path}
              alt={`gallery-${selectedImage.index}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Image {selectedImage.index + 1}</h3>
                  <p className="text-sm text-gray-300">
                    {selectedImage.index + 1} of {images.length}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(selectedImage.path, `gallery-image-${selectedImage.index + 1}`)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
          
          {/* Keyboard shortcuts hint */}
          <div className="absolute bottom-4 left-4 text-white text-sm opacity-70">
            <p>Use ← → keys to navigate • ESC to close</p>
          </div>
        </div>
      )}
      
      {/* <div className="fixed bottom-0 w-full z-50"> */}
        <Footer />
      {/* </div> */}
    </>
  );
}

export default Gallery;