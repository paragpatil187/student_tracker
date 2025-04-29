import React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardStats } from "./DashboardStats";

export function DashboardLayout() {
  return (
    <main className="p-6 bg-gray-50 min-h-[calc(100vh_-_73px)]">
      <div className="grid gap-6 grid-cols-[250px_1fr]">
        <DashboardSidebar />
        <section className="p-6 rounded-lg bg-white">
          <h1 className="mb-6 text-2xl font-semibold">
            Student Progress Overview
          </h1>
          <DashboardStats />
        </section>
      </div>
    </main>
  );
}
