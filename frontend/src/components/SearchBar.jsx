import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search plants by name, use, region..."
    value={value}
    onChange={e => onChange(e.target.value)}
    className="p-2 border rounded w-full mb-4"
  />
);

export default SearchBar;
