import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, File, Building, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BlogCard from "./blogCard";
import BlogForm from "./blogs-crud/blogForm";
import thumbnailBlog from "../../../assets/thumbnail.jpg";

// Sample data
const sampleResults = [
  {
    id: '1',
    title: 'Lomba Kebersihan Antar Sekolah',
    school: 'SMK Negeri 1 Cimahi',
    event: 'Lomba WS Terbersih',
    date: '16 Agustus 2024',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo vel massa tempor aliquam.',
    status: 'published',
    thumbnail: thumbnailBlog,
  },
  {
    id: '2',
    title: 'Festival Seni Budaya Sekolah',
    school: 'SMA Negeri 2 Bandung',
    event: 'Festival Budaya',
    date: '20 Agustus 2024',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo vel massa tempor aliquam.',
    status: 'published',
  },
  {
    id: '3',
    title: 'Olimpiade Matematika Tingkat SMA',
    school: 'SMA Negeri 3 Jakarta',
    event: 'Olimpiade Matematika',
    date: '25 Agustus 2024',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo vel massa tempor aliquam.',
    status: 'draft',
  },
  {
    id: '4',
    title: 'Kompetisi Robotik Nasional',
    school: 'SMK Negeri 4 Surabaya',
    event: 'Kompetisi Robotik',
    date: '1 September 2024',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo vel massa tempor aliquam.',
    status: 'published',
  },
  {
    id: '5',
    title: 'Turnamen Olahraga Antar SMA',
    school: 'SMA Negeri 1 Yogyakarta',
    event: 'Turnamen Olahraga',
    date: '5 September 2024',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo vel massa tempor aliquam.',
    status: 'draft',
  },
];

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState(sampleResults);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('');
  const [institution, setInstitution] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  
  const [activeTab, setActiveTab] = useState('all');

  // Filter blogs based on search and filters
  const filteredBlogs = blogs.filter(blog => {
    // Search query filter
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.event.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Event type filter
    const matchesEvent = !eventType || eventType === 'all' || blog.event.toLowerCase().includes(eventType.toLowerCase());
    
    // Institution filter
    const matchesInstitution = !institution || institution === 'all' || blog.school.toLowerCase().includes(institution.toLowerCase());
    
    // Status filter
    const matchesStatus = !statusFilter || statusFilter === 'all' || blog.status === statusFilter;
    
    // Tab filter
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'published' && blog.status === 'published') ||
                      (activeTab === 'draft' && blog.status === 'draft');
    
    return matchesSearch && matchesEvent && matchesInstitution && matchesStatus && matchesTab;
  });

  const handleAddBlog = () => {
    setCurrentBlog(null);
    setDialogMode('add');
    setIsDialogOpen(true);
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    }
  };

  const handleFormSubmit = (formData) => {
    if (dialogMode === 'add') {
      // Generate a simple ID for demo purposes
      const newId = (Math.max(...blogs.map(b => parseInt(b.id))) + 1).toString();
      setBlogs(prev => [...prev, { ...formData, id: newId }]);
    } else {
      setBlogs(prev => prev.map(blog => blog.id === formData.id ? formData : blog));
    }
    setIsDialogOpen(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="mt-navbar flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/blogs">Blogs</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <hr className="my-4 border-t" />

      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Blog Admin</h1>
          <Button onClick={handleAddBlog}>
            <Plus size={16} className="mr-2" /> Add Blog
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Blogs</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-row mb-6 justify-between">
          <div className="relative flex-grow md:w-1/2 w-full pr-8">
            <Input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="justify-between flex gap-2">
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-full md:w-36">
                <div className="flex items-center gap-2">
                  <File size={16} className="text-gray-500" />
                  <SelectValue placeholder="Tipe Acara" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="lomba">Lomba</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
                <SelectItem value="olimpiade">Olimpiade</SelectItem>
                <SelectItem value="kompetisi">Kompetisi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={institution} onValueChange={setInstitution}>
              <SelectTrigger className="w-full md:w-36">
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-gray-500" />
                  <SelectValue placeholder="Instansi" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="sma">SMA</SelectItem>
                <SelectItem value="smk">SMK</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-36">
                <div className="flex items-center gap-2">
                  <File size={16} className="text-gray-500" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results stats */}
        <div className="mb-4">
          <p className="text-gray-600">{filteredBlogs.length} blogs found</p>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBlogs.map((blog) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
              onEdit={handleEditBlog} 
              onDelete={handleDeleteBlog} 
            />
          ))}
          {filteredBlogs.length === 0 && (
            <div className="col-span-3 py-16 text-center text-gray-500">
              <p>No blogs found with the current filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog for Add/Edit blog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'add' ? 'Add New Blog' : 'Edit Blog'}</DialogTitle>
            <DialogDescription>
              Fill in the details below to {dialogMode === 'add' ? 'create a new' : 'update the'} blog.
            </DialogDescription>
          </DialogHeader>
          <BlogForm 
            blog={currentBlog} 
            onSubmit={handleFormSubmit} 
            onCancel={handleDialogClose} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}