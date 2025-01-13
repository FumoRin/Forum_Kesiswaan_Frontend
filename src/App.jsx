import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SearchPage from './components/Search Page/searchPage';

const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SearchPage />
      <Footer />
    </div>
  );
};

export default MainPage;