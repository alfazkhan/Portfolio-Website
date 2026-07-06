/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "./dist",
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["100.66.86.67", "192.168.0.246"],
  reactStrictMode: false,
};

export default nextConfig;
