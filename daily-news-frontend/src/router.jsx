// src/router.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminArticleList from "./pages/admin/articles/AdminArticleList";
import AdminArticleForm from "./pages/admin/articles/AdminArticleForm";
import CategoryList from "./pages/admin/categories/CategoryList";
import CategoryForm from "./pages/admin/categories/CategoryForm";
import TagList from "./pages/admin/tags/TagList";
import TagForm from "./pages/admin/tags/TagForm";
import AdminLayout from "./components/AdminLayout";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="/admin/articles"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "EDITOR"]}>
                  <AdminArticleList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles/create"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "EDITOR"]}>
                  <AdminArticleForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "EDITOR"]}>
                  <AdminArticleForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "EDITOR"]}>
                  <AdminArticleForm />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <CategoryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories/create"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <CategoryForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <CategoryForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tags"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <TagList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tags/create"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <TagForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tags/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <TagForm />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}
