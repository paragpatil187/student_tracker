/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        "images.pexels.com",
        "lh3.googleusercontent.com", // For Google profile images
      ],
    },
    env: {
      // NEXT_PUBLIC_* variables are automatically exposed to the browser.
      // So setting NEXT_PUBLIC_APP_URL here is optional if already in .env
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL,
    },
  };
  
  module.exports = nextConfig;
  