"use client";
import React from "react";

export function NavigationBar({ currentPage, onPageChange }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-solid bg-white">
      <img
        alt="Progress Tracker"
        src="https://students.masaischool.com/static/media/masai-logo.e5c8801d4f26d2da036ec9e4b93cb202.svg"
        className="h-10"
      />
      <div className="flex gap-4">
        <button
          className="px-4 py-2 font-medium text-blue-700 rounded-lg"
          onClick={() => onPageChange("login")}
        >
          Login
        </button>
        <button
          className="px-4 py-2 font-medium bg-blue-700 rounded-lg text-white"
          onClick={() => onPageChange("signup")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
