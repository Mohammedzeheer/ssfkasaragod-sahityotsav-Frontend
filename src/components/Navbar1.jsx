import { useEffect, useState, useRef } from 'react';
import { IoClose, IoReorderThree } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import sahiLogo from '../../public/assets/sahiLogo.svg';

function Navbar1() {
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
      className={`fixed w-full flex items-center z-40 justify-between p-4 px-12 lg:px-36 md:px-24 duration-150 ease-in bg-[#335C67] text-white`}
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

      <a href={""} className={`rounded text-white font-bold text-lg p-1.5 px-6 lg:block hidden ${gradientScroll ? 'bg-transparent border border-white hover:text-white hover:bg-[#335C67] hover:border-0' : 'text-white bg-[#335C67]'}`}>
        Join Us
      </a>

      {/* Mobile Nav */}
      <div className="block lg:hidden z-40">
        {!open ? (
          <IoReorderThree onClick={() => setOpen(true)} size={40} className="text-white" />
        ) : (
          <IoClose className="z-50 relative text-[#335C67]" onClick={() => setOpen(false)} size={40} />
        )}
        {open && (
          <div
            className="fixed backdrop-blur-[200px] bg-white/50 bottom-0 top-0 right-0 shadow-2xl z-40 w-8/12 flex flex-col gap-4 font-semibold text-lg p-6 pt-24"
            data-aos="fade-left"
          >
            <Link className="text-[#335C67]" to="/">Home</Link>
            <Link className="text-[#335C67]" to="/about">About</Link>
            {/* <Link className="text-[#335C67]" to="/sessions">Sessions</Link> */}
            {/* <Link className="text-[#335C67]" to="/schedule">Schedule</Link> */}
            <Link className="text-[#335C67]" to="/gallery">Gallery</Link>
            <Link className="text-[#335C67]" to="/result">Result</Link>
            <a href={''} className="bg-[#335C67] shadow-xl rounded-xl text-white font-bold text-lg p-2 px-6 w-fit">Join Us</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar1;
