import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";

export function HorizontalScroll({
	children,
}: {
	children: JSX.Element[] | undefined;
}) {
	return (
		<>
			<div
				id='overflowContainer'
				className='flex overflow-x-scroll w-full'>
				<LeftCircleFilled className='absolute flex self-center text-4xl text-main z-30' />
				{children}
				<RightCircleFilled className='absolute right-0 mr-9 flex self-center text-4xl text-main ' />
			</div>
		</>
	);
}
