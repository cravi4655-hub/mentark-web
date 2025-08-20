// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      "http://localhost:3000",
      "http://192.168.1.3:3000" // your LAN IP
    ],
  },
};

module.exports = nextConfig;
