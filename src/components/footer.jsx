import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer className="py-4 border-t bg-white">
      <div className="mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-16 h-16" />
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/search-results" className="text-gray-600 hover:text-gray-900">Pencarian</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">Tentang Kami</Link>
          </div>
          <div className="text-sm text-gray-500 flex flex-wrap justify-center gap-4">
            <span>© 2024 SIJA SMKN 1 Cimahi. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;