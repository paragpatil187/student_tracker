import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lecture from '@/models/Lecture';
import Progress from '@/models/Progress';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { lectureId } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const lecture = await Lecture.findById(lectureId)
      .populate('prerequisites')
      .populate('relatedNotes');

    if (!lecture) {
      return NextResponse.json(
        { message: 'Lecture not found' },
        { status: 404 }
      );
    }

    // If userId is provided, get progress
    let progress = null;
    if (userId) {
      progress = await Progress.findOne({
        userId,
        contentId: lectureId,
        contentType: 'lecture',
      });
    }

    return NextResponse.json({
      ...lecture.toObject(),
      progress: progress ? progress.toObject() : null,
    });
  } catch (error) {
    console.error('Error fetching lecture:', error);
    return NextResponse.json(
      { message: 'Error fetching lecture' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { lectureId } = params;
    const updateData = await request.json();

    const lecture = await Lecture.findByIdAndUpdate(
      lectureId,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );

    if (!lecture) {
      return NextResponse.json(
        { message: 'Lecture not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(lecture);
  } catch (error) {
    console.error('Error updating lecture:', error);
    return NextResponse.json(
      { message: 'Error updating lecture' },
      { status: 500 }
    );
  }
}