import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Note from "@/models/Note";

export async function GET() {
  try {
    await dbConnect();
    const notes = await Note.find({}).sort({ createdAt: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const note = await Note.create(data);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
