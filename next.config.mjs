/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites(){
        return [
            {
            source: "/api/:path*",
            destination: 'http://10.10.0.218/:path'
            }
        ]
    }
};

export default nextConfig;
