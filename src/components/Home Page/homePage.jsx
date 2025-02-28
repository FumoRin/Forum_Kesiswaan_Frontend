import { Search, Calendar, Building, Tag } from "lucide-react";
import { Input} from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import hero_bg from '../../assets/hero-bg.jpg';

const Homepage = () => {
  return (
    <div 
      className="h-screen-navbar w-full bg-cover bg-center flex items-center justify-center flex-col"
      style={{
        backgroundImage: `url(${hero_bg})`
      }}
    >
      {/* Title */}
      <div className="relative bg-black bg-opacity-35 max-w-4xl mx-auto p-8 rounded-lg flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight">
          Hasil Dokumentasi Siap Diakses
        </h1>
        <p className="text-lg md:text-xl text-center max-w-3xl opacity-90">
          Semua Dokumentasi Kegiatan Tersimpan dalam Satu tempat dengan Akses yang sangat mudah dan cepat
        </p>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <Card className="bg-black/35 rounded-lg shadow-xl border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
              {/* Select with Icon */}
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
              
              {/* Select with Icon */}
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
              
              {/* Select with Icon */}
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
            
            {/* Search Input with Button */}
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

    </div>
  )
}

export default Homepage;