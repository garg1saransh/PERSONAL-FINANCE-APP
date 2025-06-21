// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import api from "../api";
import AssetForm from "../components/AssetForm";
import AssetList from "../components/AssetList";
import PortfolioChart from "../components/PortfolioChart";
import ProfileSection from "../components/ProfileSection";

const UserDashboard = () => {
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    try {
      const res = await api.get("/assets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAssets(res.data);
    } catch (err) {
      console.error("Failed to fetch assets", err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleAdd = asset => setAssets([...assets, asset]);
  const handleDelete = id => {
    api.delete(`/assets/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setAssets(assets.filter(a => a._id !== id));
  };

  const handleUpdate = updatedAsset => {
    setAssets(prev =>
      prev.map(a => (a._id === updatedAsset._id ? updatedAsset : a))
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <ProfileSection />
      <h2>Welcome to Your Dashboard</h2>
      <p>Total Assets: {assets.length}</p>
      <PortfolioChart assets={assets} />
      <AssetForm onAssetAdded={handleAdd} />
      <AssetList assets={assets} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default UserDashboard;
