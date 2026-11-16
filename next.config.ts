import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating dev badge sits over the mobile buy bar and checkout button; keep previews honest.
  devIndicators: false,
  images: {
    // Placeholder catalogue + editorial imagery. Add the Supabase storage host here later.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.scenesku.com", pathname: "/scene-packs/**" },
      { protocol: "https", hostname: "cdn.dummyjson.com", pathname: "/product-images/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" },
    ],
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
