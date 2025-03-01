import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, FileText, ArrowUp, Eye } from "lucide-react";

export default function AdminDashboard() {
  // Mock data - replace with real data later
  const stats = [
    { title: "Total Users", value: "1,234", icon: <Users className="h-4 w-4" />, change: "+12.3%" },
    { title: "Total Visitor", value: "5,845", icon: <Eye className="h-4 w-4" />, change: "+2.6%" },
    { title: "Total Blog Posts", value: "567", icon: <FileText className="h-4 w-4" />, change: "+4.1%" },
  ];

  const recentPosts = [
    { title: "Getting Started with React", author: "John Doe", instansi: "SMKN 1 Cimahi", tipe_acara: "Festival", date: "2024-03-15" },
    { title: "Web Development Best Practices", author: "Jane Smith", instansi: "SMKN 1 Cimahi", tipe_acara: "Festival", date: "2024-03-14" },
    { title: "Introduction to TypeScript", author: "Mike Johnson", instansi: "SMKN 1 Cimahi", tipe_acara: "Festival", date: "2024-03-13" },
  ];

  return (
    <div className="p-8 space-y-8 h-screen-navbar">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {stat.icon}
                  {stat.title}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowUp className="h-4 w-4" />
                {stat.change}
              </div>
            </div>
            <Skeleton className="h-2 w-full mt-4" />
          </Card>
        ))}
      </div>

      {/* Recent Blog Posts Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Blog Posts</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Instansi</TableHead>
                <TableHead>Tipe Acara</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPosts.map((post, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.instansi}</TableCell>
                  <TableCell>{post.tipe_acara}</TableCell>
                  <TableCell className="text-right">{post.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Skeleton className="h-4 w-[100px] mt-4" />
        </div>
      </Card>
    </div>
  );
};
