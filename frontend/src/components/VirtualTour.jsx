import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const VirtualTour = ({ bookmarks, setBookmarks }) => {
  const tours = [
    { label: 'Digestive Health', use: 'digestion' },
    { label: 'Immunity Boost', use: 'immunity' },
    { label: 'Skin Care', use: 'skin care' },
    { label: 'Respiratory Health', use: 'respiratory' },
    { label: 'Mental Wellness', use: 'mental' },
  ];
  const [selectedTour, setSelectedTour] = useState(tours[0].use);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlants(selectedTour);
    // eslint-disable-next-line
  }, [selectedTour]);

  const fetchPlants = async (use) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/plants?use=${encodeURIComponent(use)}`);
      setPlants(data);
    } catch (err) {
      setPlants([]);
    }
    setLoading(false);
  };

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
        <h2 className="text-4xl font-extrabold text-green-800 mb-8 text-center drop-shadow">Virtual Tours</h2>
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {tours.map(tour => (
            <button
              key={tour.use}
              className={`px-8 py-3 rounded-2xl shadow-lg text-lg font-semibold transition bg-gradient-to-br from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 ${selectedTour === tour.use ? 'ring-4 ring-emerald-400 scale-105' : ''}`}
              onClick={() => setSelectedTour(tour.use)}
            >
              {tour.label}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center text-lg text-green-700 py-12">Loading plants...</div>
        ) : plants.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-xl">No plants found for this tour.</div>
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

export default VirtualTour;
