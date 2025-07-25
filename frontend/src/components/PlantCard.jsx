import React from 'react';
import { useNavigate } from 'react-router-dom';

function getImageUrl(url) {
  if (!url) return '/assets/images/placeholder.jpg';
  const match = url.match(/drive\.google\.com\/file\/d\/([\w-]+)\/view/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

const PlantCard = ({ plant, onBookmark, isBookmarked, onShare }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-transform duration-200 cursor-pointer border border-green-100">
      <img
        src={`/Hacthon(JFS)/Images/${plant.commonNames[0].replace(/\s+/g, '_')}.jpg`||`/Hacthon(JFS)/Images/${plant.commonNames[0].replace(/\s+/g, '_')}.jpeg`}
        onError={e => { e.target.onerror = null; e.target.src = '/assets/images/placeholder.jpg'; }}
        alt={plant.commonNames?.[0] || plant.botanicalName}
        className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-green-200 shadow"
      />
      <h2 className="text-xl font-bold mb-1 text-green-900 text-center drop-shadow-sm">{plant.commonNames?.[0] || plant.botanicalName}</h2>
      <div className="text-green-700 text-sm mb-2 text-center">{plant.botanicalName}</div>
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {plant.uses?.slice(0, 3).map(tag => <span key={tag} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{tag}</span>)}
      </div>
      <div className="flex gap-2 mt-2 flex-wrap justify-center">
        <button onClick={e => {e.stopPropagation(); onBookmark(plant);}} className={`px-3 py-1 rounded ${isBookmarked ? 'bg-yellow-400 text-black' : 'bg-green-600 text-white'} hover:opacity-90 shadow`}>
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button onClick={e => {e.stopPropagation(); onShare(plant);}} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 shadow">Share</button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Check out this plant: ${plant.botanicalName} - ${window.location.origin}/plants/${plant.id}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 flex items-center shadow"
          onClick={e => e.stopPropagation()}
        >
          WhatsApp
        </a>
        <button onClick={() => navigate(`/plants/${plant.id}`)} className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 shadow">Details</button>
      </div>
    </div>
  );
};

export default PlantCard;
