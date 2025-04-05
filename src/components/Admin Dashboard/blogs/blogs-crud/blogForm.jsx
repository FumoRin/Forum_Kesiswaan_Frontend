import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { 
  Bold, Italic, Underline as UnderlineIcon, Heading2, Heading3, 
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon, 
  AlignLeft, AlignCenter, AlignRight, Undo, Redo, 
  Calendar, School, Award, LayoutGrid, ArrowLeft
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// TipTap Toolbar Component
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter the URL:', previousUrl);
    
    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border border-gray-200 rounded-t-md p-2 flex flex-wrap gap-1 bg-white sticky top-0 z-10">
      <div className="flex gap-1 mr-2">
        <Button
          type="button"
          variant={editor.isActive('bold') ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('italic') ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('underline') ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </Button>
      </div>

      <div className="flex gap-1 mr-2">
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 2 }) ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 3 }) ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </Button>
      </div>

      <div className="flex gap-1 mr-2">
        <Button
          type="button"
          variant={editor.isActive('bulletList') ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('orderedList') ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </Button>
      </div>

      <div className="flex gap-1 mr-2">
        <Button 
          type="button"
          variant={editor.isActive({ textAlign: 'left' }) ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </Button>
        <Button 
          type="button"
          variant={editor.isActive({ textAlign: 'center' }) ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </Button>
        <Button 
          type="button"
          variant={editor.isActive({ textAlign: 'right' }) ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Align Right"
        >
          <AlignRight size={16} />
        </Button>
      </div>

      <div className="flex gap-1 mr-2">
        <Button
          type="button"
          variant={editor.isActive('link') ? "default" : "outline"}
          size="icon"
          onClick={setLink}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addImage}
          title="Insert Image"
        >
          <ImageIcon size={16} />
        </Button>
      </div>

      <div className="flex gap-1 ml-auto">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo size={16} />
        </Button>
      </div>
    </div>
  );
};

const BlogForm = ({ blog, onSubmit, onCancel, mode = 'add' }) => {
  const navigate = useNavigate();
  const isEditMode = mode === 'edit';
  
  const [formData, setFormData] = useState({
    id: blog?.id || '',
    title: blog?.title || '',
    school: blog?.school || '',
    event: blog?.event || '',
    date: blog?.date || '',
    content: blog?.content || '',
    status: blog?.status || 'draft',
    gallery: blog?.gallery || [],
    thumbnail: blog?.thumbnail || null,
  });
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("content");
  const [previewContent, setPreviewContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize TipTap editor with extensions
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3], // Supports only h2 and h3
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Image,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Write your blog content here...',
      }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setFormData(prev => ({ ...prev, content: html }));
      setPreviewContent(html);
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[300px] max-w-none w-full',
      },
    },
  });

  // Update editor content when blog data changes
  useEffect(() => {
    if (editor && blog) {
      editor.commands.setContent(blog.content || '');
      setPreviewContent(blog.content || '');
    }
  }, [blog, editor]);

  // Parse date string when blog data changes
  useEffect(() => {
    if (blog?.date) {
      try {
        // Parse date string (assuming format like "16 Agustus 2024")
        const parts = blog.date.split(' ');
        if (parts.length === 3) {
          const months = {
            'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 
            'Mei': 4, 'Juni': 5, 'Juli': 6, 'Agustus': 7, 
            'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
          };
          
          const day = parseInt(parts[0]);
          const month = months[parts[1]];
          const year = parseInt(parts[2]);
          
          if (!isNaN(day) && month !== undefined && !isNaN(year)) {
            setSelectedDate(new Date(year, month, day));
          }
        }
      } catch (error) {
        console.error("Failed to parse date:", error);
      }
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    
    // Format the date as "DD Bulan YYYY" for Indonesian format
    const day = date.getDate();
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    const formattedDate = `${day} ${month} ${year}`;
    setFormData(prev => ({ ...prev, date: formattedDate }));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newGalleryItems = files.map(file => ({
      original: URL.createObjectURL(file),
      thumbnail: URL.createObjectURL(file),
      file: file // Keep the file object for later upload
    }));

    setFormData(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), ...newGalleryItems]
    }));
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        thumbnail: {
          url: URL.createObjectURL(file),
          file: file
        }
      }));
    }
  };

  const removeGalleryItem = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Call the onSubmit prop with the form data
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Fallback if onSubmit is not provided
      console.log("Submitting blog data:", formData);
      setIsLoading(false);
      navigate('/admin/blogs');
    }
  };

  return (
    <div className="md:px-6">

      {/* Main Form */}
      <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Blog Content</CardTitle>
                <CardDescription>
                  Write the content for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center gap-2">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange}
                      placeholder="Enter blog title"
                      required
                      className="bg-white"
                    />
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="content">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="content" className="mt-2 ">
                      <div className="border rounded-md overflow-hidden">
                        <MenuBar editor={editor} />
                        <EditorContent 
                          editor={editor} 
                          className="min-h-[400px] p-4 bg-white prose prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 max-w-none w-full prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="preview" className="mt-2">
                      <div className="border rounded-md p-6 min-h-[400px] prose prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 max-w-none bg-white prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto">
                        {previewContent ? (
                          <div dangerouslySetInnerHTML={{ __html: previewContent }} />
                        ) : (
                          <p className="text-gray-400">No content to preview</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
            
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
                    />
                  </div>
                  
                  {formData.gallery && formData.gallery.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                      {formData.gallery.map((item, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={item.thumbnail} 
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
          </div>
          
          {/* Right column - Settings */}
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
                          className={`w-full justify-start text-left font-normal bg-white ${
                            !selectedDate && "text-muted-foreground"
                          }`}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            formData.date
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
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
                      value={formData.school} 
                      onChange={handleChange}
                      placeholder="Enter school name"
                      required
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event" className="flex items-center gap-2">
                      <Award size={16} /> Event <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="event" 
                      name="event" 
                      value={formData.event} 
                      onChange={handleChange}
                      placeholder="Enter event name"
                      required
                      className="bg-white"
                    />
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
                    />
                    
                    {formData.thumbnail && (
                      <div className="mt-2 border rounded overflow-hidden">
                        <img 
                          src={typeof formData.thumbnail === 'object' ? formData.thumbnail.url : formData.thumbnail} 
                          alt="Thumbnail" 
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;