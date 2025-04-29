import React from "react";

export function DashboardSidebar() {
  return (
    <aside className="p-6 rounded-lg bg-white h-fit">
      <h2 className="mb-4 text-lg font-semibold">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <button className="px-4 py-2 text-left bg-gray-100 rounded-lg">
          Overview
        </button>
        <button className="px-4 py-2 text-left rounded-lg">Students</button>
        <button className="px-4 py-2 text-left rounded-lg">Reports</button>
        <button className="px-4 py-2 text-left rounded-lg">Settings</button>
      </nav>
    </aside>
  );
}
