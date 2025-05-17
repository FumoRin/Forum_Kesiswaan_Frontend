import react, { useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';

import { Search, File, Building, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "../../data/api";
import { getImageUrl } from "../../utils/imageUtils";

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
          <div className="text-gray-700 flex items-center gap-2">
            <File size={16} className="text-gray-500" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
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
            src={getImageUrl(thumbnail)} 
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
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('all');
  const [institution, setInstitution] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Parse URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Set search form values from URL parameters
    if (params.get('query')) setSearchQuery(params.get('query'));
    if (params.get('eventType')) setEventType(params.get('eventType'));
    if (params.get('institution')) setInstitution(params.get('institution'));
    if (params.get('dateFilter')) setDateFilter(params.get('dateFilter'));
  }, [location.search]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Create query parameters
        const params = new URLSearchParams(location.search);
        
        // Get search parameters
        const searchParams = {
          query: params.get('query') || '',
          eventType: params.get('eventType') || 'all',
          institution: params.get('institution') || 'all',
          dateFilter: params.get('dateFilter') || 'all'
        };
        
        // Use our static API service
        const response = await api.searchEvents(searchParams);
        setEvents(response);
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
  }, [location.search]); // Re-fetch when search params change

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Create query params object
    const params = new URLSearchParams();
    
    if (searchQuery) params.append("query", searchQuery);
    if (eventType !== 'all') params.append("eventType", eventType);
    if (institution !== 'all') params.append("institution", institution);
    if (dateFilter !== 'all') params.append("dateFilter", dateFilter);
    
    // Update URL with new search parameters
    navigate(`/search-results?${params.toString()}`, { replace: true });
  };

  return (
    <div className="w-full min-w-fit py-4 px-4 md:py-6 md:px-20 mt-navbar">
      {/* Search Results Header */}
      <div className="flex flex-col justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0"> 
          {loading ? 'Mencari Event...' : `${events.length} Hasil Pencarian Ditemukan`}
        </h2>

        <div className="flex flex-col md:flex-row mt-4 gap-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full">
            <div className="relative flex-grow w-full">
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
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
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
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
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
              
              <Button type="submit" disabled={loading} className="w-full md:w-auto">
                <Search size={16} className="mr-2" />
                Cari
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 mb-4 p-4 bg-red-50 rounded">
          {error}
        </div>
      )}

      {/* Search Results Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // Show skeleton loaders while loading
          Array(6).fill().map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))
        ) : events.length > 0 ? (
          // Show filtered results
          events.map((event) => (
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