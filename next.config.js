/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.linkloud-client.vercel.app',
          },
        ],
        destination: 'linkloud-client.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
