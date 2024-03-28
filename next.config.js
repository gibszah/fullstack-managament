const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/736x/f1/8b/97/f18b97cb56595a0e8761282ca5ef5c07.jpg",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
