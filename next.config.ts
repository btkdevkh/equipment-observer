import type { NextConfig } from "next";

// const mode = process.env.NODE_ENV !== "development" ? "/equipmentobs" : "";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  // IMPORTANT pour servir l'app dans /equipmentobs
  // basePath: mode,
  // assetPrefix: mode,
  images: {
    loader: "default", // ou 'imgix', 'cloudinary', etc.
    path: "/", // permet d'utiliser des images depuis /public
  },
};

export default nextConfig;
