import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/nick-mariel-wedding.firebasestorage.app/o/**",
      },
    ],
  },
};

export default nextConfig;
