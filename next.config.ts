import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Report screenshots are uploaded to Supabase Storage, which serves them
    // from <project-ref>.supabase.co. Scoped to that host rather than "**" so a
    // malicious screenshot_url cannot turn our optimizer into an open proxy.
    remotePatterns: [
      {
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/**",
        protocol: "https",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
