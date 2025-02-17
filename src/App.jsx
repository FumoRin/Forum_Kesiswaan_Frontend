import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SearchPage from './components/Search Page/searchPage';
import SearchResults from './components/Search Results/searchResults';
import BlogDetail from './components/Blog Post/BlogDetail';
import Login from './components/Auth/Login'; // Import komponen Login
import SignUp from './components/Auth/SignUp'; // Import komponen SignUp

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search-results" element={<SearchResults results={[]} />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} /> {/* Tambahkan route untuk Login */}
          <Route path="/signup" element={<SignUp />} /> {/* Tambahkan route untuk SignUp */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;