/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production"?"export":"standalone",
  distDir: "./dist",
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    unoptimized: process.env.NODE_ENV === "production",
  },
  allowedDevOrigins: ["100.66.86.67", "192.168.0.246"],
  reactStrictMode: false,
};

export default nextConfig;
