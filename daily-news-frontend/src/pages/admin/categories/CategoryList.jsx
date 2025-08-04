import { useEffect, useState } from "react";
import authAxios from "../../../utils/axios.js";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    authAxios.get("/categories").then((res) => setCategories(res.data));
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <button onClick={() => navigate("/admin/categories/create")}>
        + New
      </button>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}
            <button
              onClick={() => navigate(`/admin/categories/edit/${cat.id}`)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
