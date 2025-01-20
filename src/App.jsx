import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SearchPage from './components/Search Page/searchPage';
import SearchResults from './components/Search Results/searchResults';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search-results" element={<SearchResults results={[]} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;