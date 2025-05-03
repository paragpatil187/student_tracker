import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Progress from '../../../models/Progress';
import Lecture from '../../../models/Lecture';
import Note from '../../../models/Note';

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

    // Get all content progress
    const progress = await Progress.find({ userId });

    // Get content details
    const lectures = await Lecture.find({
      _id: { $in: progress.map(p => p.contentId) }
    });

    const notes = await Note.find({
      _id: { $in: progress.map(p => p.contentId) }
    });

    // Combine progress with content details
    const detailedProgress = progress.map(p => {
      const content = p.contentType === 'lecture'
        ? lectures.find(l => l._id.toString() === p.contentId.toString())
        : notes.find(n => n._id.toString() === p.contentId.toString());

      return {
        ...p.toObject(),
        content,
      };
    });

    return NextResponse.json(detailedProgress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { message: 'Error fetching progress' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { userId, contentId, contentType, completed } = await request.json();

    const progress = await Progress.findOneAndUpdate(
      { userId, contentId },
      {
        userId,
        contentId,
        contentType,
        completed,
        completedAt: completed ? new Date() : null,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { message: 'Error updating progress' },
      { status: 500 }
    );
  }
}