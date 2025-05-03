"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Students", href: "/students" },
    { name: "Attendance", href: "/attendance" },
    { name: "Submissions", href: "/submissions" },
    { name: "Reports", href: "/reports" },
  ];

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Progress Tracker"
              />
            </Link>
            {session && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      pathname === item.href
                        ? "border-b-2 border-indigo-500 text-gray-900"
                        : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
