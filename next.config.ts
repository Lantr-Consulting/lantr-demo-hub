import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // English moved from /en to the site root (Chinese now lives at /zh);
    // keep old /en links working.
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
