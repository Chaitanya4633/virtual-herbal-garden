import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlantGallery from './pages/PlantGallery';
import PlantProfile from './pages/PlantProfile';
import Bookmarks from './pages/Bookmarks';
import VirtualTour from './pages/VirtualTour';

const App = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    const stored = localStorage.getItem('bookmarks');
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
        <Route path="/plants" element={<PlantGallery bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
        <Route path="/plants/:id" element={<PlantProfile bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
        <Route path="/bookmarks" element={<Bookmarks bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
        <Route path="/virtual-tours" element={<VirtualTour bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
      </Routes>
    </Router>
  );
};

export default App;
