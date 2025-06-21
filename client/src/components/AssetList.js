import { useState } from 'react';

export default function AssetList({ assets, onDelete }) {
  const [filterType, setFilterType] = useState('All');

  const types = ['All', ...new Set(assets.map(asset => asset.type))];
  const filtered = filterType === 'All'
    ? assets
    : assets.filter(asset => asset.type === filterType);

  return (
    <div>
      <label>
        Filter by Type:
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          {types.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
      </label>

      <ul>
        {filtered.map(asset => (
          <li key={asset._id}>
            <strong>{asset.name}</strong> - ₹{asset.currentValue} ({asset.type})
            <button onClick={() => onDelete(asset._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
