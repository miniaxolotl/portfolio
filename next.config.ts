import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    inlineCss: true,
  },
  allowedDevOrigins: [
    "mawa.dev",
    "*.mawa.dev",
    "192.168.1.195",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
