import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import Progress from '../../../models/Progress';
import PointsHistory from '../../../models/PointsHistory';
import Lecture from '../../../models/Lecture';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user data
    const user = await User.findById(userId).select('-password');

    // Get progress statistics
    const progress = await Progress.find({ userId });
    console.log('Progress:', progress);  // Debug log for progress data
    const completedItems = progress.filter(p => p.completed === true).length;
    console.log('Completed Items:', completedItems);  // Debug log for completed items count

    // Get points history
    const pointsHistory = await PointsHistory.find({ userId })
      .sort({ timestamp: -1 })
      .limit(5);

    // Get recent lectures
    const recentLectures = await Lecture.find({
      _id: { $in: progress.map(p => p.contentId) }
    })
    .sort({ createdAt: -1 })
    .limit(3);

    // Get recommended content
    const completedContentIds = progress
      .filter(p => p.completed === true)
      .map(p => p.contentId);

    const recommendedLectures = await Lecture.find({
      _id: { $nin: completedContentIds },
      isPublished: true,
    })
    .limit(3);

    // Calculate learning streak
    const streak = calculateStreak(progress);

    return NextResponse.json({
      user,
      stats: {
        totalPoints: user.points,
        completedItems,
        totalItems: progress.length,
        streak,
      },
      recentActivity: pointsHistory,
      recentLectures,
      recommendedLectures,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { message: 'Error fetching dashboard data' },
      { status: 500 }
    );
  }
}

function calculateStreak(progress) {
  if (!progress.length) return 0;

  const today = new Date();
  const dates = progress
    .filter(p => p.completed)
    .map(p => new Date(p.completedAt))
    .sort((a, b) => b - a);

  let streak = 0;
  let currentDate = new Date(today);
  currentDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < dates.length; i++) {
    const progressDate = new Date(dates[i]);
    progressDate.setHours(0, 0, 0, 0);

    if (i === 0) {
      const diffDays = Math.floor((currentDate - progressDate) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) break;
      streak++;
    } else {
      const prevDate = new Date(dates[i - 1]);
      prevDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((prevDate - progressDate) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) break;
      streak++;
    }
  }

  return streak;
}
