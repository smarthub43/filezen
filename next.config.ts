import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Tell Next.js to not bundle these heavy packages
  serverExternalPackages: ["pdfjs-dist"],

  // 2. Keep the Webpack fix for canvas
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false; // Also ignore 'encoding' if it asks
    return config;
  },
};

export default nextConfig;