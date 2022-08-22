/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["avatars.githubusercontent.com", "zenn.dev", "api.iconify.design"],
    },
}

module.exports = nextConfig
