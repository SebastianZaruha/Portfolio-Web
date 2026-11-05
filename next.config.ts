import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/contacto", destination: "/hablemos", permanent: false }];
  },
};

export default nextConfig;
