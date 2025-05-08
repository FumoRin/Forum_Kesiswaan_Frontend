import react, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';

import { Search, File, Building, Calendar } from "lucide-react";
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
};

// Dedicated skeleton component for consistency
const SkeletonCard = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gray-200">
        <Skeleton className="w-full h-full" />
      </div>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-[200px]" />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-1 text-sm">
          <div className="text-gray-700 flex items-center gap-2">
            <Building size={16} className="text-gray-500" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <p className="text-gray-700 flex items-center gap-2">
            <File size={16} className="text-gray-500" />
            <Skeleton className="h-4 w-[100px]" />
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <Skeleton className="h-4 w-[100px]" />
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
};

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
          <div className="text-gray-700 flex items-center gap-2">
            <Building size={16} className="text-gray-500" />
            <span className="font-medium">Sekolah:</span> {school}
          </div>
          <p className="text-gray-700 flex items-center gap-2">
            <File size={16} className="text-gray-500" />
            <span className="font-medium">Acara:</span> {event}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="font-medium">Tanggal:</span> {formatDate(date)}
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
  const [eventType, setEventType] = useState('all');
  const [institution, setInstitution] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/events');
        setEvents(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to fetch events. Please try again later.",
          variant: "destructive"
        });
      } finally {
        // Add a small delay to ensure skeleton is shown properly
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search query and filters
  const filteredEvents = events.filter(event => {
    // Only show published events to the public
    if (event.status !== "published") {
      return false;
    }
    
    // Filter by search query
    const matchesQuery = searchQuery === '' || 
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.event?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.content?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by event type
    const matchesEventType = eventType === 'all' || 
      (eventType && event.event?.toLowerCase().includes(eventType.toLowerCase()));
    
    // Filter by institution
    const matchesInstitution = institution === 'all' || 
      (institution && event.school?.toLowerCase().includes(institution.toLowerCase()));
    
    // Filter by date (improved with proper date comparison)
    let matchesDate = true;
    if (dateFilter !== 'all' && event.date) {
      try {
        const eventDate = new Date(event.date);
        const today = new Date();
        
        // Reset time part for comparison
        today.setHours(0, 0, 0, 0);
        
        if (dateFilter === 'upcoming' && eventDate < today) {
          matchesDate = false;
        } else if (dateFilter === 'past' && eventDate >= today) {
          matchesDate = false;
        }
      } catch (err) {
        console.error('Error comparing dates:', err);
      }
    }
    
    return matchesQuery && matchesEventType && matchesInstitution && matchesDate;
  });
  

  return (
    <div className="w-full min-w-fit py-6 px-20 mt-navbar">
      {/* Search Results Header */}
      <div className="flex flex-col justify-between mb-6">
        <h2 className="text-3xl font-bold mb-4 md:mb-0"> 
          {loading ? 'Mencari Event...' : `${filteredEvents.length} Hasil Pencarian Ditemukan`}
        </h2>

        <div className="flex flex-row mt-4 justify-between">
          <div className="relative flex-grow md:w-1/2 w-full pr-8">
            <Input
              type="text"
              placeholder="Cari acara, sekolah, dll..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
              disabled={loading}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Filters using shadcn Select */}
          <div className="justify-between flex gap-2">
            <Select value={eventType} onValueChange={setEventType} disabled={loading}>
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
                <SelectItem value="pengumuman">Pengumuman</SelectItem>
              </SelectContent>
            </Select>

            <Select value={institution} onValueChange={setInstitution} disabled={loading}>
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

            <Select value={dateFilter} onValueChange={setDateFilter} disabled={loading}>
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

      {/* Error message */}
      {error && (
        <div className="text-red-500 mb-4 p-4 bg-red-50 rounded">
          {error}
        </div>
      )}

      {/* Search Results Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // Show skeleton loaders while loading
          Array(6).fill().map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))
        ) : filteredEvents.length > 0 ? (
          // Show filtered results
          filteredEvents.map((event) => (
            <ShadcnResultCard 
              key={event.id}
              id={event.id}
              title={event.title}
              school={event.school}
              event={event.event}
              date={event.date}
              thumbnail={event.thumbnail}
            />
          ))
        ) : (
          // No results found
          <div className="col-span-3 text-center py-8">
            <p className="text-lg text-gray-500">Tidak ada hasil yang ditemukan.</p>
            <p className="text-sm text-gray-400">Coba ubah kata kunci pencarian atau filter Anda.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults;