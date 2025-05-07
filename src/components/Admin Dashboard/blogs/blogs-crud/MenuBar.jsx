import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline as UnderlineIcon, Heading2, Heading3,
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon,
  AlignLeft, AlignCenter, AlignRight, Undo, Redo,
} from 'lucide-react';

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
          onClick={addImage}
          title="Insert Image"
        >
          <ImageIcon size={16} />
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