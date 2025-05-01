"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../lib/redux/hooks";
import { fetchLectures } from "../lib/redux/features/lectureSlice";
import { fetchNotes } from "../lib/redux/features/noteSlice";
import { fetchProgress } from "../lib/redux/features/progressSlice";
import { fetchSubmissions } from "../lib/redux/features/submissionSlice";
import { selectAuth } from "../lib/redux/features/authSlice";
import { selectProgressStats } from "../lib/redux/features/progressSlice";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const progressStats = useAppSelector(selectProgressStats);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchLectures());
      dispatch(fetchNotes());
      dispatch(fetchProgress(user._id));
      dispatch(fetchSubmissions(user._id));
    }
  }, [dispatch, user]);

  const quickActions = [
    {
      title: "Continue Learning",
      description: "Resume your last lecture",
      icon: "📚",
      action: () => router.push("/lectures"),
    },
    {
      title: "View Notes",
      description: "Access study materials",
      icon: "📝",
      action: () => router.push("/notes"),
    },
    {
      title: "Check Submissions",
      description: "Track your assignments",
      icon: "📤",
      action: () => router.push("/submissions"),
    },
    {
      title: "View Progress",
      description: "See your achievements",
      icon: "📊",
      action: () => router.push("/progress"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Welcome back, {user?.name}!
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Here's an overview of your learning progress
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Points
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {progressStats.totalPoints}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">✅</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Completed Items
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {progressStats.completedItems}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">📈</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Completion Rate
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {Math.round(
                          (progressStats.completedItems /
                            progressStats.totalItems) *
                            100,
                        )}
                        %
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Streak
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        5 days
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="relative bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-3xl mb-3">{action.icon}</div>
                  <h4 className="text-lg font-semibold">{action.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {action.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h3>
            <div className="mt-4 bg-white shadow rounded-lg">
              <ul className="divide-y divide-gray-200">
                <li className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Completed Introduction to React
                      </p>
                      <p className="text-sm text-gray-500">Earned 50 points</p>
                    </div>
                    <div className="text-sm text-gray-500">2 hours ago</div>
                  </div>
                </li>
                <li className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">📝</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Submitted JavaScript Assignment
                      </p>
                      <p className="text-sm text-gray-500">
                        Waiting for review
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">1 day ago</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Learning Path Progress */}
          <div className="mt-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Learning Path Progress
            </h3>
            <div className="mt-4 bg-white shadow rounded-lg p-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Frontend Development
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      60%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: "60%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
