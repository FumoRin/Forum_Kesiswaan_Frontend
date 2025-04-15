import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { Suspense, lazy } from "react"
import './App.css'
import Loading from "./components/loading"

import Homepage from "./components/Home Page/homePage"
import Navbar from './components/navbar'
import Footer from './components/footer'
import AdminNavbar from "./components/adminNavbar"

const AdminDashboard = lazy(() => import("./components/Admin Dashboard/AdminDashboard")) 
const SearchResults = lazy(() => import("./components/Search Results/searchResults")) 
const BlogPage = lazy(() => import('./components/Search Results/searchResults'))  
const AuthPage = lazy(() => import("./components/login/page")) 
const UserAdmin = lazy(() => import("./components/Admin Dashboard/users/userAdmin")) 
const BlogAdmin = lazy(() => import("./components/Admin Dashboard/blogs/blogAdmin")) 

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Main Component */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/blog/:id" element={<BlogPage />} />
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
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserAdmin />} />
              <Route path="/admin/blogs" element={<BlogAdmin />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

// Layout components with Outlet
const MainLayout = () => (
  <div className='flex flex-col min-h-screen'>
    <Navbar />
    <main className="flex-1">
      <Suspense fallback={<div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </div>
);

const AuthLayout = () => (
  <Suspense fallback={<div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>}>
    <Outlet />
  </Suspense>
);

const AdminLayout = () => (
  <>
    <AdminNavbar />
    <main className="flex-1 py-4 px-8">
      <Suspense fallback={<div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </>
)

export default App
