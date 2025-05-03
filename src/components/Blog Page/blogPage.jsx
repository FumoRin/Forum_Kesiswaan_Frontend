import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { File, Building, Calendar, ChevronLeft } from 'lucide-react';
import axios from 'axios';
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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/events/${id}`);
        setBlog(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to fetch blog data. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to fetch blog data. Please try again later.",
          variant: "destructive"
        })
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 w-full mt-navbar">
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
                  <Skeleton className="h-10 w-3/4" />
                  
                  <div className="flex flex-wrap gap-3">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                  
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* Thumbnail Image */}
                <div className="w-full md:w-96 flex-shrink-0">
                  <Skeleton className="w-full aspect-video rounded-lg" />
                </div>
              </div>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="pt-6">
              <Skeleton className="h-4 w-full my-2" />
              <Skeleton className="h-4 w-full my-2" />
              <Skeleton className="h-4 w-3/4 my-2" />
              <Skeleton className="h-4 w-5/6 my-2" />
              <Skeleton className="h-4 w-full my-2" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 mt-navbar">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              {error || "Blog tidak ditemukan"}
            </CardTitle>
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

  // Parse gallery JSON if it's a string
  let galleryItems = [];
  if (blog.gallery) {
    try {
      if (typeof blog.gallery === 'string') {
        galleryItems = JSON.parse(blog.gallery);
      } else if (Array.isArray(blog.gallery)) {
        galleryItems = blog.gallery;
      }
      
      // Transform gallery items to the format expected by the carousel
      galleryItems = galleryItems.map(item => {
        if (typeof item === 'string') {
          return {
            original: item,
            thumbnail: item
          };
        }
        return item;
      });
    } catch (e) {
      console.error('Error parsing gallery data:', e);
      toast({
        title: "Error",
        description: "Failed to parse gallery data. Please try again later.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="p-6 bg-gray-50 w-full mt-navbar" >
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
                  <span className="text-sm text-gray-600">{blog.author || "Admin"}</span>
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="w-full md:w-96 flex-shrink-0">
                <div className="rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={blog.thumbnail || thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover aspect-video"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="pt-6">
            {/* Blog Content - Render HTML content */}
            <div 
              className="prose prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Gallery Section */}
            {galleryItems && galleryItems.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
                  Dokumentasi Acara
                </h2>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {galleryItems.map((item, index) => (
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
                  {galleryItems.map((item, index) => (
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