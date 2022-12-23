/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOST_NAME: process.env.HOST_NAME,
    HOST_NAME_API: process.env.HOST_NAME_API,
  },
};

module.exports = nextConfig;
