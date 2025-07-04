import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.svg";
import { Button } from "@/components/ui/button";

import { useAuth } from "./utils/authProvider";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { isAuthenticated, logout, userRole } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setShowSidebar(!showSidebar);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#2A2828]/50 backdrop-blur-md p-4 flex justify-between items-center transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
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
        )}
      </div>

      <div className="hidden md:flex items-center gap-4">
        {isAdminRoute ? (
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="text-black border-[#DDD8D6] hover:bg-[#DF2E38] hover:border-[#DF2E38]"
          >
            Homepage
          </Button>
        ) : (
          (userRole === "admin" || userRole === "user") && (
            <Button
              variant="outline"
              onClick={() => navigate("/admin")}
              className="text-black border-[#DDD8D6] hover:bg-[#DF2E38] hover:text-white hover:border-[#DF2E38]"
            >
              Dashboard
            </Button>
          )
        )}

        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            className="hidden md:block bg-[#DF2E38] text-[#DDD8D6] hover:bg-[#DDD8D6] hover:text-[#DF2E38]"
          >
            Logout
          </Button>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/auth"
              state={{ tab: "login" }}
              className=" hidden md:block bg-transparent text-[#DDD8D6] border border-[#DDD8D6] px-4 py-2 rounded-full
                         transition-all duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden">
        <button
          onClick={toggleDropdown}
          className="text-white focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black transition-all duration-300 ${showSidebar ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
        onClick={toggleDropdown}
        style={{ height: '100vh', width: '100vw' }}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-[101] h-full w-64 bg-[#2A2828] text-white transform ${showSidebar ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4 py-6 flex justify-end items-center">
          <button onClick={toggleDropdown} aria-label="Close Sidebar">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-80px)] p-4 bg-[#2A2828]">
          <div className="flex flex-col space-y-4 items-center gap-6 text-xl font-semibold">
            {!isAdminRoute ? (
              <>
                <Link to="/" onClick={toggleDropdown}>
                  Home
                </Link>
                <Link to="/search-results" onClick={toggleDropdown}>
                  Pencarian
                </Link>
                <Link to="/about" onClick={toggleDropdown}>
                  Tentang Kami
                </Link>
                {(userRole === "admin" || userRole === "user") && (
                  <Link to="/admin" onClick={toggleDropdown}>
                    Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/admin" onClick={toggleDropdown}>
                  Dashboard
                </Link>
                <Link to="/admin/users" onClick={toggleDropdown}>
                  Users
                </Link>
                <Link to="/admin/blogs" onClick={toggleDropdown}>
                  Blogs
                </Link>
                <Link to="/" onClick={toggleDropdown}>
                  Homepage
                </Link>
              </>
            )}
          </div>

          <div className="mt-auto pb-8">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleDropdown();
                }}
                className="w-full bg-[#DF2E38] text-[#DDD8D6] rounded-xl px-4 py-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                state={{ tab: "login" }}
                className="block w-full text-center bg-[#DF2E38] text-[#DDD8D6] rounded-xl px-4 py-2"
                onClick={toggleDropdown}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
