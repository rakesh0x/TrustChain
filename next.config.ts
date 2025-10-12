/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir must be enabled for /app routes
    appDir: true,
    // Disable Turbopack
    turbo: false,
  },
};

module.exports = nextConfig;
