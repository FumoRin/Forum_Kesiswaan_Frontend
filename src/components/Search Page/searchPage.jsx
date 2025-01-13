import React from 'react';
import { Search } from 'lucide-react';
import hero_bg from '../../assets/hero-bg.jpg';

const SearchPage = () => {
  return (
    <>
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${hero_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Content */}
        <div className="relative bg-black bg-opacity-35 max-w-4xl mx-auto p-8 rounded-lg flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight">
            Hasil Dokumentasi Siap Diakses
          </h1>
          <p className="text-lg md:text-xl text-center max-w-3xl opacity-90">
            Semua Dokumentasi Kegiatan Tersimpan dalam Satu tempat dengan Akses yang sangat mudah dan cepat
          </p>
        </div>

        {/* Search Section - Moved inside hero for overlay effect */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
                <select className="p-3 border rounded-lg w-full md:w-1/4 bg-gray-50 text-gray-700">
                  <option>Tipe Acara</option>
                </select>
                <select className="p-3 border rounded-lg w-full md:w-1/4 bg-gray-50 text-gray-700">
                  <option>Instansi</option>
                </select>
                <select className="p-3 border rounded-lg w-full md:w-1/4 bg-gray-50 text-gray-700">
                  <option>Tanggal</option>
                </select>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full p-4 border rounded-lg pl-12 bg-gray-50"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for content below */}
    </>
  );
};

export default SearchPage;