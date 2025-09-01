import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
      },
    ],
  },
  // Optimisations de production
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Configuration des chemins
  outputFileTracingRoot: process.cwd(),
  
  // Configuration ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration TypeScript  
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
