/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'production-next-images-cdn.thumbtack.com',
      },
    ],
  },
};

module.exports = nextConfig;
