import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="bg-red-500 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
        </Link>
        <div className="hidden md:flex space-x-4 text-white">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/search-results" className="hover:text-gray-200">Pencarian</Link>
          <Link to="/blog" className="hover:text-gray-200">Blog</Link>
          <Link to="/about" className="hover:text-gray-200">Tentang Kami</Link>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-100">Sign Up</button>
        <button className="bg-transparent text-white border border-white px-4 py-2 rounded hover:bg-red-600">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;