import { useState, useEffect, useRef } from "react";
import { baseUrl, getDataServer } from "../api/apiCall.js";
import { Clock, AlertCircle, Trophy, Medal, Award, Download } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import ImageDownlad from "../users/ImageDownlad.jsx";
import { getCategory, getItem } from "../api/cateGoryAnditem.js";
import Navbar1 from "./Navbar1.jsx";
import UnderFooter from "./UnderFooter.jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CertificateTemplate from "./CertificateTemplate.jsx";
import TeamPoint from "../users/TeamPoint.jsx";

function ResultPage() {
  const [category, setCategory] = useState("");
  const [toastData, setTostData] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState(null);
  const [images, setImages] = useState([null, null, null]);
  const [color, setColor] = useState([null, null, null]);
  const certRefs = [useRef(), useRef(), useRef()];

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

  const handleDownloadCertificate = async (index, winnerName, prize, category, item) => {
    const certRef = certRefs[index];
    if (!certRef.current) return;

    try {
      toast.loading("Generating certificate...");
      // Render certificate to canvas
      const canvas = await html2canvas(certRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Create PDF in landscape
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1123, 794], // A4 landscape in px at 96dpi
      });

      pdf.addImage(imgData, "PNG", 0, 0, 1123, 794);
      pdf.save(`${winnerName}_certificate.pdf`);

      toast.dismiss();
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to download certificate. Please try again.");
    }
  };

  const getPrizeIcon = (index) => {
    switch (index) {
      case 0: return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 1: return <Medal className="h-8 w-8 text-gray-400" />;
      case 2: return <Award className="h-8 w-8 text-amber-600" />;
      default: return <Trophy className="h-8 w-8 text-yellow-500" />;
    }
  };

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
      <Navbar1 />
      <div className="min-h-screen bg-secondary">
        {/* Header Section */}
        <div className="w-full text-center pt-20 bg-secondary shadow-sm">
          <h2 className="py-10 text-primary text-4xl lg:text-5xl font-bold">Results</h2>
        </div>

        {/* Selection Section */}
        <div className="bg-secondary py-8 shadow-sm">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-lg font-semibold text-primary block">Category</label>
                <select
                  onChange={handleCategoryChange}
                  className="w-full p-4 text-white bg-primary rounded-lg text-lg font-medium border-0 focus:ring-4 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-lg font-semibold text-primary block">Item</label>
                <select
                  onChange={handleItemData}
                  className="w-full p-4 text-white bg-primary rounded-lg text-lg font-medium border-0 focus:ring-4 focus:ring-primary/20 transition-all"
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
          </div>
        </div>

        {/* Results Section */}
        {results?.result && Array.isArray(results.result) && (
          <div className="py-8 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              {/* Event Info */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full text-lg font-semibold mb-4">
                  <Trophy className="h-5 w-5 mr-2" />
                  {results?.category?.categoryName} - {results?.item?.itemName}
                </div>
              </div>


              {/* Summary Card */}
              <div className="bg-secondary rounded-2xl shadow-lg p-8 border border-gray-100">
                {/* <h3 className="text-2xl font-bold text-primary mb-6 text-center">Competition Summary</h3> */}
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
                          <div className="text-lg font-bold text-gray-900">{prizeNames[index]}</div>
                          <div className="text-sm text-gray-600">{teams[index]}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Poster Section */}
            <div className="mt-12">
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
            </div>

            {/* Winners Display and certificate */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12 m-5">
              {[0, 1, 2].map((index) => {
                const winner = results.result[index];
                if (!winner) return null;

                const prizes = ["First", "Second", "Third"];
                const prizeNames = [winner.firstPrize, winner.secPrize, winner.thirdPrize];
                const teams = [winner.firstTeam, winner.secTeam, winner.thirdTeam];
                const positions = ["1st", "2nd", "3rd"];

                return (
                  <div key={index} className={`relative ${index === 0 ? 'lg:order-2 lg:-mt-8' : index === 1 ? 'lg:order-1' : 'lg:order-3'}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                      <div className={`bg-gradient-to-r ${getPrizeGradient(index)} p-4 text-center`}>
                        <div className="flex justify-center mb-2">
                          {getPrizeIcon(index)}
                        </div>
                        <div className="text-white poppins-bold text-xl">{positions[index]} Place</div>
                      </div>

                      <div className="p-6 text-center">
                        <h3 className="text-2xl poppins-bold text-primary mb-2">
                          {prizeNames[index]}
                        </h3>
                        <p className="text-gray-600 text-lg mb-4">{teams[index]}</p>

                        <button
                          onClick={() => handleDownloadCertificate(
                            index,
                            prizeNames[index],
                            prizes[index],
                            results?.category?.categoryName,
                            results?.item?.itemName
                          )}
                          className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a4d56] transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download Certificate
                        </button>
                      </div>
                    </div>

                    <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
                      <CertificateTemplate
                        ref={certRefs[index]}
                        winnerName={prizeNames[index]}
                        prize={prizes[index]}
                        category={results?.category?.categoryName}
                        item={results?.item?.itemName}
                        team={teams[index]}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Results State */}
        {results?.result === false && (
          <div className="py-12 bg-secondary">
            <div className="max-w-2xl mx-auto px-6">
              <div className="bg-white border border-orange-200 rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Results Not Available</h3>
                <p className="text-gray-700 mb-6 text-lg">
                  We're still processing the results for <strong>{toastData.category} {toastData.item}</strong>.
                </p>
                <div className="inline-flex items-center px-6 py-3 bg-orange-100 rounded-full text-orange-800 font-semibold">
                  <Clock className="h-5 w-5 mr-2" />
                  Please check back later
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <UnderFooter />
      <Toaster />
    </>
  );
}

export default ResultPage;

