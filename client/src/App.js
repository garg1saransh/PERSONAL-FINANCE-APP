import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import api from './api';

import AssetForm from './components/AssetForm';
import AssetList from './components/AssetList';
import Dashboard from './components/Dashboard';
import PortfolioChart from './components/PortfolioChart';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/UserDashboard';

function App() {
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    try {
      const res = await api.get('/assets');
      setAssets(res.data);
    } catch (err) {
      console.error('Failed to fetch assets:', err);
    }
  };

  const handleAdd = asset => setAssets([...assets, asset]);

  const handleDelete = async id => {
    await api.delete(`/assets/${id}`);
    setAssets(assets.filter(a => a._id !== id));
  };

  const handleUpdate = (updatedAsset) => {
    setAssets(prev =>
      prev.map(asset => (asset._id === updatedAsset._id ? updatedAsset : asset))
    );
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={localStorage.getItem("token") ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Detailed Finance Dashboard */}
        <Route
          path="/finance"
          element={
            <PrivateRoute>
              <div>
                <h1>Personal Finance Tracker</h1>
                <Dashboard assets={assets} />
                <PortfolioChart assets={assets} />
                <AssetForm onAssetAdded={handleAdd} />
                <AssetList assets={assets} onDelete={handleDelete} onUpdate={handleUpdate} />
              </div>
            </PrivateRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
