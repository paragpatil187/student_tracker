import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Lecture from "@/models/Lecture";
import { adminAuthMiddleware } from "@/middleware/adminAuth";

export async function POST(request) {
  await adminAuthMiddleware(request);

  try {
    await dbConnect();
    const lectureData = await request.json();
    const lecture = await Lecture.create(lectureData);
    return NextResponse.json(lecture, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await adminAuthMiddleware(request);

  try {
    await dbConnect();
    const { lectureId, updates } = await request.json();
    const lecture = await Lecture.findByIdAndUpdate(lectureId, updates, {
      new: true,
    });
    return NextResponse.json(lecture);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  await adminAuthMiddleware(request);

  try {
    await dbConnect();
    const { lectureId } = await request.json();
    await Lecture.findByIdAndDelete(lectureId);
    return NextResponse.json({ message: "Lecture deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
