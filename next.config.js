/** @type {import('next').NextConfig} */

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
  // experimental: {
  //   lodash: {
  //     transform: 'lodash/{{member}}',
  //   },
  // },
}

module.exports = nextConfig
