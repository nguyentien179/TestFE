import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/auth.js";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authService.getProfile();
        setUser(profile);
      } catch (err) {
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Left - Branding or Home */}
      <div className="text-xl font-semibold mb-2 md:mb-0">
        <Link to="/">Daily News</Link>
      </div>

      {/* Center - Navigation Links */}
      <div className="flex justify-center space-x-4 mb-2 md:mb-0">
        <Link to="/">Home</Link>
        <Link to="/top-headlines">Top Headlines</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/trending">Trending</Link>
      </div>

      {/* Right - Auth Section */}
      <div className="flex justify-end space-x-4">
        {user ? (
          <>
            <Link to="/profile">{user.name || user.email}</Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
