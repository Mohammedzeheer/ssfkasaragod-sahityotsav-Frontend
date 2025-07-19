import React, { useEffect, useState } from 'react';
import { get3fromGallery } from '../api/apiCall';

function Gallery() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await get3fromGallery();
        const data = res
        if (data) {

          setImages(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch gallery:", err.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container  mx-auto px-4 py-8">
      <div className='flex justify-center mb-10'>
        <h2 className="text-4xl lg:text-5xl font-bold text-[#335C67]">
          Gallery
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images && images.map((src, index) => (
          <div key={index} className="border-8 border-[#335C67] overflow-hidden ¸ˇ">
            <img
              src={src.path}
              alt={`gallery-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
