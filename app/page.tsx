import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Jueun Grace Yun'
};

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center gap-8 flex-1'>
			<div className='w-full sm:w-[500px] flex items-center justify-center text-center opacity h-[323px]'>
				<Image
					src='/cooper-louie.svg'
					alt='A doodle of me and my two puppies, Cooper and Louie'
					width={500}
					height={323}
					priority
				/>
			</div>

			<div className='max-w-[500px] opacity-75'>
				<p>
					I'm a product-minded software engineer based in Brooklyn, NY.
					<br />
					I've been working on{' '}
					<Link href='/projects#dotelier'>8-bit style pixel icon generation</Link> powered by my
					fine-tuned flux.1 model, and am a contributor to Vercel's{' '}
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
