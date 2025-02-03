import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react'; // Import the Search icon
import SearchResultCard from './resultCard';

const sampleResults = [
  {
    id: '1',
    title: 'Lomba Kebersihan Antar Sekolah',
    school: 'SMK Negeri 1 Cimahi',
    event: 'Lomba WS Terbersih',
    date: '16 Agustus 2024',
  },
  {
    id: '2',
    title: 'Festival Seni Budaya Sekolah',
    school: 'SMA Negeri 2 Bandung',
    event: 'Festival Budaya',
    date: '20 Agustus 2024',
  },
  {
    id: '3',
    title: 'Olimpiade Matematika Tingkat SMA',
    school: 'SMA Negeri 3 Jakarta',
    event: 'Olimpiade Matematika',
    date: '25 Agustus 2024',
  },
  {
    id: '4',
    title: 'Kompetisi Robotik Nasional',
    school: 'SMK Negeri 4 Surabaya',
    event: 'Kompetisi Robotik',
    date: '1 September 2024',
  },
  {
    id: '5',
    title: 'Turnamen Olahraga Antar SMA',
    school: 'SMA Negeri 1 Yogyakarta',
    event: 'Turnamen Olahraga',
    date: '5 September 2024',
  },
  {
    id: '6',
    title: 'Lomba Karya Tulis Ilmiah',
    school: 'SMA Negeri 5 Malang',
    event: 'LKTI Nasional',
    date: '10 September 2024',
  }
];

const SearchResults = () => {
  const [mainHeight, setMainHeight] = useState('100vh');

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
    <div className="mx-7 min-w-fit py-6" style={{ height: mainHeight }}>
      {/* Header Section with Title and Search/Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Title */}
        <h2 className="text-xl font-bold mb-4 md:mb-0">
          {sampleResults.length} Hasil Pencarian Ditemukan
        </h2>

        {/* Search and Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border rounded-lg pl-10 bg-gray-50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Filters */}
          <select className="p-2 border rounded-lg bg-gray-50 text-gray-700 w-full md:w-auto">
            <option>Tipe Acara</option>
          </select>
          <select className="p-2 border rounded-lg bg-gray-50 text-gray-700 w-full md:w-auto">
            <option>Instansi</option>
          </select>
          <select className="p-2 border rounded-lg bg-gray-50 text-gray-700 w-full md:w-auto">
            <option>Tanggal</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sampleResults.map((result, index) => (
          <SearchResultCard
            key={index}
            title={result.title}
            id={result.id}
            school={result.school}
            event={result.event}
            date={result.date}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;