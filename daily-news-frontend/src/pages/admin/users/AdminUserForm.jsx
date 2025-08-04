import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authAxios from "../../../utils/authAxios";

export default function AdminUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "USER",
  });

  useEffect(() => {
    if (id) {
      authAxios.get(`/users/${id}`).then((res) => {
        setUser(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await authAxios.put(`/users/${id}`, user);
    } else {
      await authAxios.post("/users", user);
    }
    navigate("/admin/users");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit User" : "Create User"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="USER">USER</option>
          <option value="EDITOR">EDITOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
