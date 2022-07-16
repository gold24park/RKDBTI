/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 5000,
  images: {
    domains: ["via.placeholder.com", "imgfiles-cdn.plaync.com", "camo.githubusercontent.com"]
  }
}

module.exports = nextConfig
