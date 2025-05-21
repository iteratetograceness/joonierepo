export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-full flex flex-col items-center justify-center py-10'>
			<div className='w-[55ch]'>{children}</div>
		</div>
	);
}
