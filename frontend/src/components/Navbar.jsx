import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
    <div className="font-bold text-xl tracking-wide">Virtual Herbal Garden</div>
    <div className="flex gap-8">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/plants" className="hover:underline">Plants</Link>
      <Link to="/virtual-tours" className="hover:underline">Virtual Tours</Link>
      <Link to="/bookmarks" className="hover:underline">Bookmarks</Link>
    </div>
  </nav>
);

export default Navbar;
