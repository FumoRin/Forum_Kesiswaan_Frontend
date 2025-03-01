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
          <Link to="/" className="text-gray-300 hover:text-gray-100">Home</Link>
          <Link to="/search-results" className="text-gray-300 hover:text-gray-100">Pencarian</Link>
          <Link to="/blog" className="text-gray-300 hover:text-gray-100">Blog</Link>
          <Link to="/about" className="text-gray-300 hover:text-gray-100">Tentang Kami</Link>
        </div>
      </div>
      <div className="flex space-x-4">
      <Link
          to="/auth"
          state={{ tab: 'register' }}
          className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-100 transition duration-300"
        >
          Sign Up
        </Link>

        {/* Login Button */}
        <Link
          to="/auth"
          state={{ tab: 'login' }}
          className="bg-transparent text-white border border-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;