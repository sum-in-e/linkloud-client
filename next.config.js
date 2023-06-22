/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NEXT_PUBLIC_MODE === 'development', // disable is help to disable PWA in deployment mode
});

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/kloud',
        destination: '/kloud/all',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dqcgvbbv7/image/upload/v1686554950/linkloud/**',
      },
    ],
  },
};

const sentryConfig = {
  hideSourceMaps: true,
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true,
  silent: true,
  disableLogger: true, // Automatically tree-shake Sentry logger statements to reduce bundle size
  org: 'linkloud',
  project: 'linkloud-client',
};

module.exports = withSentryConfig(withPWA(nextConfig), sentryConfig);
