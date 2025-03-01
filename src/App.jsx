import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'

import Homepage from './components/Home Page/homePage'
import SearchResults from './components/Search Results/SearchResults'
import BlogPage from "./components/Blog Page/blogPage"
import Navbar from './components/navbar'
import Footer from './components/footer'  
import AuthPage from './components/login/page'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Main Component */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/blog/:id" element={<BlogPage />} />
          </Route> 
          
          {/* Auth Routes - without Navbar/Footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={
              <div className="flex min-h-screen items-center justify-center">
                <AuthPage />
              </div>
            } />
          </Route>
        </Routes>
      </div>
    </Router>
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

export default App
