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
import axios from 'axios';
import { useAuth } from '@/components/utils/authProvider'; // Adjust import path as needed
import BlogContentEditor from './BlogContentEditor';
import BlogGalleryManager from './BlogGalleryManager';
import BlogSettingsPanel from './BlogSettingsPanel';
import { useBlogSubmit } from '../hooks/useBlogSubmit';

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

  const { token } = useAuth(); // Assuming you have an auth context

  const { handleSubmit: handleFormSubmit, isLoading } = useBlogSubmit(token, isEditMode, onSubmit);

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

  useEffect(() => {
    if (editor && blog) {
      editor.commands.setContent(blog.content || '');
      setPreviewContent(blog.content || '');
      setFormData({
        id: blog?.id || '',
        title: blog?.title || '',
        school: blog?.school || '',
        event: blog?.event || '',
        date: blog?.date || '',
        content: blog?.content || '',
        status: blog?.status || 'draft',
        gallery: blog?.gallery?.map(item => typeof item === 'string' ? { original: item, thumbnail: item } : item) || [],
        thumbnail: blog?.thumbnail ? (typeof blog.thumbnail === 'string' ? { url: blog.thumbnail, file: null } : blog.thumbnail) : null,
      });
    }
  }, [blog, editor]);

  useEffect(() => {
    if (formData?.date) {
      try {
        const parts = formData.date.split(' ');
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
            const dateObj = new Date(year, month, day);
            if (!selectedDate || dateObj.getTime() !== selectedDate.getTime()) {
                setSelectedDate(dateObj);
            }
          }
        }
      } catch (error) {
        console.error("Failed to parse date:", error);
        setSelectedDate(null);
      }
    } else {
        setSelectedDate(null);
    }
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date) => {
    if (!date) {
      setFormData(prev => ({ ...prev, date: '' }));
      setSelectedDate(null);
      return;
    }
    setSelectedDate(date);
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
      file: file
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
    setFormData(prev => {
      const itemToRemove = prev.gallery[index];
      if (itemToRemove.file && itemToRemove.original.startsWith('blob:')) {
        URL.revokeObjectURL(itemToRemove.original);
      }
      return {
          ...prev,
          gallery: prev.gallery.filter((_, i) => i !== index)
      };
    });
  };

  useEffect(() => {
    return () => {
      formData.gallery?.forEach(item => {
        if (item.file && item.original?.startsWith('blob:')) {
          URL.revokeObjectURL(item.original);
        }
      });
      if (formData.thumbnail?.file && formData.thumbnail.url?.startsWith('blob:')) {
        URL.revokeObjectURL(formData.thumbnail.url);
      }
    };
  }, [formData.gallery, formData.thumbnail]);

  return (
    <div className="md:px-6">
      <form id="blog-form" onSubmit={(e) => { e.preventDefault(); handleFormSubmit(formData, formData.status); }} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BlogContentEditor
              formData={formData}
              editor={editor}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleChange={handleChange}
              previewContent={previewContent}
            />
            <BlogGalleryManager
              gallery={formData.gallery}
              handleGalleryChange={handleGalleryChange}
              removeGalleryItem={removeGalleryItem}
            />
          </div>
          <BlogSettingsPanel
            formData={formData}
            selectedDate={selectedDate}
            handleSelectChange={handleSelectChange}
            handleDateSelect={handleDateSelect}
            handleChange={handleChange}
            handleThumbnailChange={handleThumbnailChange}
          />
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleFormSubmit(formData, 'draft')}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner mr-2"></span> Saving Draft...
              </>
            ) : (
              'Save as Draft'
            )}
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner mr-2"></span> Publishing...
              </>
            ) : (
              isEditMode ? 'Update Post' : 'Publish'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;