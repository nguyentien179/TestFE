import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authAxios from "../../../utils/axios.js";

export default function CategoryForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      authAxios.get(`/categories/${id}`).then((res) => setName(res.data.name));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };
    if (id) {
      await authAxios.put(`/categories/${id}`, data);
    } else {
      await authAxios.post("/categories", data);
    }
    navigate("/admin/categories");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit" : "Create"} Category</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} required />
      <button type="submit">Save</button>
    </form>
  );
}
