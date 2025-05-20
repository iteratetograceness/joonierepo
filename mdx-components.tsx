import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		strong: ({ children }) => <b className='font-semibold'>{children}</b>,
		h1: ({ children }) => <h1 className='text-2xl font-semibold text-accent my-4'>{children}</h1>,
		h2: ({ children }) => <h2 className='text-xl font-medium my-4'>{children}</h2>
	};
}

/**
 * Handwritten motifs = logo, h1's
 * Maybe consider SVG animating the logo or h1's: e.g. https://hellodani.co/ (on nav)
 *
 * Not a fan of footer position and sizing
 */
