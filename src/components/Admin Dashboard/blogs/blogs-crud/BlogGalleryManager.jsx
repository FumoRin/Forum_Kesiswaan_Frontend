import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutGrid } from 'lucide-react';

const BlogGalleryManager = ({ gallery, handleGalleryChange, removeGalleryItem }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Gallery</CardTitle>
        <CardDescription>
          Add images to your blog post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gallery" className="flex items-center gap-2">
              <LayoutGrid size={16} /> Gallery Images
            </Label>
            <Input
              id="gallery"
              name="gallery"
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="bg-white" // Added bg-white for consistency
            />
          </div>

          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
              {gallery.map((item, index) => (
                <div key={index} className="relative group">
                  <img
                    // Use item.original or item.url depending on structure after form init
                    src={item.original || item.url}
                    alt={`Gallery ${index}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeGalleryItem(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogGalleryManager; 