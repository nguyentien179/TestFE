import React from "react";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

const AdminHome = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Analytics</h1>
      <AnalyticsDashboard />
    </div>
  );
};

export default AdminHome;
