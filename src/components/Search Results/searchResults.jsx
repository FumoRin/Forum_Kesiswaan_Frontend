import React, {useState, useEffect} from 'react';
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
];

//Set height based on screen
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
    <div className="mx-7 min-w-fit py-6" style={{height: mainHeight}}>
      <div className='p-2'>
        <h2 className="text-xl font-bold mb-4">
          {sampleResults.length} Hasil Pencarian Ditemukan
        </h2>
      </div>
      
      <div className="flex flex-row gap-5">
        {sampleResults.map((result, index) => (
          <SearchResultCard
            key={index}
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