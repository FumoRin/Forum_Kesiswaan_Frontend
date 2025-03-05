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
import { Users, FileText, ArrowUp, Eye } from "lucide-react";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  // Mock data - replace with real data later
  const stats = [
    { title: "Total Users", value: "1,234", total_Change: "151", icon: <Users className="h-4 w-4" />, change: "+12.3%" },
    { title: "Total Visitor", value: "5,845", total_Change: "781", icon: <Eye className="h-4 w-4" />, change: "+2.6%" },
    { title: "Total Blog Posts", value: "567", total_Change: "21", icon: <FileText className="h-4 w-4" />, change: "+4.1%" },
  ];

  const recentPosts = [
    { title: "Getting Started with React", author: "John Doe", instansi: "SMKN 1 Cimahi", tipe_acara: "Festival", date: "2024-03-15" },
    { title: "Web Development Best Practices", author: "Jane Smith", instansi: "SMKN 1 Cimahi", tipe_acara: "Festival", date: "2024-03-14" },
    { title: "Introduction to TypeScript", author: "Mike Johnson", instansi: "SMKN 1 Cimahi", tipe_acara: "Festival", date: "2024-03-13" },
  ];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-4 px-8 space-y-8 h-screen-navbar mt-navbar">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
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
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUp className="h-4 w-4" />
                  {stat.change}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Blog Posts Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isLoading ? <Skeleton className="h-6 w-[200px]" /> : 'Recent Blog Posts'}
          </h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                {['Title', 'Author', 'Instansi', 'Tipe Acara', 'Date'].map((header) => (
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
                    {Array.from({ length: 5 }).map((_, i) => (
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
                    <TableCell className="text-right">{post.date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
          {isLoading && <Skeleton className="h-8 w-[100px] mt-4" />}
        </div>
      </Card>
    </div>
  );

};
