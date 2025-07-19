import { useState, useEffect } from "react";
import { baseUrl, getDataServer } from "../api/apiCall.js";
import { Clock, AlertCircle } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import ImageDownlad from "../users/ImageDownlad.jsx";
import TeamPoint from "../users/TeamPoint.jsx";
import { getCategory, getItem } from "../api/cateGoryAnditem.js";
import Navbar1 from "./Navbar1.jsx";

function ResultPage() {
  const [category, setCategory] = useState("");
  const [toastData, setTostData] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState(null);
  const [images, setImages] = useState([null, null, null]);
  const [color, setColor] = useState([null, null, null]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getCategory();
      setCategories(response.data);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${baseUrl}/showImage`);
        const data = await response.json();

        const imgData = data.data;
        setImages([
          imgData.image1?.image || null,
          imgData.image2?.image || null,
          imgData.image3?.image || null,
        ]);
        setColor([
          imgData.image1?.color || null,
          imgData.image2?.color || null,
          imgData.image3?.color || null,
        ]);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    const fetchItems = async () => {
      const response = await getItem(selected);
      setItems(response.data || []);
    };
    fetchItems();
  };

  const handleItemData = async (e) => {
    const itemValue = e.target.value;
    setSelectedItem(itemValue);
    try {
      toast.loading("Waiting...");
      const response = await getDataServer(itemValue, category);
      const { success, message, data } = response;

      setTostData({
        category: data?.category?.categoryName,
        item: data?.item?.itemName,
      });

      setResults(data);
      toast.dismiss();

      if (success) {
        toast.success(`Yes, ${data?.category?.categoryName} ${data?.item?.itemName} result published`);
      } else {
        toast(`NO, ${data?.category?.categoryName} ${data?.item?.itemName} result published Yet`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.dismiss();
      toast.error("Failed to fetch results. Please try again.");
    }
  };

  return (
    <>
    <Navbar1/>
      <div className="w-full text-center pt-20">
        <h2 className="py-10 text-[#335C67] text-4xl lg:text-5xl font-bold">Results</h2>

        <div className="flex md:flex-row flex-col md:justify-between space-y-4 md:space-y-0 px-10 py-10 lg:pb-20 pt-10 xl:px-56">
          <div className="flex flex-col gap-3 items-start">
            <label className="text-xl text-[#335C67]">Category</label>
            <select
              onChange={handleCategoryChange}
              className="p-2 w-full text-white bg-[#335C67] rounded md:text-lg md:p-3 md:px-8"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-3 items-start">
            <label className="text-xl text-[#335C67]">Item</label>
            <select
              onChange={handleItemData}
              className="p-2 w-full text-white bg-[#335C67] rounded md:text-lg md:p-3 md:px-8"
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.itemName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {results?.result && (
          <>
            <div className="flex flex-col ml-16 md:flex-row justify-between lg:px-52">
              <div className="flex flex-row mb-3 md:mr-5">
                <div className="text-center text-3xl me-3 text-gray-400">01</div>
                <div className="text-start">
                  <p className="text-xl font-semibold">{results.result[0].firstPrize}</p>
                  <p className="text-gray-600">{results.result[0].firstTeam}</p>
                </div>
              </div>
              <div className="flex flex-row mb-3 md:mr-5">
                <div className="text-center text-3xl me-3 text-gray-400">02</div>
                <div className="text-start">
                  <p className="text-xl font-semibold">{results.result[1].secPrize}</p>
                  <p className="text-gray-600">{results.result[1].secTeam}</p>
                </div>
              </div>
              <div className="flex flex-row mb-3">
                <div className="text-center text-3xl me-3 text-gray-400">03</div>
                <div className="text-start">
                  <p className="text-xl font-semibold">{results.result[2].thirdPrize}</p>
                  <p className="text-gray-600">{results.result[2].thirdTeam}</p>
                </div>
              </div>
            </div>

            <div className={`grid grid-cols-1 px-4 py-6 sm:px-8 sm:py-8 lg:px-20 lg:py-12 lg:grid-cols-2 xl:grid-cols-3 bg-slate-100`}>
              {[0, 1, 2].map((index) => (
                <ImageDownlad
                  key={index}
                  results={results}
                  category={results?.category?.categoryName}
                  item={results?.item?.itemName}
                  image={images[index]}
                  color={`text-${color[index]}`}
                />
              ))}
            </div>
          </>
        )}

        {results?.result === false && (
          <div className="flex justify-center m-4">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 max-w-2xl w-full shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Results Not Available</h3>
                <p className="text-gray-700 mb-4">
                  We're still processing the results for <strong>{toastData.category} {toastData.item}</strong>.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-sm font-medium text-orange-800">
                  <Clock className="h-4 w-4 mr-2" />
                  Please check back later
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <TeamPoint />
      <Toaster />
    </>
  );
}

export default ResultPage;
