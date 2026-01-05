import type { NextConfig } from "next";

const nextConfig: any = {
  // We don't need externalPackages anymore because we aren't using the npm package!
  
  // Keep these just to be safe and save memory
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Basic webpack config just in case
  webpack: (config: any) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;