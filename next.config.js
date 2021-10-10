const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  // Uncomment this to allow eslint on build
  // experimental: {
  //   eslint: true,
  // },
  async headers () {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate'
          }
        ]
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })
    config.optimization = {
      ...config.optimization,
      sideEffects: true
    }
    return config
  },
  images: {
    domains: [
      'gateway.pinata.cloud',
      'imgur.com',
      'i.imgur.com',
      'feathers.beta.giveth.io',
      'feathers.giveth.io',
      'feathers.develop.giveth.io',
      'ipfs.giveth.io'
    ]
  },
  // cleanDistDir: false,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
})
