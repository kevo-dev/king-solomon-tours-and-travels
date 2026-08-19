import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_ID: process.env.VITE_APP_ID ?? "",
    NEXT_PUBLIC_OAUTH_PORTAL_URL: process.env.VITE_OAUTH_PORTAL_URL ?? "",
    NEXT_PUBLIC_FORGE_API_KEY: process.env.VITE_FRONTEND_FORGE_API_KEY ?? "",
    NEXT_PUBLIC_FORGE_API_URL: process.env.VITE_FRONTEND_FORGE_API_URL ?? "",
  },
};

export default nextConfig;
