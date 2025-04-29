"use client";

import { useEffect, useState } from "react";
import { NoteCard } from "@/components/notes/NoteCard";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("/api/notes");
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Study Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}
