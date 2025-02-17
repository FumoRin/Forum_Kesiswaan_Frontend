import React, { useEffect, useState } from 'react';
import hero_bg from '../../assets/hero-bg.jpg';

const Login = () => {
  const [mainHeight, setMainHeight] = useState('100vh');

  // Adjust main height based on screen size
  useEffect(() => {
    const calculateHeight = () => {
      const navbar = document.querySelector('nav');
      const navHeight = navbar ? navbar.offsetHeight : 0;
      setMainHeight(`calc(100vh - ${navHeight}px)`);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  return (
    <>
      {/* Main Login Page */}
      <div
        className="relative flex flex-col items-center justify-center py-20"
        style={{
          backgroundImage: `url(${hero_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: mainHeight,
        }}
      >
        {/* Login Card */}
        <div className="relative bg-black bg-opacity-75 max-w-md mx-auto p-8 rounded-lg flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-6 text-center leading-tight">
            Login
          </h1>
          <p className="text-lg text-center mb-8 opacity-90">
            Silakan masuk untuk mengakses Forum Kesiswaan
          </p>

          {/* Login Form */}
          <form className="w-full">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan email Anda"
                className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Masukkan password Anda"
                className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Masuk
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center">
            Belum punya akun?{' '}
            <a href="/signup" className="text-blue-400 hover:underline">
              Daftar di sini
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;