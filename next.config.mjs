/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "(전달받은 API 주소)/:path*",
      },
    ];
  },
};

export default nextConfig;
