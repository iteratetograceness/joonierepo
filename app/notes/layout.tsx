export default function NotesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-full flex flex-col items-center justify-center py-10'>
			<div className='max-w-prose'>{children}</div>
		</div>
	);
}
