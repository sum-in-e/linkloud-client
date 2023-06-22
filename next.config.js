/** @type {import('next').NextConfig} */

const TerserPlugin = require('terser-webpack-plugin');
const { withSentryConfig } = require('@sentry/nextjs');

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
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        })
      );
    }
    return config;
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

module.exports = withSentryConfig(nextConfig, sentryConfig);
