import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Search, File, Building, Calendar } from "lucide-react";

import thumbnailBlog from '../../assets/thumbnail.jpg' 

const sampleResults = [
  {
    id: '1',
    title: 'Lomba Kebersihan Antar Sekolah',
    school: 'SMK Negeri 1 Cimahi',
    event: 'Lomba WS Terbersih',
    date: '16 Agustus 2024',
    thumbnail: thumbnailBlog,
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
  // {
  //   id: '6',
  //   title: 'Lomba Karya Tulis Ilmiah',
  //   school: 'SMA Negeri 5 Malang',
  //   event: 'LKTI Nasional',
  //   date: '10 September 2024',
  // }
];

const ShadcnResultCard = ({ title, id, school, event, date, thumbnail }) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gray-200 overflow-hidden">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-400">No image</p>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-1 text-sm">
          <p className="text-gray-700 flex items-center gap-2">
            <Building size={16} className="text-gray-500" />
            <span className="font-medium">Sekolah:</span> {school}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <File size={16} className="text-gray-500" />
            <span className="font-medium">Acara:</span> {event}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="font-medium">Tanggal:</span> {date}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/blog/${id}`}>
            Lihat Detail
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('');
  const [institution, setInstitution] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  return (
    <div className="w-full min-w-fit py-6 px-20">
      {/* Search Results Header */}
      <div className="flex flex-col justify-between mb-6">
        <h2 className="text-3xl font-bold mb-4 md:mb-0"> 
          {sampleResults.length} Hasil Pencarian Ditemukan
        </h2>

        <div className="flex flex-row mt-4 justify-between">
          <div className="relative flex-grow md:w-1/2 w-full pr-8">
            <Input
              type="text"
              placeholder={searchQuery || "search"}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Filters using shadcn Select */}
          <div className="justify-between flex gap-2">
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-full md:w-36">
                <div className="flex items-center gap-2">
                  <File size={16} className="text-gray-500" />
                  <SelectValue placeholder="Tipe Acara" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="lomba">Lomba</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
                <SelectItem value="olimpiade">Olimpiade</SelectItem>
                <SelectItem value="kompetisi">Kompetisi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={institution} onValueChange={setInstitution}>
              <SelectTrigger className="w-full md:w-36">
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-gray-500" />
                  <SelectValue placeholder="Instansi" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="sma">SMA</SelectItem>
                <SelectItem value="smk">SMK</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-36">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <SelectValue placeholder="Tanggal" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="upcoming">Mendatang</SelectItem>
                <SelectItem value="past">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Search Results Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleResults.map((result) => (
          <ShadcnResultCard 
            key={result.id}
            id={result.id}
            title={result.title}
            school={result.school}
            event={result.event}
            date={result.date}
            thumbnail={result.thumbnail}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchResults;