export function LoadingPage() {
	return (
		<div className='w-full h-screen flex flex-col justify-center items-center'>
			<div className=''>
				<div className='flex animate-pulse text-center items-center justify-center h-32 w-32 border-4 border-secondary rounded-full'>
					Loading...
				</div>
			</div>
		</div>
	);
}
