import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		strong: ({ children }) => <b className='font-semibold'>{children}</b>,
		h1: ({ children }) => <h1 className='text-2xl font-semibold text-accent my-4'>{children}</h1>,
		h2: ({ children }) => <h2 className='text-xl font-medium my-4'>{children}</h2>
	};
}
