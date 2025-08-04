// src/pages/admin/AdminArticleList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authAxios from "../../../utils/axios.js";

export default function AdminArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    authAxios.get("/articles").then((res) => setArticles(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Articles</h2>
        <Link
          to="/admin/articles/create"
          className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
        >
          + New Article
        </Link>
      </div>

      <div className="space-y-4">
        {articles.map((a) => (
          <div key={a.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{a.title}</h3>
              <Link
                to={`/admin/articles/edit/${a.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              {a.content.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
