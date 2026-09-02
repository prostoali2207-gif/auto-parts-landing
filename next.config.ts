import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/proof/video", destination: "/proof/supplier-walkthrough-8s.mp4" },
      { source: "/proof/poster", destination: "/proof/supplier-environment-mobile.webp" },
      { source: "/proof/photo-desktop", destination: "/proof/supplier-environment-desktop.webp" },
      { source: "/proof/photo-mobile", destination: "/proof/supplier-environment-mobile.webp" },
    ];
  },
};

export default nextConfig;
