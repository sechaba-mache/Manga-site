import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IFeedInfo } from "../../../models/mangaChapters";
import { getMangaBook, getMangaFeedByID } from "../../../services/api";

export function ClickedCard() {
	const { id, fileName } = useParams();

	let feedFilterByEnglish: IFeedInfo[] = [];
	const [mangaPages, setMangaPages] = useState<Array<Array<string>>>([]);

	const mangaFeed = useQuery({
		queryKey: ["mangaFeed"],
		queryFn: () => getMangaFeedByID(id as string),
	});

	mangaFeed.data?.sort(function (a, b) {
		return Number(a.attributes.chapter) - Number(b.attributes.chapter);
	});

	if (mangaFeed.data)
		feedFilterByEnglish = mangaFeed.data
			?.filter((language) => {
				if (language.attributes.translatedLanguage === "en") return language;
			})
			.slice(0, 5);

	const mangaChapters = useQueries({
		queries: feedFilterByEnglish.map((manga) => ({
			queryKey: ["chapter", manga.id],
			queryFn: () => getMangaBook(manga.id),
			enabled: !!feedFilterByEnglish,
			onSuccess(allChapters: string[]) {
				if (!mangaPages.includes(allChapters))
					setMangaPages([...mangaPages, allChapters]);
			},
			staleTime: Infinity,
		})),
	});

	if (
		(mangaChapters.length === 0 ||
			mangaChapters.map((chapter) => chapter.isLoading).includes(true)) &&
		mangaFeed.isLoading
	) {
		return <h1>Loading...</h1>;
	} else {
		return createBox(mangaPages, id as string, fileName as string);
	}
}

function createBox(data: string[][], id: string, fileName: string) {
	return (
		<div className='fixed left-0 right-0 top-[20vh] m-auto w-[1100px] h-[600px] bg-white'>
			<div className='grid grid-cols-clickedCardGridCol grid-rows-clickedCardGridRow w-full h-full'>
				<div className='Image grid col-clickedCardLeft row-clickedCardImage bg-slate-600'>
					<img
						src={`https://uploads.mangadex.org/covers/${id}/${fileName}`}
						alt='Anime Cover'
						className='rounded-xl w-[85%] h-[90%] self-center justify-self-center'
					/>
				</div>
				<div className='body grid col-clickedCardRight row-clickedCardBody bg-gray-900'>
					<div className='content bg-white w-[85%] h-[85%] self-center justify-self-center'></div>
				</div>
				<div className='manga grid col-clickedCardRight row-clickedCardManga bg-orange-500'>
					<div className='content bg-white w-[85%] h-[85%] self-center justify-self-center flex'>
						{data.map((entry) => {
							return (
								<img
									key={entry[0]}
									src={entry[0]}
									alt='Anime Cover'
									className='rounded-xl w-20 h-28 m-2 self-center justify-self-center'
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
