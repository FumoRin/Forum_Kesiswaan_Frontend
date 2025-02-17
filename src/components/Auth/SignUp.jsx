import React, { useEffect, useState } from 'react';
import hero_bg from '../../assets/hero-bg.jpg';

const SignUp = () => {
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
      {/* Main Sign Up Page */}
      <div
        className="relative flex flex-col items-center justify-center py-20"
        style={{
          backgroundImage: `url(${hero_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: mainHeight,
        }}
      >
        {/* Sign Up Card */}
        <div className="relative bg-black bg-opacity-75 max-w-md mx-auto p-8 rounded-lg flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-6 text-center leading-tight">
            Daftar Akun
          </h1>
          <p className="text-lg text-center mb-8 opacity-90">
            Buat akun baru untuk mengakses Forum Kesiswaan
          </p>

          {/* Sign Up Form */}
          <form className="w-full">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                placeholder="Masukkan nama lengkap Anda"
                className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Konfirmasi password Anda"
                className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Daftar
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center">
            Sudah punya akun?{' '}
            <a href="/login" className="text-blue-400 hover:underline">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;