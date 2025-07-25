import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlantDetails from '../components/PlantDetails';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const PlantProfile = ({ bookmarks, setBookmarks }) => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/plants/${id}`).then(res => setPlant(res.data));
  }, [id]);

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
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-300 to-emerald-400 py-16 px-2 flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto bg-white/60 backdrop-blur-lg rounded-[2.5rem] shadow-[0_10px_40px_rgba(16,185,129,0.25)] p-10 border-4 border-emerald-300 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 opacity-30 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-green-400 opacity-20 rounded-full blur-3xl z-0" />
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-emerald-800 mb-6 text-center drop-shadow">Plant Details</h1>
          <PlantDetails
            plant={plant}
            onBookmark={handleBookmark}
            isBookmarked={bookmarks.some(p => p.id === plant?.id)}
            onShare={handleShare}
          />
        </div>
      </div>
    </div>
  );
};

export default PlantProfile;
