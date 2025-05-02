import { Parallax, ParallaxLayer } from '@react-spring/parallax';
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
import { Search, Calendar, Building, Tag } from "lucide-react";
import home1 from "../../assets/home1.jpg";
import home2 from "../../assets/home2.jpg";
import home3 from "../../assets/home3.jpg";

const Homepage = () => {
  return (
    <Parallax pages={4} className="relative">
      {/* ----------------- Background Layers ----------------- */}
      {/* Halaman 1 */}
      <ParallaxLayer
        offset={0} // Mulai dari halaman 1
        speed={-0.2}
        factor={1} // Mengisi 1 halaman penuh
        z-index={30}
        style={{
          backgroundImage: `url(${home1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Halaman 2 */}
      <ParallaxLayer
        offset={1} // Mulai dari halaman 2
        speed={0}
        factor={1}
        style={{
          zIndex: 20,
          backgroundImage: `url(${home2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Halaman 3 */}
      <ParallaxLayer
        offset={2} // Mulai dari halaman 3
        speed={-0.2}
        factor={1}
        z-index={10}
        style={{
          backgroundImage: `url(${home3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* ----------------- Page 1 Content ----------------- */}
      <ParallaxLayer offset={0} speed={0} factor={1} style={{ zIndex: 40 }} className="flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 text-left space-y-14">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-[#DF2E38]">
              Forum Kesiswaan Cimahi
            </h1>
            <p className="text-xl md:text-2xl text-[#DF2E38] max-w-2xl">
              Platform akses dokumentasi kegiatan semua sekolah di Kota Cimahi
            </p>
            <button className="text-sm md:text-base text-[#DF2E38] hover:text-[#49B1E6]">
              Pelajari lebih lanjut &gt;
            </button>
          </div>
        </div>
      </ParallaxLayer>

      {/* ----------------- Page 2 Content ----------------- */}
      <ParallaxLayer offset={1} speed={0} style={{ zIndex: 40 }} className="flex items-center bg-black/50 p-8">
        <div className="container mx-auto text-white">
          <h2 className="text-4xl font-bold mb-6">Tentang Kami</h2>
          <p className="text-lg max-w-2xl">
            Platform kolaboratif untuk seluruh siswa se-Kota Cimahi. Temukan berbagai 
            kegiatan, event, dan program pendidikan terbaru dari berbagai institusi.
          </p>
        </div>
      </ParallaxLayer>

      {/* ----------------- Page 3 (Empty) ----------------- */}
      <ParallaxLayer offset={2} speed={0} factor={0} style={{ zIndex: 40 }}/>

      {/* ----------------- Search Section ----------------- */}
      <ParallaxLayer 
        offset={3} 
        speed={0} 
        style={{ zIndex: 40 }}
        className="bg-white flex items-center justify-center min-h-screen"
      >
        <div className="w-full max-w-6xl mx-auto py-20 px-4">
          <Card className="rounded-lg shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
                <div className="relative w-full md:w-64">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={18} />
                  <Select>
                    <SelectTrigger className="w-full bg-gray-50 pl-10">
                      <SelectValue placeholder="Tipe Acara" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative w-full md:w-64">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={18} />
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

                <div className="relative w-full md:w-64">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={18} />
                  <Select>
                    <SelectTrigger className="w-full bg-gray-50 pl-10">
                      <SelectValue placeholder="Tanggal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recent</SelectItem>
                      <SelectItem value="lastMonth">Last Month</SelectItem>
                      <SelectItem value="lastYear">Last Year</SelectItem>
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
      </ParallaxLayer>
    </Parallax>
  );
};

export default Homepage;