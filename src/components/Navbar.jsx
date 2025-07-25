import { useEffect, useState, useRef } from 'react';
import { IoClose, IoReorderThree } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import sahiLogo from '../../public/assets/sahiLogo.svg';
// import { Urls } from '../constants/whatsappUrl';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [gradientScroll, setGradientScroll] = useState(true);
  const navRef = useRef();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      setOpen(false);
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [open]);

  useEffect(() => {
    const handleScrollChange = () => {
      const scrollPosition = window.scrollY;
      setGradientScroll(scrollPosition <= 550);
    };

    window.addEventListener('scroll', handleScrollChange);
    return () => {
      window.removeEventListener('scroll', handleScrollChange);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className={`fixed w-full flex items-center z-40 justify-between p-4 px-12 lg:px-36 md:px-24 duration-150 ease-in ${gradientScroll ? 'bg-gradient-to-b from-transparent to-transparent text-white' : 'bg-white shadow-sm'}`}
    >
      {/* Logo */}
      <a href="/" className="flex gap-3 items-center hover:cursor-pointer">
        <img src={sahiLogo} alt="logo" className={`w-5 md:w-8 h-auto ${gradientScroll && 'brightness'}`} />
      </a>

      {/* Desktop Nav */}
      <div className="lg:flex gap-5 hidden font-semibold">
        <Link className={`hover-underline-animation hover:scale-110 duration-150 transition-all ${gradientScroll ? 'after:bg-white' : 'after:bg-[#335C67]'}`} to="/">Home</Link>
        <Link className={`hover-underline-animation hover:scale-110 duration-150 transition-all ${gradientScroll ? 'after:bg-white' : 'after:bg-[#335C67]'}`} to="/about">About</Link>
        {/* <Link className={`hover-underline-animation hover:scale-110 duration-150 transition-all ${gradientScroll ? 'after:bg-white' : 'after:bg-[#335C67]'}`} to="/sessions">Sessions</Link> */}
        {/* <Link className={`hover-underline-animation hover:scale-110 duration-150 transition-all ${gradientScroll ? 'after:bg-white' : 'after:bg-[#335C67]'}`} to="/schedule">Schedule</Link> */}
        <Link className={`hover-underline-animation hover:scale-110 duration-150 transition-all ${gradientScroll ? 'after:bg-white' : 'after:bg-[#335C67]'}`} to="/gallery">Gallery</Link>
        <Link className={`hover-underline-animation hover:scale-110 duration-150 transition-all ${gradientScroll ? 'after:bg-white' : 'after:bg-[#335C67]'}`} to="/result">Result</Link>
      </div>

      <a href={"https://whatsapp.com/channel/0029Vah3yMIFXUuiwpmjes30"} className={`rounded text-white font-bold text-lg p-1.5 px-6 lg:block hidden ${gradientScroll ? 'bg-transparent border border-white hover:text-white hover:bg-[#335C67] hover:border-0' : 'text-white bg-[#335C67]'}`}>
        Join Us
      </a>

      {/* Mobile Nav */}
      <div className="block lg:hidden z-40">
        {!open ? (
          <IoReorderThree
            onClick={() => setOpen(true)}
            size={40}
            className="text-black transition-all duration-200"
          />
        ) : (
          <IoClose
            onClick={() => setOpen(false)}
            size={40}
            className="text-[#335C67] transition-all duration-200 z-50 relative"
          />
        )}

        {open && (
          <div
            className="fixed top-0 right-0 h-1/3 w-full lg:w-8/12 backdrop-blur-[100px] bg-white/95 shadow-2xl z-40 flex flex-col gap-5 font-semibold text-lg p-6 pt-14 overflow-y-auto animate-slide-in"
            data-aos="fade-down"
          >
            <Link className="text-[#335C67] hover:text-[#9E2A2B] transition-all" to="/">Home</Link>
            <Link className="text-[#335C67] hover:text-[#9E2A2B] transition-all" to="/about">About</Link>
            {/* <Link className="text-[#335C67] hover:text-[#9E2A2B] transition-all" to="/sessions">Sessions</Link> */}
            {/* <Link className="text-[#335C67] hover:text-[#9E2A2B] transition-all" to="/schedule">Schedule</Link> */}
            <Link className="text-[#335C67] hover:text-[#9E2A2B] transition-all" to="/gallery">Gallery</Link>
            <Link className="text-[#335C67] hover:text-[#9E2A2B] transition-all" to="/result">Result</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
