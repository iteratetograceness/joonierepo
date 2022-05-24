/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self' vitals.vercel-insights.com;
  font-src 'self' fonts.gstatic.com;  
  connect-src 'self' https://vitals.vercel-insights.com;
`

const headers = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
]

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
  headers: async () => [
    {
      source: '/:path*',
      headers,
    },
  ],
  // experimental: {
  //   lodash: {
  //     transform: 'lodash/{{member}}',
  //   },
  // },
}

module.exports = nextConfig
