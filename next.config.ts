import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  async rewrites() {
    return [
      { source: "/game", destination: "/game/index.html" },
      { source: "/game/", destination: "/game/index.html" },
      {
        source: "/images/qulipta-game/:path*",
        destination: "/game/images/:path*",
      },
      {
        source: "/images/:path*",
        destination: "/game/images/:path*",
      },
    ];
  },
};

export default nextConfig;
