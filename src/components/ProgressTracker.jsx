"use client";
import React, { useState } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { LandingPage } from "./components/LandingPage";
import { LoginForm } from "./components/LoginForm";
import { DashboardLayout } from "./components/DashboardLayout";

function ProgressTracker() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  return (
    <div className="overflow-x-hidden relative min-h-screen bg-white">
      <NavigationBar currentPage={currentPage} onPageChange={setCurrentPage} />

      {currentPage === "landing" && <LandingPage />}

      {currentPage === "login" && <LoginForm onLogin={handleLogin} />}

      {currentPage === "dashboard" && <DashboardLayout />}
    </div>
  );
}

export default ProgressTracker;
