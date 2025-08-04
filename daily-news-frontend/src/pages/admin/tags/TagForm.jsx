// src/pages/admin/tags/TagForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authAxios from "../../../utils/axios.js";

export default function TagForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const fetchTag = async () => {
    try {
      const res = await authAxios.get(`/tags/${id}`);
      setName(res.data.name);
    } catch (err) {
      console.error("Error fetching tag:", err);
    }
  };

  useEffect(() => {
    if (isEditing) {
      fetchTag();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await authAxios.put(`/tags/${id}`, { name });
      } else {
        await authAxios.post("/tags", { name });
      }
      navigate("/admin/tags");
    } catch (err) {
      console.error("Error submitting tag:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {isEditing ? "Edit Tag" : "Create Tag"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Tag Name</label>
          <input
            type="text"
            className="border px-3 py-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : isEditing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
