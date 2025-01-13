import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-500 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <img src="/api/placeholder/40/40" alt="Logo" className="w-10 h-10 rounded-full" />
        <div className="hidden md:flex space-x-4 text-white">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">Pencarian</a>
          <a href="#" className="hover:text-gray-200">Blog</a>
          <a href="#" className="hover:text-gray-200">Tentang Kami</a>
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