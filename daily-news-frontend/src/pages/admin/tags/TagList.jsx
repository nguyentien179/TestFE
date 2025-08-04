// src/pages/admin/tags/TagList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authAxios from "../../../utils/axios.js";

export default function TagList() {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    try {
      const res = await authAxios.get("/tags");
      setTags(res.data);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  const deleteTag = async (id) => {
    if (!window.confirm("Delete this tag?")) return;
    try {
      await authAxios.delete(`/tags/${id}`);
      fetchTags();
    } catch (err) {
      console.error("Error deleting tag:", err);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tags</h1>
      <Link
        to="/admin/tags/create"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        + New Tag
      </Link>
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">Name</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td className="border px-2 py-1">{tag.name}</td>
              <td className="border px-2 py-1 text-center">
                <Link
                  to={`/admin/tags/edit/${tag.id}`}
                  className="text-blue-600 underline mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteTag(tag.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
