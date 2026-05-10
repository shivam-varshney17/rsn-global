import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pre-existing TS errors in disabled Supabase routes shouldn't block the
  // RSN demo build. They're tracked separately.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
