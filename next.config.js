/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.cybercook.com.br",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
