import React, { useEffect, useState } from 'react';
import { getGallery } from '../api/apiCall';

const ImageCards = () => {
  const [cardData, setImages] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getGallery();
        const data = res;
        if (data && data.data) {
          const firstNineImages = data.data.slice(0, 6);
          setImages(firstNineImages);
        }
      } catch (err) {
        console.error("Failed to fetch gallery:", err.message);
      }
    }
    fetchData();
  }, []);

  console.log(cardData);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white">
      <div className='flex justify-center mb-10'>
        <h2 className="text-4xl lg:text-5xl poppins-bold text-primary">
          Gallery
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {cardData.map((card) => (
          <div
            key={`grid-${card.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <div className="aspect-[5/4] relative">
              <img
                src={card.path}
                alt={card.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCards;



// import React, { useEffect, useState } from 'react';
// import { get3fromGallery } from '../api/apiCall';

// function Gallery() {
//   const [images, setImages] = useState([]);
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await get3fromGallery();
//         const data = res
//         if (data) {

//           setImages(data.data);
//         }
//       } catch (err) {
//         console.error("Failed to fetch gallery:", err.message);
//       }
//     }
//     fetchData();
//   }, []);



//   return (
//     <div className="container  mx-auto px-4 py-8">
//       <div className='flex justify-center mb-10'>
//         <h2 className="text-4xl lg:text-5xl font-bold text-primary">
//           Gallery
//         </h2>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {images && images.map((src, index) => (
//           <div key={index} className="border-8 border-primary overflow-hidden ¸ˇ">
//             <img
//               src={src.path}
//               alt={`gallery-${index}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Gallery;


// import React, { useEffect, useState } from 'react';
// import { getGallery9 } from '../api/apiCall';

// const ImageCards = () => {

//   const [cardData, setImages] = useState([]);
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await getGallery9();
//         const data = res;
//         if (data && data.data) {
//           const firstNineImages = data.data.slice(0, 10);
//           setImages(firstNineImages);
//         }
//       } catch (err) {
//         console.error("Failed to fetch gallery:", err.message);
//       }
//     }
//     fetchData();
//   }, []);

// console.log(cardData);
//   // const cardData1 = [
//   //   {
//   //     id: 1,
//   //     image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
//   //     alt: "Portrait 1"
//   //   },
//   //   {
//   //     id: 2,
//   //     image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
//   //     alt: "Landscape"
//   //   },
//   //   {
//   //     id: 3,
//   //     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
//   //     alt: "Portrait 2"
//   //   },
//   //   {
//   //     id: 4,
//   //     image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop",
//   //     alt: "Workspace"
//   //   },
//   //   {
//   //     id: 5,
//   //     image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop",
//   //     alt: "Group photo"
//   //   },
//   //   {
//   //     id: 6,
//   //     image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
//   //     alt: "Plant"
//   //   }
//   // ];

//   return (
//     <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//       {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Photo Gallery</h2> */}
//       {/* Horizontal scrollable container */}
//       {/* <div className="overflow-x-auto pb-4">
//         <div className="flex gap-3 w-max">
//           {cardData.map((card) => (
//             <div
//               key={card.id}
//               className="flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
//             >
//               <div className="w-40 h-32 relative">
//                 <img
//                   src={card.image}
//                   alt={card.alt}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div> */}

//       {/* Alternative: Grid layout for responsive design */}
//       <h3 className="text-xl font-semibold text-gray-800 mt-12 mb-6">Photo Gallery</h3>
//       <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
//         {cardData.map((card) => (
//           <div
//             key={`grid-${card.id}`}
//             className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
//           >
//             <div className="aspect-[5/4] relative">
//               <img
//                 src={card.path}
//                 alt={card.alt}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageCards;
