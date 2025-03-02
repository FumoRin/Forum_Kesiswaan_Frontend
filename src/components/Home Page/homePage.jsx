import { useState, useEffect } from "react";
import { Search, Calendar, Building, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import hero_bg from "../../assets/hero-bg.jpg";

const Homepage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Landing Page Section and animation scroll */}
      <div
        className="h-screen relative overflow-hidden"
        style={{ backgroundColor: "#DDD8D6" }}
      >
        <div
          className="absolute inset-0 z-0 transition-all duration-500"
          style={{
            backgroundImage: `url(${hero_bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(${1 + scrollY * 0.0005})`,
            opacity: 1 - Math.min(scrollY * 0.002, 0.8),
          }}
        />
        <div className="relative z-10 h-screen flex flex-col justify-around items-center">
          <div className="container mx-auto px-4 md:px-8 text-left space-y-14">
            {/* Hero Section */}
            <div className="space-y-4 pt-12 mt-12">
              <h1 className="text-5xl md:text-7xl font-bold text-[#DF2E38]">
                Forum Kesiswaan Cimahi
              </h1>
              <p className="text-xl md:text-2xl text-[#DDD8D6] max-w-2xl">
                Platform akses dokumentasi kegiatan semua sekolah di Kota Cimahi
              </p>
              <button className="text-sm md:text-base text-[#DDD8D6] hover:text-[#49B1E6] transition-colors duration-300">
                Pelajari lebih lanjut &gt;
              </button>
            </div>
            {/* Search Section */}
            {/* adding div to runout from justify arround laws */}
            <div> 
              <div className="w-full max-w-6xl mx-auto pt-12 mt-36">
                <Card className="bg-black/35 rounded-lg shadow-xl border-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
                      {/* Select with Icon */}
                      <div className="relative w-full md:w-64">
                        <Tag
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                          size={18}
                        />
                        <Select>
                          <SelectTrigger className="w-full bg-gray-50 pl-10">
                            <SelectValue placeholder="Tipe Acara" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="seminar">Seminar</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="conference">
                              Conference
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Select with Icon */}
                      <div className="relative w-full md:w-64">
                        <Building
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                          size={18}
                        />
                        <Select>
                          <SelectTrigger className="w-full bg-gray-50 pl-10">
                            <SelectValue placeholder="Instansi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gov">Government</SelectItem>
                            <SelectItem value="edu">Education</SelectItem>
                            <SelectItem value="corp">Corporate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Select with Icon */}
                      <div className="relative w-full md:w-64">
                        <Calendar
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                          size={18}
                        />
                        <Select>
                          <SelectTrigger className="w-full bg-gray-50 pl-10">
                            <SelectValue placeholder="Tanggal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Recent</SelectItem>
                            <SelectItem value="lastMonth">
                              Last Month
                            </SelectItem>
                            <SelectItem value="lastYear">Last Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {/* Search Input with Button */}
                    <div className="flex">
                      <div className="relative flex-grow">
                        <Search
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={24}
                        />
                        <Input
                          type="text"
                          placeholder="Search"
                          className="w-full pl-12 bg-gray-50 h-12 rounded-r-none"
                        />
                      </div>
                      <Button className="h-12 rounded-l-none px-6 bg-blue-600 hover:bg-blue-700">
                        <Search className="mr-2" size={18} />
                        Search
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
