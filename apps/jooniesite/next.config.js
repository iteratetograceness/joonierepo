const nextConfig = {
	experimental: {
		appDir: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.ctfassets.net',
				port: '3331',
				pathname: `/${process.env.CONTENTFUL_SPACE_ID}/**`
			}
		]
	}
};

module.exports = nextConfig;
