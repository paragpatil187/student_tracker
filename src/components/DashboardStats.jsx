import React from "react";

export function DashboardStats() {
  return (
    <section className="grid gap-6 mb-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      <article className="p-6 bg-gray-100 rounded-lg">
        <h3 className="mb-2 text-base font-medium">Total Students</h3>
        <p className="text-2xl font-semibold">150</p>
      </article>
      <article className="p-6 bg-gray-100 rounded-lg">
        <h3 className="mb-2 text-base font-medium">Average Score</h3>
        <p className="text-2xl font-semibold">85%</p>
      </article>
      <article className="p-6 bg-gray-100 rounded-lg">
        <h3 className="mb-2 text-base font-medium">Active Courses</h3>
        <p className="text-2xl font-semibold">12</p>
      </article>
    </section>
  );
}
