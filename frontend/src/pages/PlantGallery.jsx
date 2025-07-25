import React, { useEffect, useState } from 'react';
import PlantCard from '../components/PlantCard';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const PlantGallery = ({ bookmarks, setBookmarks }) => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/plants`).then(res => setPlants(res.data));
  }, []);

  const handleBookmark = plant => {
    const updated = bookmarks.some(p => p.id === plant.id)
      ? bookmarks.filter(p => p.id !== plant.id)
      : [...bookmarks, plant];
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const handleShare = plant => {
    const shareUrl = window.location.origin + `/plants/${plant.id}`;
    if (navigator.share) {
      navigator.share({ title: plant.botanicalName, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-green-800 mb-8 text-center drop-shadow">All Plants</h2>
        {plants.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-xl">No plants found. Try searching or check back later!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {plants.map(plant => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onBookmark={handleBookmark}
                isBookmarked={bookmarks.some(p => p.id === plant.id)}
                onShare={handleShare}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantGallery;
