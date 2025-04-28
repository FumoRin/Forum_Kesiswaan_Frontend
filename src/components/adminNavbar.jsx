import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const adminNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2A2828]/50 backdrop-blur-md p-4 flex justify-between items-center">
      {/* Logo Section */}
      <Link to="/admin">
        <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
      </Link>

      {/* Center Navigation Links */}
      <div className="hidden md:flex space-x-4 text-white absolute left-1/2 transform -translate-x-1/2">
        <Link
          to="/admin"
          className="text-white hover:text-[#DF2E38] transition-colors duration-300"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/users"
          className="text-white hover:text-[#DF2E38] transition-colors duration-300"
        >
          Users
        </Link>
        <Link
          to="/admin/blogs"
          className="text-white hover:text-[#DF2E38] transition-colors duration-300"
        >
          Blogs
        </Link>
        <Link
          to="/about/stats"
          className="text-white hover:text-[#DF2E38] transition-colors duration-300"
        >
          Visitor Stats
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/auth"
          state={{ tab: 'register' }}
          className="bg-[#DF2E38] text-[#DDD8D6] border border-[#DDD8D6] px-4 py-2 rounded-full
                     hover:bg-[#DDD8D6] hover:text-[#DF2E38] hover:border-[#DF2E38] transition-all duration-300"
        >
          Sign Up
        </Link>
        <Link
          to="/auth"
          state={{ tab: 'login' }}
          className="bg-transparent text-[#DDD8D6] border border-[#DDD8D6] px-4 py-2 rounded-full
                     transition-all duration-300"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default adminNavbar;