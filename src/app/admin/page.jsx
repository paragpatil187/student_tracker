"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLectures: 0,
    totalNotes: 0,
    completionRate: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-3xl font-semibold">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Lectures</h3>
          <p className="text-3xl font-semibold">{stats.totalLectures}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Notes</h3>
          <p className="text-3xl font-semibold">{stats.totalNotes}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Completion Rate</h3>
          <p className="text-3xl font-semibold">{stats.completionRate}%</p>
        </div>
      </div>
    </div>
  );
}
