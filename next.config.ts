import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  eslint: {
    // ESLint runs as a separate, explicit CI step via `npm run lint`.
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fido.sk",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/**/*": ["./public/_mirror/**/*"],
  },
};

export default nextConfig;
