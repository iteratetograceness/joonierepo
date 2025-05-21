import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Jueun Grace Yun'
};

export default function Home() {
	return (
		<div className='w-full flex flex-col items-center'>
			<div className='size-[500px] flex items-center justify-center text-center opacity-75'>
				[Doodle Work In Progress]
			</div>

			<div className='max-w-[500px]'>
				<p>
					I'm a product-minded software engineer based in Brooklyn, NY. I've been working on{' '}
					<Link href='/projects#dotelier'>8-bit style pixel icon generation</Link> powered by my
					fine-tuned flux.1 model, and am a core contributor to Vercel's{' '}
					<Link href='/projects#ai-sdk'>AI SDK</Link>.
				</p>

				<br />

				<p>
					I'm currently open to exploring new opportunities in the AI/startup/developer tooling
					space.
				</p>
			</div>
		</div>
	);
}
