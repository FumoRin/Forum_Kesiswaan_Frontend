import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from "@/components/ui/dialog";

const BlogForm = ({ blog, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: blog?.id || '',
    title: blog?.title || '',
    school: blog?.school || '',
    event: blog?.event || '',
    date: blog?.date || '',
    content: blog?.content || '',
    status: blog?.status || 'draft',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange}
          placeholder="Enter blog title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="school">School</Label>
        <Input 
          id="school" 
          name="school" 
          value={formData.school} 
          onChange={handleChange}
          placeholder="Enter school name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="event">Event</Label>
        <Input 
          id="event" 
          name="event" 
          value={formData.event} 
          onChange={handleChange}
          placeholder="Enter event name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange}
          placeholder="DD Bulan YYYY"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea 
          id="content" 
          name="content" 
          value={formData.content} 
          onChange={handleChange}
          placeholder="Enter blog content"
          rows={5}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select 
          value={formData.status} 
          onValueChange={(value) => handleSelectChange('status', value)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
};

export default BlogForm;