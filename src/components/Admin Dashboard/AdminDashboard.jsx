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
import { Users, FileText, ArrowUp, Eye, ExternalLink, ArrowDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Authentication required');
        }
        
        const response = await axios.get(`http://localhost:3000/stats/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setDashboardData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  // Process stats data for display
  const getStatsData = () => {
    if (!dashboardData || !dashboardData.stats) {
      return [
        { title: "Total Users", value: "0", total_Change: "0", icon: <Users className="h-4 w-4" />, change: "0%", path: "/admin/users", isPositive: true },
        { title: "Total Blog Posts", value: "0", total_Change: "0", icon: <FileText className="h-4 w-4" />, change: "0%", path: "/admin/blogs", isPositive: true }
      ];
    }
    
    // Extract stats safely
    const usersStats = dashboardData.stats.users || { total: 0, change: 0, percentChange: 0, isPositive: true };
    const postsStats = dashboardData.stats.posts || { total: 0, change: 0, percentChange: 0, isPositive: true };
    
    return [
      { 
        title: "Total Users", 
        value: String(usersStats.total || 0), 
        total_Change: String(Math.abs(usersStats.change || 0)), 
        icon: <Users className="h-4 w-4" />, 
        change: `${usersStats.isPositive ? '+' : '-'}${Math.abs(usersStats.percentChange || 0)}%`,
        path: "/admin/users",
        isPositive: usersStats.isPositive
      },
      { 
        title: "Total Blog Posts", 
        value: String(postsStats.total || 0), 
        total_Change: String(Math.abs(postsStats.change || 0)), 
        icon: <FileText className="h-4 w-4" />, 
        change: `${postsStats.isPositive ? '+' : '-'}${Math.abs(postsStats.percentChange || 0)}%`,
        path: "/admin/blogs",
        isPositive: postsStats.isPositive
      },
    ];
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
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error loading dashboard data: {error}
        </div>
      )}
      
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getStatsData().map((stat, index) => (
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
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.isPositive ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
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
                  {['Title', 'Instansi', 'Tipe Acara', 'Date', 'Status', 'Action'].map((header) => (
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
                  dashboardData?.recentPosts?.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.instansi}</TableCell>
                      <TableCell>{post.tipe_acara}</TableCell>
                      <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' : 
                          post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleNavigation(`/admin/events/${post.id}`)}
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
}