import { useQuery } from "@tanstack/react-query";
import { Outlet, useOutletContext } from "react-router-dom";
import { FeaturedCard } from "./components/Cards/FeaturedCards/FeaturedCard";
import { NormalCard } from "./components/Cards/NormalCards/NormalCard";
import { HorizontalScroll } from "./components/HorizontalScroll";
import ErrorPage from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";
import { getAllManga } from "./services/api";

export function Homepage() {
	const filter = useOutletContext();

	const type = filter as string;

	const allFeaturedManga = useQuery({
		queryKey: ["featuredManga"],
		queryFn: () => getAllManga("featured"),
	});

	const allFilteredManga = useQuery({
		queryKey: ["allFilteredManga"],
		queryFn: () => getAllManga(type),
		refetchOnMount: true,
	});

	if (allFeaturedManga.isLoading && allFilteredManga.isLoading)
		return <LoadingPage />;

	if (allFeaturedManga.error || allFilteredManga.isError) return <ErrorPage />;

	allFilteredManga.refetch();

	return (
		<>
			<Outlet />
			<div className='page'>
				<div className='featured rounded-b-xl bg-zinc-900 pb-5'>
					<h1 className='text-center pt-5 font-extrabold text-2xl text-secondary'>
						FEATURED
					</h1>

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
				</div>

				<div className='body bg-zinc-900 mt-6 rounded-xl'>
					<h1 className='text-center pt-5 font-extrabold text-2xl text-secondary pb-5'>
						{type.toUpperCase()}
					</h1>
					<div className='flex flex-wrap ml-4 justify-between gap-3'>
						{allFilteredManga.data?.map((manga) => {
							return (
								<NormalCard
									key={manga.id}
									{...manga}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
