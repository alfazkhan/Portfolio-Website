const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProd ? "export" : "standalone",
  distDir: "./dist",
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    unoptimized: isProd,
  },
  allowedDevOrigins: [
    "100.66.86.67",
    "192.168.0.246",
    "2subs2learn.localhost",
    "*.localhost",
  ],
  reactStrictMode: false,
  ...(!isProd && {
    async rewrites() {
      return {
        beforeFiles: [
          {
            source: "/",
            has: [
              {
                type: "host",
                value: "2subs2learn\\.localhost",
              },
            ],
            destination: "/2subs2learn",
          },
        ],
      };
    },
  }),
};

export default nextConfig;
