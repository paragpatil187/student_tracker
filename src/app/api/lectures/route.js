import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import Lecture from "../../models/Lecture";

export async function GET() {
  try {
    await dbConnect();
    const lectures = await Lecture.find({}).sort({ createdAt: -1 });
    return NextResponse.json(lectures);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const lecture = await Lecture.create(data);
    return NextResponse.json(lecture, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
