await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

export default config;
