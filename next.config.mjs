/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://chohyunjung0107.github.io/2024-project/"
      : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
