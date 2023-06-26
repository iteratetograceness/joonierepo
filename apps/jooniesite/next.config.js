const nextConfig = {
	experimental: {
		appDir: true
	},
	images: {
		domains: ['images.ctfassets.net'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.ctfassets.net'
			}
		]
	}
};

module.exports = nextConfig;
