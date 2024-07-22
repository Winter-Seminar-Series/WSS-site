/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['wss-sharif.com', '127.17.0.1:3000'],
    },
  },
};

module.exports = nextConfig;
