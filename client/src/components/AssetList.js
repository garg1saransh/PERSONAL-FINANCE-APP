import { useState } from 'react';
import axios from 'axios';

export default function AssetList({ assets, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    amountInvested: '',
    currentValue: ''
  });

  const handleEditClick = (asset) => {
    setEditingId(asset._id);
    setFormData({
      name: asset.name,
      type: asset.type,
      amountInvested: asset.amountInvested,
      currentValue: asset.currentValue
    });
  };

  const handleSaveClick = async () => {
    try {
      const res = await axios.put(`/api/assets/${editingId}`, formData);
      onUpdate(res.data); // update the asset list in App.js
      setEditingId(null);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h2>📜 Your Assets</h2>
      {assets.map(asset => (
        <div key={asset._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '0.5rem' }}>
          {editingId === asset._id ? (
            <div>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" />
              <input name="amountInvested" type="number" value={formData.amountInvested} onChange={handleChange} placeholder="Invested" />
              <input name="currentValue" type="number" value={formData.currentValue} onChange={handleChange} placeholder="Current" />
              <button onClick={handleSaveClick}>💾 Save</button>
              <button onClick={() => setEditingId(null)}>❌ Cancel</button>
            </div>
          ) : (
            <div>
              <strong>{asset.name}</strong> ({asset.type})<br />
              Invested: ₹{asset.amountInvested} → Current: ₹{asset.currentValue}<br />
              <button onClick={() => onDelete(asset._id)}>🗑️ Delete</button>
              <button onClick={() => handleEditClick(asset)}>✏️ Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
