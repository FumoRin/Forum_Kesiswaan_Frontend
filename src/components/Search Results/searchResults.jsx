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
    school: 'SMAN 2 Jakarta',
    event: 'Seminar Teknologi',
    date: '21 Januari 2025',
  },
  {
    id: '3',
    school: 'SMAN 3 Jakarta',
    event: 'Seminar Ekonomi',
    date: '22 Januari 2025',
  },
  {
    id: '4',
    school: 'SMAN 4 Jakarta',
    event: 'Seminar Politik',
    date: '23 Januari 2025',
  },
  {
    id: '5',
    school: 'SMAN 5 Jakarta',
    event: 'Seminar Seni',
    date: '24 Januari 2025',
  },
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
          <div className="relative w-full md:w-96">
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

      {/* Flex Container */}
      <div className="flex flex-wrap justify-center gap-5">
        {sampleResults.map((result, index) => (
          <div key={index} className="w-[450px]"> {/* Fixed width for cards */}
            <SearchResultCard
              id={result.id}
              school={result.school}
              event={result.event}
              date={result.date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;