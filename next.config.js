module.exports = {
  // Uncomment this to allow eslint on build
  // experimental: {
  //   eslint: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  images: {
    domains: [
      "gateway.pinata.cloud",
      "imgur.com",
      "i.imgur.com",
      "feathers.beta.giveth.io",
      "feathers.giveth.io",
      "feathers.develop.giveth.io",
      "ipfs.giveth.io",
    ],
  },
  cleanDistDir: false,
  webpack5: false,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
