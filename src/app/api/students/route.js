import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Progress from '@/models/Progress';
import PointsHistory from '@/models/PointsHistory';

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

    // Get user data with progress and points
    const user = await User.findById(userId).select('-password');
    const progress = await Progress.find({ userId });
    const pointsHistory = await PointsHistory.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10);

    // Calculate statistics
    const stats = {
      totalPoints: user.points,
      completedItems: progress.filter(p => p.completed).length,
      totalItems: progress.length,
      recentActivities: pointsHistory,
    };

    return NextResponse.json({
      user,
      stats,
      progress,
      pointsHistory,
    });
  } catch (error) {
    console.error('Error fetching student data:', error);
    return NextResponse.json(
      { message: 'Error fetching student data' },
      { status: 500 }
    );
  }
}