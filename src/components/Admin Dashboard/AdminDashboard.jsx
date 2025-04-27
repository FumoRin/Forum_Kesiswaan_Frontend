import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,  
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Users, FileText, ArrowUp, Eye, ExternalLink } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Mock data - replace with real data later
  const stats = [
    { 
      title: "Total Users", 
      value: "1,234", 
      total_Change: "151", 
      icon: <Users className="h-4 w-4" />, 
      change: "+12.3%",
      path: "/admin/users" 
    },
    { 
      title: "Total Visitor", 
      value: "5,845", 
      total_Change: "781", 
      icon: <Eye className="h-4 w-4" />, 
      change: "+2.6%",
      path: "/admin/visitors" 
    },
    { 
      title: "Total Blog Posts", 
      value: "567", 
      total_Change: "21", 
      icon: <FileText className="h-4 w-4" />, 
      change: "+4.1%",
      path: "/admin/blogs" 
    },
  ];

  const recentPosts = [
    { id: 1, title: "Getting Started with React", author: "John Doe", instansi: "SMKN 1 Cimahi", tipe_acara: "Festival", date: "2024-03-15" },
    { id: 2, title: "Web Development Best Practices", author: "Jane Smith", instansi: "SMKN 1 Cimahi", tipe_acara: "Festival", date: "2024-03-14" },
    { id: 3, title: "Introduction to TypeScript", author: "Mike Johnson", instansi: "SMKN 1 Cimahi", tipe_acara: "Festival", date: "2024-03-13" },
  ];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="mt-navbar">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <hr className="my-4 border-t" />

      <h1 className="text-3xl font-bold pb-4">Admin Dashboard</h1>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    {stat.icon}
                    {!isLoading ? stat.title : <Skeleton className="h-4 w-[120px]" />}
                  </div>
                  
                  {isLoading ? (
                    <Skeleton className="h-8 w-[100px] mb-2" />
                  ) : (
                    <div className="text-2xl font-bold">{stat.value}</div>
                  )}
                  
                  {isLoading ? (
                    <Skeleton className="h-4 w-[80px] mt-2" />
                  ) : (
                    <div className="text-sm text-muted-foreground mt-2">
                      {stat.total_Change} total change
                    </div>
                  )}
                </div>
                
                {isLoading ? (
                  <Skeleton className="h-4 w-[60px]" />
                ) : (
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      {stat.change}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2"
                      onClick={() => handleNavigation(stat.path)}
                    >
                      View Details <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Blog Posts Section */}
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isLoading ? <Skeleton className="h-6 w-[200px]" /> : 'Recent Blog Posts'}
              </h2>
              
              {!isLoading && (
                <Button
                  variant="outline"
                  onClick={() => handleNavigation('/admin/blogs')}
                >
                  View All Posts <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  {['Title', 'Author', 'Instansi', 'Tipe Acara', 'Date', 'Action'].map((header) => (
                    <TableHead key={header}>
                      {isLoading ? <Skeleton className="h-4 w-[100px]" /> : header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {isLoading ? (
                  // Skeleton Rows
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <TableCell key={i}>
                          <Skeleton className="h-4 w-full max-w-[150px]" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  // Actual Data Rows
                  recentPosts.map((post, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.instansi}</TableCell>
                      <TableCell>{post.tipe_acara}</TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleNavigation(`/admin/blog-posts/${post.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};