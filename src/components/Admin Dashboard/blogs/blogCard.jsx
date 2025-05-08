import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

const BlogCard = ({ blog, onEdit, onDelete }) => {
  // Function to strip HTML tags for preview
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid date
      
      const day = date.getDate();
      const month = date.toLocaleString('id-ID', { month: 'long' });
      const year = date.getFullYear();
      
      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gray-200 overflow-hidden">
        {blog.thumbnail ? (
          <img 
            src={blog.thumbnail} 
            alt={blog.title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-400">No image</p>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-2">{blog.title}</h3>
          <Badge variant={blog.status === 'published' ? 'default' : 'outline'}>
            {blog.status}
          </Badge>
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <p>{blog.school}</p>
          <p>{blog.event} • {formatDate(blog.date)}</p>
        </div>
        <p className="text-sm text-gray-700 line-clamp-3">
          {stripHtml(blog.content)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm" onClick={() => onEdit(blog)}>
          <Edit size={16} className="mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.open(`/blog/${blog.id}`, '_blank')}>
          View Blog
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(blog.id)}>
          <Trash2 size={16} className="mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;