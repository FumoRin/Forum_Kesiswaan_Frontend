import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { EditorContent } from '@tiptap/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MenuBar from './MenuBar';

const BlogContentEditor = ({ formData, editor, activeTab, setActiveTab, handleChange, previewContent }) => {
  if (!editor) return null;

  return (
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

            <TabsContent value="content" className="mt-2">
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
  );
};

export default BlogContentEditor; 