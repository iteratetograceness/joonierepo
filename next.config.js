/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextSafe = require('next-safe')

const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
  swcMinify: true,
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: nextSafe({
          contentTypeOptions: 'nosniff',
          contentSecurityPolicy: {
            'base-uri': "'none'",
            'child-src': "'none'",
            'connect-src': "'self' ws://localhost:3000 https://vitals.vercel-insights.com/v1/vitals",
            'default-src': "'self'",
            'font-src': "'self' fonts.gstatic.com",
            'form-action': "'self'",
            'frame-ancestors': "'none'",
            'frame-src': "'none'",
            'img-src': "'self' data:",
            'manifest-src': "'self'",
            'media-src': "'self'",
            'object-src': "'none'",
            'prefetch-src': "'self'",
            'script-src': "'self' 'unsafe-inline'",
            'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
            'worker-src': "'self'",
            reportOnly: false,
          },
          frameOptions: 'DENY',
          permissionsPolicy: false,
          permissionsPolicyDirectiveSupport: ['proposed', 'standard'],
          isDev,
          referrerPolicy: 'no-referrer',
          xssProtection: '1; mode=block',
        }),
      },
    ]
  },
  productionBrowserSourceMaps: true,
  // experimental: {
  //   lodash: {
  //     transform: 'lodash/{{member}}',
  //   },
  // },
}

module.exports = nextConfig
