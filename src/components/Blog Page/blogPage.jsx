import React from 'react';
import { useParams } from 'react-router-dom';
import { File, Building, Calendar, ChevronLeft } from 'lucide-react';
import thumbnail from '../../assets/thumbnail.jpg';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogPage = () => {
  const { id } = useParams();

  const blogData = [
    {
      id: '1',
      title: 'Lomba Kebersihan Antar Sekolah',
      school: 'SMK Negeri 1 Cimahi',
      event: 'Lomba WS Terbersih',
      date: '16 Agustus 2024',
      author: 'Admin Sekolah',
      content:
        'Kegiatan lomba kebersihan ini bertujuan untuk meningkatkan kesadaran para siswa akan pentingnya kebersihan lingkungan sekolah. Lomba ini melibatkan seluruh jurusan di sekolah dengan kriteria penilaian meliputi kebersihan, kerapihan, dan kreativitas dalam mendekorasi ruang belajar serta kamar mandi. Pemenang akan diumumkan pada akhir lomba dan diberikan penghargaan berupa piala untuk juara 1, 2, dan 3.',
      thumbnail: thumbnail,
      gallery: [
        {
          original: 'https://picsum.photos/id/1018/800/600',
          thumbnail: 'https://picsum.photos/id/1018/200/150',
        },
        {
          original: 'https://picsum.photos/id/1025/800/600',
          thumbnail: 'https://picsum.photos/id/1025/200/150',
        },
        {
          original: 'https://picsum.photos/id/1035/800/600',
          thumbnail: 'https://picsum.photos/id/1035/200/150',
        },
        {
          original: 'https://picsum.photos/id/1040/800/600',
          thumbnail: 'https://picsum.photos/id/1040/200/150',
        },
      ],
    },
    {
      id: '2',
      title: 'Pentas Seni Tahunan',
      school: 'SMK Negeri 2 Cimahi',
      event: 'Pentas Seni 2024',
      date: '20 September 2024',
      author: 'Admin Sekolah',
      content:
        'Pentas seni tahunan ini menjadi ajang untuk menampilkan kreativitas siswa melalui berbagai pertunjukan seni seperti musik, tari, drama, dan lainnya. Acara ini juga dihadiri oleh tamu undangan dari beberapa sekolah sekitar dan menjadi momen untuk mempererat hubungan antar sekolah.',
      thumbnail: thumbnail,
    },
  ];

  const blog = blogData.find((blog) => blog.id === id);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 mt-navbar">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Blog tidak ditemukan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">Silakan kembali ke halaman sebelumnya.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className=" p-6 bg-gray-50 w-full mt-navbar" >
      <div className="max-w-5xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-4"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
        
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Text Content */}
              <div className="flex-1 space-y-4">
                <CardTitle className="text-3xl font-bold text-gray-800">{blog.title}</CardTitle>
                
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                    <Building className="w-4 h-4" />
                    <span>{blog.school}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                    <File className="w-4 h-4" />
                    <span>{blog.event}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </Badge>
                </div>
                
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/api/placeholder/32/32" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{blog.author}</span>
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="w-full md:w-96 flex-shrink-0">
                <div className="rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover aspect-video"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="pt-6">
            {/* Blog Content */}
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg leading-relaxed">{blog.content}</p>
            </div>

            {/* Gallery Section */}
            {blog.gallery && blog.gallery.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
                  Dokumentasi Acara
                </h2>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {blog.gallery.map((item, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-video items-center justify-center p-0">
                              <img
                                src={item.original}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                
                {/* Thumbnail Navigation */}
                <div className="flex mt-4 gap-2 overflow-x-auto py-2">
                  {blog.gallery.map((item, index) => (
                    <div 
                      key={index} 
                      className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 border-gray-200 hover:border-primary cursor-pointer"
                    >
                      <img
                        src={item.thumbnail}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BlogPage;