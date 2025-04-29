import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function adminAuthMiddleware(request) {
  const session = await getServerSession();

  if (!session?.user?.isAdmin) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 },
    );
  }
}
