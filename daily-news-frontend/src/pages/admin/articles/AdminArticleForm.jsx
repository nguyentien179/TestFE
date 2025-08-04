// src/pages/admin/AdminArticleForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authAxios from "../../../utils/axios.js";

export default function AdminArticleForm() {
  const { id } = useParams(); // if editing
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      authAxios.get(`/articles/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const uploadRes = await axios.post("/upload/image", formData);
      imageUrl = uploadRes.data.url;
    }

    const payload = {
      title,
      content,
      ...(imageUrl && { image: imageUrl }),
    };

    try {
      if (id) {
        await authAxios.put(`/articles/${id}`, payload);
      } else {
        await authAxios.post("/articles", payload);
      }
      navigate("/admin/articles");
    } catch (err) {
      alert("Error submitting article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">{id ? "Edit" : "Create"} Article</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={8}
        className="w-full p-2 border rounded"
        required
      />
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      <button
        disabled={loading}
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {loading ? "Submitting..." : id ? "Update Article" : "Create Article"}
      </button>
    </form>
  );
}
