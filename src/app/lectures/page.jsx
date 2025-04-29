"use client";

import { useEffect, useState } from "react";
import { LectureCard } from "@/components/lectures/LectureCard";

export default function LecturesPage() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLectures() {
      try {
        const response = await fetch("/api/lectures");
        if (response.ok) {
          const data = await response.json();
          setLectures(data);
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLectures();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Lectures</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <LectureCard key={lecture._id} lecture={lecture} />
        ))}
      </div>
    </div>
  );
}
