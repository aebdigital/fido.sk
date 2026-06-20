import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
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
