import { useState, useEffect } from 'react';
import { Calendar, Users, Award, ArrowRight, Star, Heart, Sparkles } from 'lucide-react';
import Navbar1 from './Navbar1';
import Footer from './Footer';

export default function SahityotsavAbout() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const images = [
    "/about1.jpeg",
    "/about2.jpeg",
    "/about3.jpeg"
  ];


  const stats = [
    { icon: Calendar, value: "31", label: "Years of Excellence" },
    { icon: Users, value: "26", label: "States Participating" },
    { icon: Award, value: "1000+", label: "Young Talents" }
  ];

  return (
    <>
      <Navbar1 />
      <div className="min-h-screen bg-[#DDEBEF]">
        {/* Subtle Animated Background Pattern */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute top-1/3 -right-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-200"></div>
          <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-400"></div>
        </div>

        <div className="relative z-10 pt-16 md:pt-20">
          <div className={`px-4 py-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <img
                  src="sahityotsavText.png"
                  alt="Sahityotsav"
                  className="h-28 md:h-32 object-contain"
                  style={{
                    filter: 'brightness(0) sepia(1) hue-rotate(160deg) saturate(400%) contrast(1.1)'
                  }}
                />
              </div>
              <p className="text-gray-600 text-lg poppins-medium">Cultural Excellence Since 1993</p>
            </div>

            {/* Image Carousel */}
            <div className="relative max-w-sm mx-auto mb-8">
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent z-10"></div>
                    <img
                      src={img}
                      alt={`Sahityotsav ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-xl poppins-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs text-gray-600 poppins-normal leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* About Content */}
          <div className="px-4 pb-8">
            <div className="max-w-lg mx-auto">
              {/* Main Content Card */}
              <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-blue-200 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`} style={{ transitionDelay: '600ms' }}>

                {/* About Header */}
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800"></h2>
                </div>

                {/* Content */}
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-base">
                    <span className="text-blue-600 font-semibold">Incepted 31 years ago in 1993</span>, Sahityotsav has its commencement from the grassroot level - that is a family Sahityotsav. Crossing the levels of units, sectors, divisions, districts and <span className="text-blue-600 font-semibold">26 states</span> in the country, it finds its actualization in the national level each year.
                  </p>

                  <p className="text-base">
                    As a prime aim, Sahityotsav is focusing on the <span className="text-purple-600 font-semibold">embellishment of the creativity</span> of thousands and more students across the country, and now it became one of the towering figures in the realm of cultural festivals of India.
                  </p>

                  <p className="text-base">
                    Sahityotsav has its assets of thousands of <span className="text-blue-600 font-semibold">young vibrant studentdom</span> who have came forward to meet the need of the time in its various aspects. They are ready to question all the anti social hullabaloos using their talents like <span className="text-purple-600 font-semibold">writing, drawing, criticizing</span>... etc.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={() => window.open("https://whatsapp.com/channel/0029Vah3yMIFXUuiwpmjes30", "_blank")}
                    className="inline-flex items-center px-6 py-3 bg-primary rounded-full text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Join Our Legacy
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>

                </div>
              </div>

              {/* Bottom Decorative Elements */}
              <div className="flex justify-center space-x-4 mt-6 opacity-60">
                <Star className="w-4 h-4 text-blue-500 animate-pulse" />
                <Star className="w-3 h-3 text-purple-500 animate-pulse animation-delay-200" />
                <Star className="w-4 h-4 text-pink-500 animate-pulse animation-delay-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}