import React, { useState } from "react";
import "./App.css";
import { FeaturedCard } from "./components/Cards/FeaturedCards/FeaturedCard";
import { useQuery } from "@tanstack/react-query";
import { getAllManga } from "./services/api";
import { NormalCard } from "./components/Cards/NormalCards/NormalCard";
import { Outlet } from "react-router-dom";
import { HorizontalScroll } from "./components/HorizontalScroll";

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
		<div className='page'>
			<Outlet />
			<h1 className='ml-6'>Featured</h1>
			<HorizontalScroll
				children={allFeaturedManga.data?.map((featuredManga, index) => {
					return (
						<FeaturedCard
							key={featuredManga.id}
							{...featuredManga}
						/>
					);
				})}
			/>

			<h1 className='ml-11 mt-2'>Unordered</h1>
			<div className='flex flex-wrap ml-4'>
				{allUnorderedManga.data?.map((manga) => {
					return (
						<NormalCard
							key={manga.id}
							{...manga}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
