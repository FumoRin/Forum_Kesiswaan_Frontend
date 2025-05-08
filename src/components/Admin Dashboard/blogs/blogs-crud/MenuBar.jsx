import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline as UnderlineIcon, Heading2, Heading3,
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon,
  AlignLeft, AlignCenter, AlignRight, Undo, Redo, Loader,
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/components/utils/authProvider';
import { toast } from "@/hooks/use-toast";

// TipTap Toolbar Component
const MenuBar = ({ editor }) => {
  const imageInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const { token } = useAuth();

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      try {
        setIsUploading(true);
        
        // Upload the image to server first before inserting it
        const formData = new FormData();
        formData.append('file', file);
        
        // Using the direct endpoint matching the router definition
        const response = await axios.post('http://localhost:3000/upload/single', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Get the server URL and insert it directly
        const serverUrl = response.data.file.url;
        
        // Insert the image with server URL directly (no blob URL intermediary)
        editor.chain().focus().setImage({ src: serverUrl }).run();
        
        toast({
          title: "Success",
          description: "Image uploaded successfully",
          variant: "success"
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Upload Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsUploading(false);
        // Reset the file input
        e.target.value = '';
      }
    }
  };

  const triggerImageUpload = () => {
    if (isUploading) return;
    imageInputRef.current?.click();
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
      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Formatting Buttons */}
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

      {/* Heading Buttons */}
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

      {/* List Buttons */}
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

      {/* Alignment Buttons */}
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

      {/* Link and Image Buttons */}
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
          onClick={triggerImageUpload}
          disabled={isUploading}
          title="Insert Image"
        >
          {isUploading ? <Loader size={16} className="animate-spin" /> : <ImageIcon size={16} />}
        </Button>
      </div>

      {/* History Buttons */}
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

export default MenuBar; 