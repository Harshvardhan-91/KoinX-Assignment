import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">KoinX</Link>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;