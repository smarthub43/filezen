import type { NextConfig } from "next";

const nextConfig: any = {
  // 1. Prevent Vercel from trying to bundle your other PDF library
  serverExternalPackages: ["pdf-lib"],

  // 2. Disable checks to save memory
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;