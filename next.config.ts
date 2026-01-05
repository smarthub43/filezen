import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // This tells Next.js to ignore the 'canvas' module during build
    config.resolve.alias.canvas = false;
    
    return config;
  },
};

export default nextConfig;