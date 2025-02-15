import React, { useEffect, useState } from 'react'
import Marketimg from '../assets/images/market-image.jpg'
import Marketimg2 from '../assets/images/market-image2.jpg'
import '../Pages/CSS/about.css'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import Marketimg3 from '../assets/images/farmer-mission.jpg'

const About = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Trigger animations when the About page is loaded
      setIsVisible(true);
  
      // Scroll-based animations
      const handleScroll = () => {
        const elements = document.querySelectorAll('.slide-in');
        elements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;
          const isVisible = elementTop < window.innerHeight && elementBottom >= 0;
  
          if (isVisible) {
            element.classList.add('active');
          }
        });
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
      return (
        <div className="about-container3">
        {/* First Section: Title with sliding animation */}
        <h1 className=''>ABOUT US</h1>
  
        {/* First Content Section: Image on the left, text on the right */}
        <div className={`content2 slide-in ${isVisible ? 'active' : ''}`}>
          <img src={Marketimg} alt="" className={`about-image ${isVisible ? 'pop' : ''}`} />
          <div className="about-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo eget
              libero tincidunt, eu aliquet nisl tincidunt. Vivamus euismod, nisl nec aliquet
              tincidunt, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo eget
              libero tincidunt, eu aliquet nisl tincidunt. Vivamus euismod, nisl nec aliquet
              tincidunt, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl.
            </p>
          </div>
        </div>
  
        {/* Second Content Section: Image on the right, text on the left */}
        <div className={`content3 slide-in reverse ${isVisible ? 'active' : ''}`}>
          <div className="about-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo eget
              libero tincidunt, eu aliquet nisl tincidunt. Vivamus euismod, nisl nec aliquet
              tincidunt, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo eget
              libero tincidunt, eu aliquet nisl tincidunt. Vivamus euismod, nisl nec aliquet
              tincidunt, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl.
            </p>
          </div>
          <img src={Marketimg2} alt="" className={`about-image2 ${isVisible ? 'pop' : ''}`} />
        </div>

        <div className='items-center justify-center flex flex-col'>
          <h2 className='text-4xl'>OUR MISSION</h2>
          <img src={Marketimg3} alt='' className={`about-image3 mt-4 ${isVisible ? 'pop' : ''}`}/>
          <div className='text-center mt-3' style={{ width: '100%', maxWidth: '900px' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo eget
              libero tincidunt, eu aliquet nisl tincidunt. Vivamus euismod, nisl nec aliquet
              tincidunt, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl.
            </p>
          </div>
        </div>
  
        {/* Footer with contact info and sliding animation */}
        <footer className="bg-gray-800 text-white py-8 max-w-[calc(300vh)] mt-5 slide-in">
        <div className="container mx-auto px-4 md:px-16 lg:px-24 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p>We are a team dedicated to providing the best products and services to our customers.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Contact Us</h3>
              <div className='mt-3'>
                <a>+62-85923-2932</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-5">Follow Us</h3>
              <div className="flex justify-center space-x-5">
                <a href="#" className="hover:text-gray-400"><FaFacebook size={24} /></a>
                <a href="#" className="hover:text-gray-400"> <FaTwitter size={24} /></a>
                <a href="#" className="hover:text-gray-400"><FaInstagram size={24} /></a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-700">
            <p>© 2024 Market Farmers. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    );
  };

export default About