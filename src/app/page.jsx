"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../app/lib/redux/hooks";
import { fetchLectures } from "../app/lib/redux/features/lectureSlice";
import { fetchNotes } from "../app/lib/redux/features/noteSlice";
import { selectAuth } from "../../src/app/lib/redux/features/authSlice";
import { selectProgressStats } from "../app/lib/redux/features/progressSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(selectAuth);
  const progressStats = useAppSelector(selectProgressStats);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchLectures());
      dispatch(fetchNotes());
    }
  }, [isAuthenticated, dispatch]);

  const features = [
    {
      title: "Interactive Lectures",
      description:
        "Access high-quality video lectures with interactive elements",
      icon: "🎥",
    },
    {
      title: "Comprehensive Notes",
      description: "Study detailed notes and documentation for each topic",
      icon: "📝",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning progress and earn points",
      icon: "📊",
    },
    {
      title: "Instant Feedback",
      description: "Get immediate feedback on your submissions",
      icon: "✅",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Master Your Learning Journey</span>
              <span className="block text-blue-600">Track Your Progress</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Comprehensive learning platform with interactive lectures,
              detailed notes, and progress tracking.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              {!isAuthenticated ? (
                <>
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => router.push("/login")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </button>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => router.push("/signup")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              ) : (
                <div className="rounded-md shadow">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg text-3xl">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {isAuthenticated && (
        <section className="bg-blue-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Your Learning Progress
              </h2>
              <p className="mt-3 text-xl text-blue-200">
                Track your achievements and keep moving forward
              </p>
            </div>
            <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                  Total Points
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">
                  {progressStats.totalPoints}
                </dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                  Completed Items
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">
                  {progressStats.completedItems}
                </dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                  Completion Rate
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">
                  {Math.round(
                    (progressStats.completedItems / progressStats.totalItems) *
                      100,
                  )}
                  %
                </dd>
              </div>
            </dl>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-600">
              Start your learning journey today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            {!isAuthenticated ? (
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={() => router.push("/signup")}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get started
                </button>
              </div>
            ) : (
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={() => router.push("/lectures")}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Continue Learning
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
