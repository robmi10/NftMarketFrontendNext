/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.riv$/i,
      type: "asset/source",
    });

    return config;
  },
};
