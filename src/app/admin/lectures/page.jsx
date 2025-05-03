"use client";

import { useState, useEffect } from "react";

export default function AdminLectures() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
    points: "",
    category: "",
    order:"",
  });

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/lectures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newLecture = await response.json();
        setLectures([...lectures, newLecture]);
        setFormData({
          title: "",
          description: "",
          videoUrl: "",
          duration: "",
          points: "",
          category: "",
          order:"",
        });
      }
    } catch (error) {
      console.error("Error creating lecture:", error);
    }
  };

  const handleDelete = async (lectureId) => {
    if (!confirm("Are you sure you want to delete this lecture?")) return;

    try {
      const response = await fetch("/api/admin/lectures", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lectureId }),
      });

      if (response.ok) {
        setLectures(lectures.filter((lecture) => lecture._id !== lectureId));
      }
    } catch (error) {
      console.error("Error deleting lecture:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Lecture Management</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Lecture</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Video URL
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700">Order</label>
  <input
    type="text"
    value={formData.order}
    onChange={(e) =>
      setFormData({ ...formData, order: e.target.value })
    }
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
    required
  />
</div>
            <div>
  <label className="block text-sm font-medium text-gray-700">Category</label>
  <input
    type="text"
    value={formData.category}
    onChange={(e) =>
      setFormData({ ...formData, category: e.target.value })
    }
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
    required
  />
</div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Points
              </label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) =>
                  setFormData({ ...formData, points: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Lecture
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lectures.map((lecture) => (
              <tr key={lecture._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {lecture.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {lecture.duration} minutes
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {lecture.points} points
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(lecture._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
