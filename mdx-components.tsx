import type { MDXComponents } from 'mdx/types';

const customComponents: MDXComponents = {
	strong: ({ children }) => <b className='font-semibold'>{children}</b>,
	h1: ({ children }) => <h1 className='text-2xl font-semibold text-accent my-4'>{children}</h1>,
	h2: ({ children }) => <h2 className='text-xl font-medium my-4'>{children}</h2>,
	p: ({ children }) => <p className='mt-4 opacity-75'>{children}</p>,
	ul: ({ children }) => <ul className='list-disc mt-4 opacity-75 pl-6'>{children}</ul>,
	li: ({ children }) => <li className='mt-1 pl-1'>{children}</li>
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		...customComponents
	};
}
