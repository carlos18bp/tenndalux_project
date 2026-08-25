import type { NextConfig } from "next";

// Dev-only: hosts allowed to fetch /_next/* resources (e.g. the VM IP when the
// browser runs outside the dev machine). Comma-separated, from .env.local.
const devOrigins = (process.env.NEXT_DEV_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(devOrigins.length ? { allowedDevOrigins: devOrigins } : {}),
};

export default nextConfig;
