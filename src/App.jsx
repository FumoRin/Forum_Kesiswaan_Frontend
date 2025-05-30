import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import { Toaster } from '@/components/ui/toaster'

import Homepage from './components/Home Page/homePage'
import AdminDashboard from "./components/Admin Dashboard/AdminDashboard"
import SearchResults from './components/Search Results/searchResults'
import BlogPage from "./components/Blog Page/blogPage"
import Navbar from './components/navbar'
import Footer from './components/footer'  
import AuthPage from './components/login/page'
import UserAdmin from "./components/Admin Dashboard/users/userAdmin"
import BlogAdmin from "./components/Admin Dashboard/blogs/blogAdmin"
import UserDashboard from "./components/User Dashboard/userDashboard"
import UserBlog from "./components/User Dashboard/userBlog"
import AboutPage from "./components/About Page/aboutPage"

import PrivateRoutes from "./components/utils/protectedRoutes"
import { AuthProvider } from "./components/utils/authProvider"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Main Component */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
      
            {/* Auth Routes - without Navbar/Footer */}
            <Route element={<AuthLayout />}>
              <Route path="/auth" element={
                <div className="flex min-h-screen items-center justify-center">
                  <AuthPage />
                </div>
              } />
            </Route>
            {/* Admin Routes */}
            <Route element={<PrivateRoutes requiredRole="admin"/>}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserAdmin />} />
                <Route path="/admin/blogs" element={<BlogAdmin />} />
              </Route>
            </Route>
  
          {/* User Dashboard Routes */}
          <Route element={<UserDashboardLayout />}>
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/userdashboard/blogs" element={<UserBlog />} />
          </Route>
        </Routes>
        <Toaster />
        </div>
      </Router>
    </AuthProvider>
  )
}

// Layout components with Outlet
const MainLayout = () => (
  <div className='flex flex-col min-h-screen'>
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AuthLayout = () => (
  <>
    <Outlet />
  </>
);

const AdminLayout = () => (
  <>
    <Navbar />
    <main className="flex-1 py-4 px-8 ">
      <Outlet />
    </main>
    <Footer />
  </>
);

const UserDashboardLayout = () => (
  <>
    <Navbar />
    <main className="flex-1 py-4 px-8 ">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default App
