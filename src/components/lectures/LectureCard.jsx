"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function LectureCard({ lecture }) {
  const { data: session } = useSession();
  const [isCompleted, setIsCompleted] = useState(false);
 // Check if the lecture is already marked as completed by the current user
 useEffect(() => {
  if (session?.user?.id) {
    const checkCompletion = async () => {
      try {
        const response = await fetch(`/api/progress?contentId=${lecture._id}&contentType=lecture`);
        if (response.ok) {
          const progress = await response.json();
          const lectureProgress = progress.find(
            (item) => item.contentId.toString() === lecture._id.toString()
          );
          if (lectureProgress?.completed) {
            setIsCompleted(true); // Set the lecture as completed if found in progress
          }
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    checkCompletion();
  }
}, [session?.user?.id, lecture._id]);

  const markAsCompleted = async () => {
    try {
      const response = await fetch("/api/progress", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId: lecture._id,
          contentType: "lecture",
          completed: true,
        }),
      });

      if (response.ok) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={lecture.thumbnail || "/placeholder-video.jpg"}
          alt={lecture.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {Math.floor(lecture.duration / 60)}:
          {String(lecture.duration % 60).padStart(2, "0")}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{lecture.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{lecture.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600">{lecture.points} points</span>
          <button
            onClick={markAsCompleted}
            disabled={isCompleted}
            className={`px-4 py-2 rounded ${
              isCompleted
                ? "bg-green-100 text-green-800"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isCompleted ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      </div>
    </div>
  );
}
