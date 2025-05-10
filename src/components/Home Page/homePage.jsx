import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Building, Tag, ChevronRight, ChevronLeft } from "lucide-react";
import langit from "../../assets/Langit.png";
import aula from "../../assets/Aula.png";
import daun from "../../assets/Daun.png";

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const eventsContainerRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search form states
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState("");
  const [institution, setInstitution] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Fetch real event data from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/events');
        // Filter published events only and limit to 5 recent events
        const publishedEvents = response.data
          .filter(event => event.status === "published")
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setEvents(publishedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Fallback to mock data if API fails
        setEvents([
          {
            id: 19,
            title: "Lomba Debat Bahasa Inggris",
            school: "SMKN 1 CIMAHI",
            event: "Lomba",
            date: "2025-05-06T00:00:00.000Z",
            content: "<p><strong><em><u>Lomba Debat Tingkat Kota</u></em></strong></p>",
            thumbnail: "https://via.placeholder.com/300x200",
            status: "published",
          },
          // ... rest of mock data
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Create query params object
    const params = new URLSearchParams();
    
    if (searchQuery) params.append("query", searchQuery);
    if (eventType) params.append("eventType", eventType);
    if (institution) params.append("institution", institution);
    if (dateFilter) params.append("dateFilter", dateFilter);
    
    // Navigate to search results page with query params
    navigate(`/search-results?${params.toString()}`);
  };

  // Parallax and animation effects
  useEffect(() => {
    // Parallax effect for background images
    gsap.to("#langit-bg", {
      scrollTrigger: {
        trigger: section1Ref.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: -100,
      ease: "none",
    });

    gsap.to("#aula-bg", {
      scrollTrigger: {
        trigger: section1Ref.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 50,
      ease: "none",
    });

    gsap.to("#daun-bg", {
      scrollTrigger: {
        trigger: section1Ref.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 150,
      ease: "none",
    });

    // Card animations
    gsap.to("#card1", {
      scrollTrigger: {
        trigger: "#card1",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
  
    gsap.to("#card2", {
      scrollTrigger: {
        trigger: "#card2",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });

    // Event cards animation
    gsap.utils.toArray(".event-card").forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power2.out",
      });
    });
  }, [events]);

  // Handle horizontal scrolling for events
  const scrollLeft = () => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Section 1 */}
      <section ref={section1Ref} className="h-screen relative overflow-hidden">
        {/* Background Layers */}
        <div
          id="langit-bg"
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${langit})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div
          id="aula-bg"
          className="absolute inset-0 z-20"
          style={{
            backgroundImage: `url(${aula})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div
          id="daun-bg"
          className="absolute inset-0 z-30"
          style={{
            backgroundImage: `url(${daun})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content Layer */}
        <div className="relative z-30 flex items-center justify-center h-full bg-black/50">
          <div className="container mx-auto px-4 md:px-8 text-left space-y-14">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Forum Kesiswaan Cimahi
              </h1>
              <p className="text-xl md:text-2xl text-white max-w-2xl">
                Platform akses dokumentasi kegiatan semua sekolah di Kota Cimahi
              </p>
              <button className="text-sm md:text-base text-white hover:text-[#49B1E6]">
                Pelajari lebih lanjut &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section ref={section2Ref} className="min-h-90vh bg-white p-8">
        <div className="container mx-auto text-black">
          <h2 className="text-4xl font-bold mb-6 mt-12 md:mt-8 text-center">Fokus Kami</h2>
          <p className="text-lg max-w-2xl text-center mx-auto">
            Platform kolaboratif untuk seluruh siswa se-Kota Cimahi. Temukan berbagai 
            kegiatan, event, dan program pendidikan terbaru dari berbagai institusi.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 rounded-lg shadow-lg bg-gray-100 opacity-0 translate-y-10 hover:border-2 hover:border-[#DF2E38] transition-all duration-300" id="card1">
              <h3 className="text-xl font-semibold mb-2">Event Siswa</h3>
              <p>Ikuti berbagai event menarik seperti seminar, workshop, dan lomba antar sekolah.</p>
              <img src="/images/event.jpg" alt="Event Siswa" className="w-full h-48 object-cover rounded-md mb-4" />
            </div>
            <div className="card p-6 rounded-lg shadow-lg bg-gray-100 opacity-0 translate-y-10 hover:border-2 hover:border-[#DF2E38] transition-all duration-300" id="card2">
              <h3 className="text-xl font-semibold mb-2">Program Pendidikan</h3>
              <p>Dapatkan informasi tentang beasiswa, pelatihan, dan program studi lanjut.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Search Section */}
      <section ref={section3Ref} className="min-h-[50vh] bg-white relative py-12">
        {/* Background Box */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] h-[80%] bg-gradient-to-r from-blue-800 to-indigo-900 rounded-xl -z-10 shadow-2xl">
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="container mx-auto flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto py-8 px-4 z-10">
            <Card className="rounded-lg shadow-xl">
              <CardContent className="p-6">
                <form onSubmit={handleSearch}>
                  <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
                    <div className="relative w-full md:w-64">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-500 z-10" size={18} />
                      <Select value={eventType} onValueChange={setEventType}>
                        <SelectTrigger className="w-full bg-gray-50 pl-10">
                          <SelectValue placeholder="Tipe Acara" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lomba">Lomba</SelectItem>
                          <SelectItem value="festival">Festival</SelectItem>
                          <SelectItem value="olimpiade">Olimpiade</SelectItem>
                          <SelectItem value="seminar">Seminar</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="pengumuman">Pengumuman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="relative w-full md:w-64">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={18} />
                      <Select value={institution} onValueChange={setInstitution}>
                        <SelectTrigger className="w-full bg-gray-50 pl-10">
                          <SelectValue placeholder="Sekolah" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sma">SMA</SelectItem>
                          <SelectItem value="smk">SMK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="relative w-full md:w-64">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={18} />
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-full bg-gray-50 pl-10">
                          <SelectValue placeholder="Pelaksanaan Acara" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Mendatang</SelectItem>
                          <SelectItem value="past">Selesai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="relative flex-grow">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                      <Input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-12 bg-gray-50 h-12 rounded-r-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="h-12 rounded-l-none px-6 bg-blue-600 hover:bg-blue-700">
                      <Search className="mr-2" size={18} />
                      Search
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4 - Latest Events Section */}
      <section ref={section4Ref} className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Acara Terbaru</h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={scrollLeft}
                className="rounded-full h-10 w-10 border-gray-300"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={scrollRight}
                className="rounded-full h-10 w-10 border-gray-300"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
          
          <div 
            ref={eventsContainerRef}
            className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {events.map((event) => (
              <Card 
                key={event.id} 
                className="event-card flex-shrink-0 w-72 opacity-0 translate-x-10 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-40 rounded-t-lg overflow-hidden">
                  <img 
                    src={event.thumbnail || "https://via.placeholder.com/300x200"} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200";
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                    {event.event}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{event.school}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => navigate(`/blog/${event.id}`)}
                  >
                    Lihat Detail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;