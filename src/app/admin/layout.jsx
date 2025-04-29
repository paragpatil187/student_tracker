"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isAdmin) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user?.isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <a
            href="/admin"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            Dashboard
          </a>
          <a
            href="/admin/users"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            Users
          </a>
          <a
            href="/admin/lectures"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            Lectures
          </a>
          <a
            href="/admin/notes"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            Notes
          </a>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
