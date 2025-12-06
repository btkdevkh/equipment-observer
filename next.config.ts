import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  // IMPORTANT pour servir l'app dans /equipmentobs
  basePath: "/equipmentobs",
  assetPrefix: "/equipmentobs/",
  images: {
    loader: "default", // ou 'imgix', 'cloudinary', etc.
    path: "/equipmentobs", // permet d'utiliser des images depuis /public
  },
};

export default nextConfig;
