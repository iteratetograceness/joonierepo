import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

// Content Security Policy. 'unsafe-inline' is required for scripts/styles because
// Next.js and Tailwind inject inline bootstrap scripts and style tags, and this
// static site renders no nonce (that would force dynamic rendering via middleware).
// Vercel Analytics loads its script from va.vercel-scripts.com and reports to
// vitals.vercel-insights.com.
const csp = [
	"default-src 'self'",
	"base-uri 'self'",
	"font-src 'self' data:",
	"form-action 'self'",
	"frame-ancestors 'none'",
	"img-src 'self' data:",
	"object-src 'none'",
	"script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
	"style-src 'self' 'unsafe-inline'",
	"connect-src 'self' https://vitals.vercel-insights.com",
	'upgrade-insecure-requests'
].join('; ');

const securityHeaders = [
	{ key: 'Content-Security-Policy', value: csp },
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'X-Frame-Options', value: 'DENY' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload'
	}
];

const nextConfig: NextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	reactCompiler: true,
	typedRoutes: true,
	experimental: {
		viewTransition: true
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: securityHeaders
			}
		];
	}
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
	options: {
		remarkPlugins: ['remark-gfm'],
		rehypePlugins: []
	}
});

export default withMDX(nextConfig);
