'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { updateProgress } from '@/lib/redux/features/progressSlice';
import { selectAuth } from '@/lib/redux/features/authSlice';

export default function LecturePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const videoRef = useRef(null);

  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchTime, setWatchTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(false);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await fetch(`/api/lectures/${params.lectureId}`);
        const data = await response.json();
        setLecture(data);
      } catch (error) {
        console.error('Error fetching lecture:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [params.lectureId]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setWatchTime(currentTime);

      // Mark as completed if watched 90% of the video
      if (!completed && (currentTime / duration) >= 0.9) {
        handleCompletion();
      }
    }
  };

  const handleCompletion = async () => {
    if (!completed && !pointsAwarded) {
      setCompleted(true);
      try {
        await dispatch(updateProgress({
          contentId: params.lectureId,
          contentType: 'lecture',
          completed: true
        })).unwrap();

        // Update user points
        const response = await fetch('/api/points/award', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user._id,
            points: lecture.points,
            activityType: 'lecture_completion',
            contentId: params.lectureId
          })
        });

        if (response.ok) {
          setPointsAwarded(true);
        }
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Lecture not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Video Player */}
          <div className="aspect-video relative">
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              onTimeUpdate={handleTimeUpdate}
              poster={lecture.thumbnail}
            >
              <source src={lecture.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Lecture Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{lecture.title}</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {Math.floor(lecture.duration / 60)} mins
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {lecture.points} points
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{lecture.description}</p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Math.round((watchTime / videoRef.current?.duration || 0) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.round((watchTime / videoRef.current?.duration || 0) * 100)}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Points Status */}
            {pointsAwarded && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🎉</span>
                  <div>
                    <h3 className="text-green-800 font-medium">
                      Congratulations!
                    </h3>
                    <p className="text-green-600">
                      You've earned {lecture.points} points for completing this lecture!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back to Lectures
              </button>
              {completed && (
                <button
                  onClick={() => router.push('/lectures')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next Lecture →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-2">Related Notes</h3>
              <ul className="space-y-2">
                {lecture.relatedNotes?.map((note) => (
                  <li key={note._id}>
                    <a
                      href={`/notes/${note._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {note.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-2">Practice Exercises</h3>
              <ul className="space-y-2">
                {lecture.exercises?.map((exercise) => (
                  <li key={exercise._id}>
                    <a
                      href={`/exercises/${exercise._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {exercise.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}