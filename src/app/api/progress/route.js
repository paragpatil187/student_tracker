import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import Progress from "../../models/Progress";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions"; // Import authOptions

// POST request to save progress
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions); // Use authOptions here

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();

    const progress = await Progress.create({
      ...data,
      userId: session.user.id,
    });

    return NextResponse.json(progress, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT request to update progress
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions); // Use authOptions here

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { contentId, contentType, completed } = await request.json();

    const progress = await Progress.findOneAndUpdate(
      {
        userId: session.user.id,
        contentId,
        contentType,
      },
      {
        completed,
        completedAt: completed ? new Date() : null,
        lastAccessedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET request to retrieve progress
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions); // Use authOptions here

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const progress = await Progress.find({ userId: session.user.id });
    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
