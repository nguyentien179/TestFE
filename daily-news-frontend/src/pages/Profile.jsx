// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import authAxios from "../utils/axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authAxios.get("/users/me");
        setProfile(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
        });
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAxios.put(`/users/${profile.id}`, formData);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled // don't allow email edit unless needed
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
