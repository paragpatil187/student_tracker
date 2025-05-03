"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export function NoteCard({ note }) {
  const { data: session } = useSession();
  const [isCompleted, setIsCompleted] = useState(false);

  const markAsCompleted = async () => {
    try {
      const response = await fetch("/api/progress", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId: note._id,
          contentType: "note",
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <span>{note.readTime} min read</span>
        <span>{note.points} points</span>
      </div>
      <div className="prose prose-sm max-w-none mb-4">
        <p>{note.content.substring(0, 150)}...</p>
      </div>
      <div className="flex items-center justify-between mt-4">
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
  );
}
