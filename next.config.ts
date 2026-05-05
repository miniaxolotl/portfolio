import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["mawa.dev", "*.mawa.dev", "localhost", "127.0.0.1"],
};

export default nextConfig;
