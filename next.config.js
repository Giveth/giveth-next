const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  // Uncomment this to allow eslint on build
  // experimental: {
  //   eslint: true,
  // },
  async headers() {
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
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: config => {
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
      'ipfs.giveth.io',
      'static.tgbwidget.com',
      'tgb-production-static.s3.us-east-1.amazonaws.com'
    ]
  },
  poweredByHeader: false
  // cleanDistDir: false,
})
