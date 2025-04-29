import React from "react";

export function LandingPage() {
  return (
    <main className="px-6 py-12 mx-auto my-0 text-center max-w-[1200px]">
      <h1 className="mb-6 text-5xl font-bold text-gray-900">
        Track Student Progress with Ease
      </h1>
      <p className="mb-12 text-lg text-gray-500">
        Comprehensive student tracking system for educators and administrators
      </p>
      <section className="grid gap-8 mt-12 grid-cols-[repeat(3,1fr)]">
        <article className="p-6 text-left bg-gray-50 rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Real-time Tracking</h3>
          <p>Monitor student progress and performance in real-time</p>
        </article>
        <article className="p-6 text-left bg-gray-50 rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Detailed Analytics</h3>
          <p>Get comprehensive insights into student performance</p>
        </article>
        <article className="p-6 text-left bg-gray-50 rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Easy Management</h3>
          <p>Streamlined interface for managing student data</p>
        </article>
      </section>
    </main>
  );
}
