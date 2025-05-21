import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	experimental: {
		viewTransition: true,
		reactCompiler: true,
		typedRoutes: true
	}
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: []
	}
});

export default withMDX(nextConfig);
