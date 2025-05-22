export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-full flex flex-col items-center justify-center py-10'>
			<div className='w-full md:w-[55ch]'>{children}</div>
		</div>
	);
}
