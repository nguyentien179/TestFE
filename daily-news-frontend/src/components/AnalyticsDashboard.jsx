import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../services/analyticsService";

const StatCard = ({ label, value }) => (
  <div className="p-4 rounded-xl shadow bg-white">
    <h4 className="text-gray-500">{label}</h4>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Total Articles" value={stats.totalArticles} />
        <StatCard label="Total Comments" value={stats.totalComments} />
        <StatCard label="Pending Comments" value={stats.pendingComments} />
      </div>

      {/* Articles Per Category */}
      <div>
        <h3 className="text-xl font-bold mb-2">Articles Per Category</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {stats.articlesPerCategory.map((cat) => (
            <li
              key={cat.name}
              className="bg-gray-100 p-3 rounded-lg flex justify-between"
            >
              <span>{cat.name}</span>
              <span>{cat._count.articles}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Tags */}
      <div>
        <h3 className="text-xl font-bold mb-2">Top Tags</h3>
        <ul className="flex flex-wrap gap-2">
          {stats.topTags.map((tag) => (
            <span
              key={tag.name}
              className="px-3 py-1 bg-blue-100 rounded-full text-sm"
            >
              {tag.name} ({tag._count.articles})
            </span>
          ))}
        </ul>
      </div>

      {/* Recent Signups */}
      <div>
        <h3 className="text-xl font-bold mb-2">Recent Signups</h3>
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentSignups.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Articles */}
      <div>
        <h3 className="text-xl font-bold mb-2">Top Articles (by Comments)</h3>
        <ul className="space-y-2">
          {stats.topArticles.map((article) => (
            <li
              key={article.id}
              className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{article.title}</p>
                <p className="text-sm text-gray-500">
                  {article._count.comments} comments ·{" "}
                  {article._count.bookmarks} bookmarks
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
