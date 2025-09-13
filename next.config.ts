/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },

};

module.exports = nextConfig;