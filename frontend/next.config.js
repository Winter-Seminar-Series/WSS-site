/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['https://wss-sharif.com', 'http://frontend:3000'],
    },
  },
};

module.exports = nextConfig;
