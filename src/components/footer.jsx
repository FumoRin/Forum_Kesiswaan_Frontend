import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer className="py-6 border-t bg-white mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
          </Link>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/" className="text-sm md:text-base text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/search-results" className="text-sm md:text-base text-gray-600 hover:text-gray-900">Pencarian</Link>
            <Link to="/blog" className="text-sm md:text-base text-gray-600 hover:text-gray-900">Blog</Link>
            <Link to="/about" className="text-sm md:text-base text-gray-600 hover:text-gray-900">Tentang Kami</Link>
          </nav>
          <div className="text-xs md:text-sm text-gray-500 text-center">
            <span>© 2024 SIJA SMKN 1 Cimahi. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;