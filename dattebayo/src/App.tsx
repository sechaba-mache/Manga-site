import React from "react";
import "./App.css";
import { FeaturedCard } from "./components/Cards/FeaturedCards/FeaturedCard";
import { useQuery } from "@tanstack/react-query";
import { getAllManga } from "./services/api";
import { NormalCard } from "./components/Cards/NormalCards/NormalCard";

function App() {
	const allFeaturedManga = useQuery({
		queryKey: ["featuredManga"],
		queryFn: () => getAllManga("featured"),
	});

	const allUnorderedManga = useQuery({
		queryKey: ["unorderedManga"],
		queryFn: () => getAllManga("unordered"),
	});

	if (allFeaturedManga.isLoading && allUnorderedManga.isLoading)
		return <h1 className='flex justify-center content-center'>Loading...</h1>;

	if (allFeaturedManga.error && allUnorderedManga.error)
		return (
			<h1 className='flex justify-center content-center'>
				An error has occured
			</h1>
		);

	return (
		<>
			<h1 className='ml-6'>Featured</h1>
			<div
				id='overflowContainer'
				className='flex overflow-x-scroll w-full'>
				<div
					id='featuredCardContainer'
					className='flex'>
					{allFeaturedManga.data?.map((featuredManga) => {
						return <FeaturedCard {...featuredManga} />;
					})}
				</div>
			</div>

			<h1 className='ml-11 mt-2'>Unordered</h1>
			<div className='flex flex-wrap ml-4'>
				{allUnorderedManga.data?.map((manga) => {
					return <NormalCard {...manga} />;
				})}
			</div>
		</>
	);
}

export default App;
