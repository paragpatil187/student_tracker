import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { adminAuthMiddleware } from "@/middleware/adminAuth";

export async function POST(request) {
  await adminAuthMiddleware(request);

  try {
    await dbConnect();
    const noteData = await request.json();
    const note = await Note.create(noteData);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await adminAuthMiddleware(request);

  try {
    await dbConnect();
    const { noteId, updates } = await request.json();
    const note = await Note.findByIdAndUpdate(noteId, updates, { new: true });
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  await adminAuthMiddleware(request);

  try {
    await dbConnect();
    const { noteId } = await request.json();
    await Note.findByIdAndDelete(noteId);
    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
