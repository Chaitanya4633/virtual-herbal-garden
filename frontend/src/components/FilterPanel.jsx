import React from 'react';

const FilterPanel = ({ type, setType, region, setRegion, use, setUse }) => (
  <div className="flex gap-4 mb-4">
    <select value={type} onChange={e => setType(e.target.value)} className="p-2 border rounded">
      <option value="">All Types</option>
      <option value="herb">Herb</option>
      <option value="shrub">Shrub</option>
      <option value="tree">Tree</option>
    </select>
    <input
      type="text"
      placeholder="Region"
      value={region}
      onChange={e => setRegion(e.target.value)}
      className="p-2 border rounded"
    />
    <input
      type="text"
      placeholder="Medicinal Use"
      value={use}
      onChange={e => setUse(e.target.value)}
      className="p-2 border rounded"
    />
  </div>
);

export default FilterPanel;
