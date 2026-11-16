import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // SceneSKU placeholder catalogue. Add the Supabase storage host here later.
    remotePatterns: [{ protocol: "https", hostname: "cdn.scenesku.com", pathname: "/scene-packs/**" }],
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
