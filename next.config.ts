import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"], // ✅ optimize to modern format

    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "**", // ✅ allow ANY external image (important)
      },
    ],
  },
};

export default nextConfig;