import type { NextConfig } from "next";

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // Indicates a 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
