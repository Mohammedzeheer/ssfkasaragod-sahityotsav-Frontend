import { useState, useEffect } from "react";
import { baseUrl, getDataServer } from "../api/apiCall.js";
import { Clock, AlertCircle } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer.jsx";
import ImageDownlad from "./ImageDownlad.jsx";
import axios from "axios";
import Home from "./Home.jsx";
import TeamPoint from "./TeamPoint.jsx";
import { getCategory, getItem } from "../api/cateGoryAnditem.js";
import Gallery from "./Gallery.jsx";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";
import Theme from "../components/Theme.jsx";

function UserSide() {
  const [category, setCategory] = useState("");
  const [toastData, setTostData] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState(null);
  const [images, setImages] = useState([null, null, null]);
  const [color, setColor] = useState([null, null, null]);
  const [buttonShow, setButtonShow] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setButtonShow(true);
      } else {
        setButtonShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    async function fetchData() {
      const responce = await getCategory()
      setCategories(responce.data)
    }
    fetchData()
  }, [])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/showImage`);
        const data = response.data.data;

        const newImages = [
          data.image1.image
            ? data.image1.image
            : null,
          data.image2.image
            ? data.image2.image
            : null,
          data.image3.image
            ? data.image3.image
            : null,
        ];

        const newColor = [
          data.image1.color ? data.image1.color : null,
          data.image2.color ? data.image2.color : null,
          data.image3.color ? data.image3.color : null,
        ]

        setImages(newImages);
        setColor(newColor)
        newImages.forEach((image, index) => {
          if (image) {
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    async function fetchData() {
      const responce = await getItem(selectedCategory)
      setItems(responce.data || [])
    }
    fetchData()
  };

  const handleItemData = async (event) => {
    const itemValue = event.target.value;
    setSelectedItem(itemValue);

    try {
      toast.loading("Waiting...");
      const response = await getDataServer(itemValue, category);

      const { success, message, data } = response

      setTostData({
        category: data?.category?.categoryName,
        item: data?.item?.itemName,
      })
      toast.dismiss();
      setResults(data);
      if (success) {
        toast.success(`Yes, ${data?.category?.categoryName} ${data?.item?.itemName} result published`);
      } else {

        toast(`NO,  ${data?.category?.categoryName} ${data?.item?.itemName}result published Yet`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.dismiss();
      toast.error("Failed to fetch results. Please try again.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nameRow = "flex flex-row mb-3 md:mr-5 lg:mr-0 ";
  const position =
    "text-center flext items-center poppins-bold text-3xl  me-3 text-gray-400 flex align-middle";
  const resultName = "poppins-semibold text-xl";
  const resultItem = "poppins-medium text-gray-600 -mt-1";

  const getPrizeGradient = (index) => {
    switch (index) {
      case 0: return "from-yellow-400 to-yellow-600";
      case 1: return "from-gray-300 to-gray-500";
      case 2: return "from-amber-600 to-amber-800";
      default: return "from-yellow-400 to-yellow-600";
    }
  };

  return (
    <>
      <Navbar />
      <Home />

      <div id="results" className="w-full text-center ">
        <h2 className="pt-8 pb-3 md:py-10 text-[#335C67] text-4xl lg:text-5xl poppins-bold">
          Results
        </h2>
        <div className="flex md:flex-row flex-col md:justify-between  poppins-medium   space-y-1.5 pt-5 lg:pt-10 md:space-y-0 px-10 py-10 lg:py-20 xl:px-56">
          <div className="flex flex-col gap-3 items-start">
            <label className="text-xl poppins-medium  text-[#335C67]">
              Category
            </label>
            <select
              onChange={handleCategoryChange}
              className="p-2 w-full font-medium text-white bg-[#335C67] rounded md:text-lg md:p-3 md:px-8 "
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category?._id}>
                  {category?.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-3 items-start">
            <label className="text-xl poppins-medium  text-[#335C67]">
              Item
            </label>
            <select
              id="item"
              onChange={handleItemData}
              className="p-2 w-full font-medium text-white bg-[#335C67] rounded md:text-lg md:p-3 md:px-8"
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item._id} value={item?._id}>
                  {item?.itemName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {results?.result && (
          <>
            <div className="bg-secondary rounded-2xl shadow-lg m-2 p-8 border border-gray-100">
              <div className="grid md:grid-cols-3 gap-6">
                {[0, 1, 2].map((index) => {
                  const winner = results.result[index];
                  if (!winner) return null;

                  const prizeNames = [winner.firstPrize, winner.secPrize, winner.thirdPrize];
                  const teams = [winner.firstTeam, winner.secTeam, winner.thirdTeam];
                  const positions = ["First Place", "Second Place", "Third Place"];

                  return (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                      <div className="flex-shrink-0 mr-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getPrizeGradient(index)} flex items-center justify-center text-white font-bold text-lg`}>
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-primary">{positions[index]}</div>
                        <div className="text-lg font-bold poppins-bold  text-gray-900">{prizeNames[index]}</div>
                        <div className="text-sm text-gray-600">{teams[index]}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


            <div

              className={`grid grid-cols-1 px-4 py-6 sm:px-8 sm:py-8 overflow-scroll hide-scrollbar::-webkit-scrollbar hide-scrollbar  lg:px-20 lg:py-12 lg:grid-cols-2 xl:grid-cols-3 ${results ? "bg-slate-100" : ""
                } lg:px-28 `}
            >
              <ImageDownlad
                results={results}
                category={results?.category?.categoryName}
                item={results?.item?.itemName}
                image={images[0]}
                color={`text-${color[0]}`}
              />
              <ImageDownlad
                results={results}
                category={results?.category?.categoryName}
                item={results?.item?.itemName}
                image={images[1]}
                color={`text-${color[1]}`}
              />
              <ImageDownlad
                results={results}
                category={results?.category?.categoryName}
                item={results?.item?.itemName}
                image={images[2]}
                color={`text-${color[2]}`}
              />

            </div>
          </>
        )}

      </div>

      <div className="flex justify-center m-4">
        {results?.result == false && (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6 max-w-2xl w-full shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#335C67] mb-2">
                Results Not Available
              </h3>
              <p className="text-gray-700 mb-4">
                We're still processing the results for the <strong>{toastData.category} {toastData.item}</strong> competition.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-sm font-medium text-orange-800">
                <Clock className="h-4 w-4 mr-2" />
                Please check back later
              </div>
            </div>
          </div>
        )}
      </div>

      <TeamPoint />
      <Theme />
      <Gallery />
      <div className="flex justify-center pb-6">
        <p
          onClick={() => navigate('/gallery')}
          className="text-blue-500 flex items-center gap-2 cursor-pointer hover:underline"
        >
          See more Images <FaLongArrowAltRight />
        </p>
      </div>
      <Footer />
      {buttonShow && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center z-50 fixed bottom-10 right-10  size-11 text-[#335C67] bg-white rounded-full"
        >
          <span
            className="iconify text-xl lg:text-2xl"
            data-icon="mdi:arrow-up"
          ></span>
        </button>
      )}
      <Toaster />
    </>
  );
}

export default UserSide;
