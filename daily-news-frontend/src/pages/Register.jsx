// src/pages/Register.jsx
import { useState } from "react";
import AuthInput from "../components/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.js";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      navigate("/login");
    } catch (err) {
      alert(err.message || "Register failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <AuthInput
          label="Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
