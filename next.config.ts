import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  images: {
    loader: "default", // ou 'imgix', 'cloudinary', etc.
    path: "/", // permet d'utiliser des images depuis /public
  },
};

export default nextConfig;
