import React, { useEffect, useState } from 'react';
import PlantCard from '../components/PlantCard';

const Bookmarks = ({ bookmarks, setBookmarks }) => {
  useEffect(() => {
    const stored = localStorage.getItem('bookmarks');
    if (stored) setBookmarks(JSON.parse(stored));
  }, [setBookmarks]);

  const handleBookmark = plant => {
    const updated = bookmarks.filter(p => p.id !== plant.id);
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
        <h2 className="text-4xl font-extrabold text-green-800 mb-8 text-center drop-shadow">Bookmarked Plants</h2>
        {bookmarks.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-xl">You have no bookmarks yet. Start exploring and save your favourite plants!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {bookmarks.map(plant => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onBookmark={handleBookmark}
                isBookmarked={true}
                onShare={handleShare}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
