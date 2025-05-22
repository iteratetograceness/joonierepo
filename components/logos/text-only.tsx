export function TextOnlyLogo({ text }: { text: string }) {
	return (
		<div className='font-bold text-2xl mt-8 opacity-80' id={text.toLowerCase()}>
			{text}
		</div>
	);
}
