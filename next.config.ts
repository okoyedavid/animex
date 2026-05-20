import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "myanimelist.net",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
    ],
  },
};

export default nextConfig;
