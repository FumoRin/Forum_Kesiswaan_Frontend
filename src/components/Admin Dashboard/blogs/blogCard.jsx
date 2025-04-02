import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Building, File, Calendar, Edit, Trash2 } from "lucide-react";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id, title, school, event, date, status, thumbnail } = blog;
  
  useEffect(() => {
    // Simulate loading for demo purposes
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const statusColor = status === 'published' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-yellow-100 text-yellow-800';

  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gray-200 overflow-hidden relative">
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
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>
      <CardHeader className="pb-2">
        {isLoading ? (
          <Skeleton className="h-6 w-[200px]" />
        ) : (
          <CardTitle className="text-lg font-bold line-clamp-2">{title}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-1 text-sm">
          <div className="text-gray-700 flex items-center gap-2">
            <Building size={16} className="text-gray-500" />
            { isLoading ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              <>
                <span className="font-medium">Sekolah:</span> {school}
              </>
            )}
          </div>
          <p className="text-gray-700 flex items-center gap-2">
            <File size={16} className="text-gray-500" />
            { isLoading ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              <>
                <span className="font-medium">Acara:</span> {event}
              </>
            )}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            { isLoading ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              <>
              <span className="font-medium">Tanggal:</span> {date}
              </>
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(blog)}>
              <Edit size={16} className="mr-2" /> Edit
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:text-red-700" onClick={() => onDelete(id)}>
              <Trash2 size={16} className="mr-2" /> Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;