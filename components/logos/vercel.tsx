export function VercelLogo({ text }: { text?: string }) {
	return (
		<div className='flex items-center gap-2 opacity-80 mt-8'>
			<svg width='28' height='32' viewBox='0 0 76 65' xmlns='http://www.w3.org/2000/svg'>
				<path d='M37.5274 0L75.0548 65H0L37.5274 0Z' fill='currentColor' />
			</svg>
			{text && (
				<>
					<span className='font-thin text-lg'>+</span>
					<span className='font-bold text-2xl'>{text}</span>
				</>
			)}
		</div>
	);
}
