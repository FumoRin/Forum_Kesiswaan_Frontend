import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { Button } from "@/components/ui/button";

import { useAuth } from "./utils/authProvider"; 

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { isAuthenticated, logout, userRole } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2A2828]/50 backdrop-blur-md p-4 flex justify-between items-center">
      {/* Logo Section */}
      <Link to="/">
        <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
      </Link>

      {/* Center Navigation Links */}
      <div className="hidden md:flex space-x-4 text-white absolute left-1/2 transform -translate-x-1/2">
        {!isAdminRoute ? (
            <>
              <Link
                to="/"
                className="text-white hover:text-[#DF2E38] transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/search-results"
                className="text-white hover:text-[#DF2E38] transition-colors duration-300"
              >
                Pencarian
              </Link>
              <Link
                to="/blog"
                className="text-white hover:text-[#DF2E38] transition-colors duration-300"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-[#DF2E38] transition-colors duration-300"
              >
                Tentang Kami
              </Link>
            </>
          ) : (
            <>
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
            </>
          )
        }
      </div>

      <div className="flex items-center gap-4">
        {isAdminRoute ? (
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="text-black border-[#DDD8D6] hover:bg-[#DF2E38] hover:border-[#DF2E38]"
          >
            Homepage
          </Button>
        ) : (
          userRole === "admin" && (
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="text-black border-[#DDD8D6] hover:bg-[#DF2E38] hover:text-white hover:border-[#DF2E38]"
            >
              Dashboard
            </Button>
          )
        )}

        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            className="bg-[#DF2E38] text-[#DDD8D6] hover:bg-[#DDD8D6] hover:text-[#DF2E38]"
          >
            Logout
          </Button>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/auth"
              state={{ tab: 'login' }}
              className="bg-transparent text-[#DDD8D6] border border-[#DDD8D6] px-4 py-2 rounded-full
                         transition-all duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;