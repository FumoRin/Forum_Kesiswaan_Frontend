import React, { useState, useEffect } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, File, Building, Plus, ArrowLeft, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

import BlogCard from "./blogCard";
import BlogForm from "./blogs-crud/blogForm";
import { useAuth } from "@/components/utils/authProvider";

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('');
  const [institution, setInstitution] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formMode, setFormMode] = useState('add'); 
  
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  
  const { toast } = useToast();
  const { token } = useAuth();

  const API_URL = "http://localhost:3000";

  // Fetch blogs from API
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/events`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Convert the API response to match expected blog format
      const formattedBlogs = response.data.map(event => ({
        id: event.id.toString(),
        title: event.title,
        school: event.school,
        event: event.event,
        date: event.date,
        content: event.content,
        status: event.status,
        thumbnail: event.thumbnail,
        gallery: event.gallery ? JSON.parse(event.gallery) : []
      }));
      setBlogs(formattedBlogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load blogs. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteBlog = async (id) => {
    setSelectedBlogId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/events/${selectedBlogId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast({
        title: "Success",
        description: "Blog deleted successfully.",
        variant: "success"
      });
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== selectedBlogId));
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast({
        title: "Error",
        description: "Failed to delete blog. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false)
      setIsDeleteModalOpen(false);
      setSelectedBlogId(null);
    }
  };

  const handleFormSubmit = async (formData) => {
    // We should not be calling this directly - the useBlogSubmit hook should handle submission
    console.log("WARNING: handleFormSubmit called directly. This should not happen.");
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="mt-navbar flex flex-col pb-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/blogs">Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{formMode === 'add' ? 'Add New Blog' : 'Edit Blog'}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <hr className="my-4 border-t" />

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
              onSubmit={(responseData) => {
                // This receives response data from the API after successful submission
                console.log("Form submission success:", responseData);
                
                // Update local state with new or updated blog
                if (formMode === 'add') {
                  setBlogs(prev => [...prev, {
                    id: responseData.id.toString(),
                    title: responseData.title,
                    school: responseData.school,
                    event: responseData.event,
                    date: responseData.date,
                    content: responseData.content,
                    status: responseData.status,
                    thumbnail: responseData.thumbnail,
                    gallery: responseData.gallery ? (typeof responseData.gallery === 'string' ? JSON.parse(responseData.gallery) : responseData.gallery) : []
                  }]);
                } else {
                  setBlogs(prev => prev.map(blog => 
                    blog.id === responseData.id.toString() ? {
                      id: responseData.id.toString(),
                      title: responseData.title,
                      school: responseData.school,
                      event: responseData.event,
                      date: responseData.date,
                      content: responseData.content,
                      status: responseData.status,
                      thumbnail: responseData.thumbnail,
                      gallery: responseData.gallery ? (typeof responseData.gallery === 'string' ? JSON.parse(responseData.gallery) : responseData.gallery) : []
                    } : blog
                  ));
                }
                
                // Close the form after successful submission
                setShowForm(false);
                
                // Refresh blog list to ensure we have the latest data
                fetchBlogs();
              }} 
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
          <Button onClick={handleAddBlog} disabled={loading}>
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
                <SelectItem value="pengumuman">Pengumuman</SelectItem>
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

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <Button onClick={fetchBlogs} variant="outline" className="mt-4">
              Try Again
            </Button>
          </div>
        )}

        {/* Blog cards */}
        {!loading && !error && (
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
        )}
      </div>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <Trash2 className="mr-2 h-5 w-5" />
              Delete Blog
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the blog? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}