import { useEffect, useState } from 'react';
import api from './api';
import AssetForm from './components/AssetForm';
import AssetList from './components/AssetList';
import Dashboard from './components/Dashboard';
import PortfolioChart from './components/PortfolioChart';

function App() {
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    const res = await api.get('/assets');
    setAssets(res.data);
  };

  const handleAdd = asset => setAssets([...assets, asset]);

  const handleDelete = async id => {
    await api.delete(`/assets/${id}`);
    setAssets(assets.filter(a => a._id !== id));
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      <Dashboard assets={assets} />
      <PortfolioChart assets={assets} />
      <AssetForm onAssetAdded={handleAdd} />
      <AssetList assets={assets} onDelete={handleDelete} />
    </div>
  );
}

export default App;
