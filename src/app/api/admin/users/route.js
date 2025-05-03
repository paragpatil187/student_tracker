import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import { adminAuthMiddleware } from "../../../../middleware/adminAuth";

export async function GET(request) {
  await adminAuthMiddleware(request);

  try {
    await dbConnect();
    const users = await User.find({}).select("-password");
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await adminAuthMiddleware(request);

  try {
    await dbConnect();
    const { userId, updates } = await request.json();
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  await adminAuthMiddleware(request);

  try {
    await dbConnect();
    const { userId } = await request.json();
    await User.findByIdAndDelete(userId);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
