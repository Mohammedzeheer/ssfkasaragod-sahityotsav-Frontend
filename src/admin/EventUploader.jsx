import React, { useRef, useState } from "react";
import { Upload, Image, Calendar, FileText, Tag } from "lucide-react";

const EventUploader = ({ events, setEvents }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!title || !description || !status || !selectedImage) {
      return alert("All fields are required!");
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("image", selectedImage);

    try {
      // Simulated API call since addEvent is not available
      // const res = await addEvent(formData);
      // if (res?.data) {
      //   setEvents((prev) => [res.data, ...prev]);
      
      // Simulated success response
      setTimeout(() => {
        alert("Event added successfully ✅");
        setTitle("");
        setDescription("");
        setStatus("active");
        setSelectedImage(null);
        setPreviewUrl(null);
        setIsUploading(false);
      }, 2000);
      
    } catch (err) {
      console.error("Upload error:", err.message);
      alert("Failed to upload event ❌");
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
          <p className="text-gray-600">Fill in the details to add your event</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-6">
            
            {/* Title Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Event Title
              </label>
              <input
                type="text"
                placeholder="Enter event title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Description
              </label>
              <textarea
                placeholder="Describe your event in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
              />
            </div>

            {/* Status Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Tag className="w-4 h-4 mr-2 text-blue-600" />
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
              >
                <option value="active">🟢 Active</option>
                <option value="inactive">🔴 Inactive</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Image className="w-4 h-4 mr-2 text-blue-600" />
                Event Image
              </label>
              
              <div
                onClick={handleImageClick}
                className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer group hover:border-blue-400 transition-all duration-300 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
              >
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={previewUrl} 
                      alt="Selected" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2">
                        <Upload className="w-6 h-6 text-gray-700" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                      <Upload className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-medium mb-1">Click to upload image</p>
                    <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                  isUploading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Uploading Event...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Create Event
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">Make sure all information is accurate before submitting</p>
        </div>
      </div>
    </div>
  );
};

export default EventUploader;


// import React, { useRef, useState } from "react";
// import { addEvent } from "../api/apiCall"; // 👈 You need to define this in your API calls

// const EventUploader = ({ events, setEvents }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("active");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef();

//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleUpload = async () => {
//     if (!title || !description || !status || !selectedImage) {
//       return alert("All fields are required!");
//     }

//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("status", status);
//     formData.append("image", selectedImage);

//     try {
//       const res = await addEvent(formData);
//       if (res?.data) {
//         setEvents((prev) => [res.data, ...prev]);
//         alert("Event added successfully ✅");
//         setTitle("");
//         setDescription("");
//         setStatus("active");
//         setSelectedImage(null);
//         setPreviewUrl(null);
//       }
//     } catch (err) {
//       console.error("Upload error:", err.message);
//       alert("Failed to upload event ❌");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 p-6 bg-white">
//       <h1 className="text-black text-2xl font-bold mb-4">Add Event</h1>

//       {/* Title */}
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-96 border px-3 py-2 rounded"
//       />

//       {/* Description */}
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         rows={3}
//         className="w-96 border px-3 py-2 rounded"
//       />

//       {/* Status */}
//       <select
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//         className="w-96 border px-3 py-2 rounded"
//       >
//         <option value="active">Active</option>
//         <option value="inactive">Inactive</option>
//       </select>

//       {/* Image Preview Box */}
//       <div
//         onClick={handleImageClick}
//         className="w-96 h-64 border border-gray-400 cursor-pointer flex items-center justify-center overflow-hidden bg-gray-100"
//       >
//         {previewUrl ? (
//           <img src={previewUrl} alt="Selected" className="w-full h-full object-cover" />
//         ) : (
//           <img
//             src="/image.png"
//             alt="Dummy"
//             className="object-contain w-full h-full opacity-70"
//           />
//         )}
//       </div>

//       {/* Hidden file input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleImageChange}
//         accept="image/*"
//         className="hidden"
//       />

//       {/* Submit button */}
//       <button
//         onClick={handleUpload}
//         disabled={isUploading}
//         className="bg-blue-600 text-white px-10 py-2 rounded hover:bg-blue-700"
//       >
//         {isUploading ? "Uploading..." : "Submit"}
//       </button>
//     </div>
//   );
// };

// export default EventUploader;
