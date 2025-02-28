import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'

import Homepage from './components/Home Page/homePage'
import SearchResults from './components/Search Results/SearchResults'
import BlogPage from "./components/Blog Page/blogPage"
import Navbar from './components/navbar'
import Footer from './components/footer'  

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

// const AuthLayout = () => (
//   <>
//     <Footer />
//   </>
// );

export default App
