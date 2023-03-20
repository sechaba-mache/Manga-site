export function HorizontalScroll({
	children,
}: {
	children: JSX.Element[] | undefined;
}) {
	return (
		<div
			id='overflowContainer'
			className='flex overflow-x-scroll w-full'>
			<div
				id='featuredCardContainer'
				className='flex'>
				{children}
			</div>
		</div>
	);
}
