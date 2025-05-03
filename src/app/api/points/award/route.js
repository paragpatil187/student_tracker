import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import PointsHistory from '../../../models/PointsHistory';

export async function POST(request) {
  try {
    await dbConnect();

    const { userId, points, activityType, contentId } = await request.json();

    // Update user's points
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if points were already awarded for this content
    const existingPoints = await PointsHistory.findOne({
      userId,
      contentId,
      activityType,
    });

    if (existingPoints) {
      return NextResponse.json(
        { message: 'Points already awarded' },
        { status: 400 }
      );
    }

    // Add points to user
    user.points += points;
    await user.save();

    // Record points history
    await PointsHistory.create({
      userId,
      points,
      activityType,
      contentId,
    });

    return NextResponse.json({
      message: 'Points awarded successfully',
      newTotal: user.points,
    });
  } catch (error) {
    console.error('Error awarding points:', error);
    return NextResponse.json(
      { message: 'Error awarding points' },
      { status: 500 }
    );
  }
}