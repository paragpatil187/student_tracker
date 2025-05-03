"use client";

import React from "react";

function AuthButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
}) {
  const baseStyles =
    "px-4 py-2 text-sm font-medium rounded cursor-pointer border-none transition-colors";

  const variantStyles = {
    primary: "bg-sky-400 text-black hover:bg-sky-300",
    secondary: "bg-zinc-700 text-white hover:bg-zinc-600",
    danger: "bg-red-500 text-white hover:bg-red-400",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${disabledStyles}`}
    >
      {children}
    </button>
  );
}

export default AuthButton;
