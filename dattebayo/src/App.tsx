import React from "react";
import "./App.css";
import { FeaturedCard } from "./components/Cards/FeaturedCards/FeaturedCard";
import { useQuery } from "@tanstack/react-query";
import { getAllManga } from "./services/api";

function App() {
	const retrievedManga = useQuery({
		queryKey: ["manga"],
		queryFn: () => getAllManga("featured"),
	});

	if (retrievedManga.isLoading)
		return <h1 className='flex justify-center content-center'>Loading...</h1>;

	if (retrievedManga.error)
		return (
			<h1 className='flex justify-center content-center'>
				An error has occured
			</h1>
		);

	console.log(retrievedManga.data?.length);
	return (
		<>
			<h1 className='ml-6'>Featured</h1>
			<div
				id='overflowContainer'
				className='flex overflow-x-scroll'>
				<div
					id='featuredCardContainer'
					className='flex'>
					{retrievedManga.data?.map((featuredManga) => {
						return <FeaturedCard {...featuredManga} />;
					})}
				</div>
			</div>
		</>
	);
}

export default App;
