// src/components/ProfileSection.jsx
import { useEffect, useState } from "react";
import api from "../api";

const ProfileSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
      <h3>👤 My Profile</h3>
      <p><strong>Name:</strong> {user.name || "N/A"}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ProfileSection;
