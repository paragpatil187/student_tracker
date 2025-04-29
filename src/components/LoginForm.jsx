"use client";
import React, { useState } from "react";

export function LoginForm({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <main className="flex flex-col items-center px-6 py-12 bg-gray-50 min-h-[calc(100vh_-_73px)]">
      <section className="px-10 py-8 w-full max-w-md rounded-lg bg-white shadow-[rgba(0,0,0,0.1)_0px_4px_12px]">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="px-3 py-2 w-full rounded-lg border border-gray-300 border-solid"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                className="px-3 py-2 w-full rounded-lg border border-gray-300 border-solid"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2/4 -translate-y-2/4 cursor-pointer border-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <span>Hide</span> : <span>Show</span>}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="p-3 mt-4 font-medium bg-blue-700 rounded-lg text-white"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
