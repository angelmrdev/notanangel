import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    // Keep static generation within shared hosting resource limits.
    cpus: 2,
    staticGenerationMaxConcurrency: 2,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
