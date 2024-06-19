/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "10.10.0.145/:path*",
      },
    ];
  },
};

export default nextConfig;
