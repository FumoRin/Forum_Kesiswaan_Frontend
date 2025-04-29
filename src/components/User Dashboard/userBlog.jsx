import React, { useState } from 'react';
import {
  Input
} from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, File, Building, Plus, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserBlogCard from "./userBlogCard";
import BlogForm from "./blogs-crud-user/blogUserForm";
import thumbnailBlog from "../../assets/thumbnail.jpg";

// Sample data
const sampleResults = [
  {
    id: '1',
    title: 'Lomba Kebersihan Antar Sekolah',
    school: 'SMK Negeri 1 Cimahi',
    event: 'Lomba WS Terbersih',
    date: '16 Agustus 2024',
    content: '<h2>Kegiatan Lomba Kebersihan</h2><p>Kegiatan lomba kebersihan ini bertujuan untuk meningkatkan kesadaran para siswa akan pentingnya kebersihan lingkungan sekolah. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl risus, sodales eu sem vel, fermentum suscipit justo. Nam ut ex ut orci placerat ultrices non vel quam. Aenean ac nisi vitae felis eleifend lobortis. Donec convallis fermentum arcu, eu maximus ex facilisis quis. Vivamus vitae dui ut ex convallis aliquam ultricies sit amet dui. Vivamus sed laoreet diam, non auctor arcu. Sed sodales quam id semper tincidunt. Phasellus lobortis porta faucibus. Vestibulum eu mauris urna. </p><p>Lomba ini melibatkan seluruh jurusan di sekolah dengan kriteria penilaian meliputi:</p><ul><li>Kebersihan</li><li>Kerapihan</li><li>Kreativitas dalam mendekorasi ruang belajar</li><li>Kebersihan kamar mandi</li></ul><p>Pemenang akan diumumkan pada akhir lomba dan diberikan penghargaan berupa piala untuk juara 1, 2, dan 3.</p><img src="https://picsum.photos/id/1018/800/600" alt="Dokumentasi Lomba" />',
    status: 'published',
    thumbnail: thumbnailBlog,
    gallery: [
      {
        original: 'https://picsum.photos/id/1018/800/600',
        thumbnail: 'https://picsum.photos/id/1018/200/150',
      },
      {
        original: 'https://picsum.photos/id/1025/800/600',
        thumbnail: 'https://picsum.photos/id/1025/200/150',
      },
    ],
  },
  // ... other sample data
];

export default function UserPosts() {
  const [blogs, setBlogs] = useState(sampleResults);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('');
  const [institution, setInstitution] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  
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
    setFormMode('add');
    setShowForm(true);
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    }
  };

  const handleFormSubmit = (formData) => {
    if (formMode === 'add') {
      // Generate a simple ID for demo purposes
      const newId = (Math.max(...blogs.map(b => parseInt(b.id))) + 1).toString();
      setBlogs(prev => [...prev, { ...formData, id: newId }]);
    } else {
      setBlogs(prev => prev.map(blog => blog.id === formData.id ? formData : blog));
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="mt-navbar flex flex-col pb-10">
        <div className="flex flex-col">
          <div className="flex justify-between items-center ">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleFormCancel} className="mr-2">
                <ArrowLeft size={16} className="mr-2" /> Back to Blogs
              </Button>
              <h1 className="text-2xl font-bold">{formMode === 'add' ? 'Add New Blog' : 'Edit Blog'}</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg pt-6">
            <BlogForm 
              blog={currentBlog} 
              onSubmit={handleFormSubmit} 
              onCancel={handleFormCancel} 
              mode={formMode}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-navbar flex flex-col">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Blog Management</h1>
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
            <UserBlogCard 
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
    </div>
  );
}