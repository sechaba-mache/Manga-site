export function FeaturedCard() {
	return (
		<div className='featuredCard w-60 h-[23rem] bg-slate-900 shadow-xl rounded-xl'>
			<div className='cover flex justify-center content-center items-center w-full h-52 rounded-xl'>
				<img
					src='src/assets/Vol43.webp'
					alt='Shoes'
					className='rounded-xl w-44 h-44'
				/>
			</div>

			<div className='card-body items-center text-center'>
				<h1 className='card-title'>Shoes!</h1>
				<p className='mt-1'>If a dog chews shoes whose shoes does he choose?</p>
			</div>
		</div>
	);
}
