import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
       
      },
       {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
