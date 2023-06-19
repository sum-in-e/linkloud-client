/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/my',
        destination: '/my/all',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
