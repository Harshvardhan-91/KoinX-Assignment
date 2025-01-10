import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/koinx-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white h-16 flex items-center border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-8 flex justify-between items-center w-full">
        <Link to="/" className="h-6">
          <img src={Logo} alt="KoinX" className="h-full" />
        </Link>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-8 text-base font-semibold">
            <Link to="/crypto-taxes" className="text-gray-800 hover:text-gray-600">Crypto Taxes</Link>
            <Link to="/free-tools" className="text-gray-800 hover:text-gray-600">Free Tools</Link>
            <Link to="/resource-center" className="text-gray-800 hover:text-gray-600">Resource Center</Link>
          </div>
          <button className="bg-[#0052FE] text-white px-6 py-2 rounded-lg font-semibold">
            Get Started
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 py-4">
            <div className="flex flex-col items-center gap-4">
              <Link to="/crypto-taxes" className="text-gray-800 font-semibold">Crypto Taxes</Link>
              <Link to="/free-tools" className="text-gray-800 font-semibold">Free Tools</Link>
              <Link to="/resource-center" className="text-gray-800 font-semibold">Resource Center</Link>
              <button className="bg-[#0052FE] text-white px-6 py-2 rounded-lg font-semibold w-[90%]">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;