// src/components/AdminSidebar.jsx
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#f1f1f1",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2>Admin Panel</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/categories">Categories</Link>
        </li>
        <li>
          <Link to="/admin/tags">Tags</Link>
        </li>
        <li>
          <Link to="/admin/articles">Articles</Link>
        </li>
      </ul>
    </div>
  );
}
