const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['gray-matter'],
  },
};

module.exports = withNextIntl(nextConfig);
