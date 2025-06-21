import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, School, Award, ImageIcon } from 'lucide-react';
import { useAuth } from "@/components/utils/authProvider";

const BlogSettingsPanel = ({ formData, selectedDate, handleSelectChange, handleDateSelect, handleChange, handleThumbnailChange }) => {
  const { userRole, userSchool } = useAuth();

  // Helper to get the thumbnail source URL
  const getThumbnailSrc = () => {
    if (!formData.thumbnail) return null;
    // If thumbnail is a string (URL from existing blog data)
    if (typeof formData.thumbnail === 'string') return formData.thumbnail;
    // If thumbnail is an object with a URL (likely from file selection or updated blog data)
    if (typeof formData.thumbnail === 'object' && formData.thumbnail.url) return formData.thumbnail.url;
    return null;
  };

  const thumbnailSrc = getThumbnailSrc();

  // Set school value based on user role when component mounts or when formData changes
  useEffect(() => {
    if (userRole === "user" && (!formData.school || formData.school === "")) {
      handleChange({ target: { id: "school", value: userSchool } });
    }
  }, [userRole, userSchool, formData.school]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Publication Settings</CardTitle>
          <CardDescription>
            Configure blog post settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="flex items-center gap-2">
                Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
                required
              >
                <SelectTrigger id="status" className="bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar size={16} /> Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal bg-white ${!selectedDate && "text-muted-foreground"
                      }`}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      formData.date // Display the formatted date string
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate} // Pass the Date object here
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Blog Details</CardTitle>
          <CardDescription>
            Add details about the blog post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="school" className="flex items-center gap-2">
                <School size={16} /> School <span className="text-red-500">*</span>
              </Label>
              <Input
                id="school"
                name="school"
                value={formData.school || (userRole === "user" ? userSchool : "")}
                onChange={handleChange}
                placeholder="Enter school name"
                required
                className="bg-white"
                disabled={userRole === "user"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event" className="flex items-center gap-2">
                <Award size={16} /> Event <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.event}
                onValueChange={(value) => handleSelectChange('event', value)}
                required
              >
                <SelectTrigger id="event" className="bg-white">
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semua">Semua</SelectItem>
                  <SelectItem value="Lomba">Lomba</SelectItem>
                  <SelectItem value="Festival">Festival</SelectItem>
                  <SelectItem value="Olimpiade">Olimpiade</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail" className="flex items-center gap-2">
                <ImageIcon size={16} /> Thumbnail
              </Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="bg-white" // Added bg-white for consistency
              />

              {thumbnailSrc && (
                <div className="mt-2 border rounded overflow-hidden">
                  <img
                    src={thumbnailSrc} // Use the helper function result
                    alt="Thumbnail Preview"
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSettingsPanel;

