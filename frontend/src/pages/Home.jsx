import React, { useEffect, useState } from 'react';
import PlantCard from '../components/PlantCard';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const Home = ({ bookmarks, setBookmarks }) => {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterUse, setFilterUse] = useState('');

  useEffect(() => {
    fetchPlantsWithFilters();
    // eslint-disable-next-line
  }, []);

  const fetchPlantsWithFilters = async () => {
    setLoading(true);
    let url = `${API_URL}/plants?`;
    if (searchInput) url += `search=${encodeURIComponent(searchInput)}&`;
    if (filterType) url += `type=${encodeURIComponent(filterType)}&`;
    if (filterRegion) url += `region=${encodeURIComponent(filterRegion)}&`;
    if (filterUse) url += `use=${encodeURIComponent(filterUse)}&`;
    const { data } = await axios.get(url);
    setPlants(data);
    setSearch(searchInput);
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

  const handleSearch = e => {
    e.preventDefault();
    setSearch(searchInput);
    fetchPlants(searchInput);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 px-8 py-16 max-w-6xl mx-auto">
        <img
          src="home-image.jpg"
          alt="Virtual Herbal Garden"
          className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover h-72 md:h-96 border-4 border-green-600"
          style={{ background: '#c7f5d9' }}
        />
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4 drop-shadow-lg">Virtual Herbal Garden</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Discover, bookmark, and learn about AYUSH medicinal plants. Explore detailed information, multimedia, and 3D models for an immersive educational experience.
          </p>

        </div>
      </section>
      {/* Filter Panel */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <form
          className="flex flex-col md:flex-row gap-4 items-center bg-white rounded-xl shadow p-6 mt-[-2rem] mb-8 border border-green-200"
          onSubmit={e => { e.preventDefault(); fetchPlantsWithFilters(); }}
        >
          <input
            type="text"
            placeholder="Search plants by name..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="flex-1 p-3 rounded-lg border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white shadow"
          />
          <select
            className="p-3 rounded-lg border-2 border-green-400 bg-white"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="herb">Herb</option>
            <option value="shrub">Shrub</option>
            <option value="tree">Tree</option>
          </select>
          <input
            type="text"
            placeholder="Region"
            className="p-3 rounded-lg border-2 border-green-400 bg-white"
            value={filterRegion}
            onChange={e => setFilterRegion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Medicinal Use"
            className="p-3 rounded-lg border-2 border-green-400 bg-white"
            value={filterUse}
            onChange={e => setFilterUse(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow"
          >
            Search
          </button>
        </form>
      </section>
      {/* Plant Results */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-6 mt-2">{search || filterType || filterRegion || filterUse ? `Results` : 'Featured Plants'}</h2>
        {loading ? (
          <div className="text-center text-lg text-green-700 py-12">Loading plants...</div>
        ) : plants.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No plants found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
      </section>
    </div>
  );
};

export default Home;
