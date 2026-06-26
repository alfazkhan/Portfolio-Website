/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "./dist",
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
