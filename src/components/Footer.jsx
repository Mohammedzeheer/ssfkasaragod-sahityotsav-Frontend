import font from '../../public/assets/fontssf.png';
import { RiInstagramFill } from 'react-icons/ri';
import { FaYoutube, FaFacebookSquare } from 'react-icons/fa';

function Footer() {
  return (
    <div className='bg-[#335C67] p-6 px-12 lg:px-36 md:px-24 pt-6 pb-10 shadow-[0_35px_60px_5px_rgba(0,0,0,0.3)] w-full z-50'>
      {/* Main footer content */}
      <div className='flex justify-between items-center mb-4'>
        <div>
          <img 
            src={font} 
            alt='ssf' 
            className='w-[50%] filter brightness-0 invert' 
            loading='lazy' 
          />
          <h1 className='font-extrabold text-base md:text-lg uppercase text-white'>Kasaragod</h1>
        </div>
        <div className='flex gap-1 items-center text-white'>
          <a
            href='https://www.instagram.com/ssfkasaragod?utm_source=qr&igsh=MWpscWtmMmZlN3JpOA=='
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-pink-400 transition-colors duration-300'
          >
            <RiInstagramFill size={25} />
          </a>
          <a
            href='https://youtube.com/@ssfkasaragod3503?si=lXVlxI3NApgezM0t'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-red-400 transition-colors duration-300'
          >
            <FaYoutube size={30} />
          </a>
          <a
            href='https://www.facebook.com/share/SgretEfjQ7zvBEoB/?mibextid=qi2Omg'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-400 transition-colors duration-300'
          >
            <FaFacebookSquare size={25} />
          </a>
        </div>
      </div>
      
      {/* Developer credit */}
      <div className='border-t border-gray-600 pt-4 text-center'>
        <p className='text-gray-300 text-sm'>
          Designed and Developed by{' '}
          <a
            href='https://mohammedzaheer.netlify.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#c5b987] hover:text-blue-300 transition-colors duration-300 font-medium'
          >
            Zaheer Posoat
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
