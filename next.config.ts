import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: [process.env.NEXT_PUBLIC_API_URL?.replace(/^https?:\/\//, "") || "fakestoreapi.com"],
  },
};

export default nextConfig;
