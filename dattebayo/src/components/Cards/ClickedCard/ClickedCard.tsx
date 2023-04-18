import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import ErrorPage from "../../../ErrorPage";
import { LoadingPage } from "../../../LoadingPage";
import { IFeedChapter } from "../../../models/feedChapter";
import { IFeedInfo } from "../../../models/mangaChapters";
import { IInfo } from "../../../models/mangaInfo";
import {
	getMangaBook,
	getMangaByID,
	getMangaFeedByID,
} from "../../../services/api";
import { HorizontalScroll } from "../../HorizontalScroll";

export function ClickedCard() {
	const { id, fileName } = useParams();

	let feedFilterByEnglish: IFeedInfo[] = [];
	const [mangaPages, setMangaPages] = useState<Array<IFeedChapter>>([]);

	const mangaInfo = useQuery({
		queryKey: ["mangaInfo"],
		queryFn: () => getMangaByID(id as string),
	});

	const mangaFeed = useQuery({
		queryKey: ["mangaFeed"],
		queryFn: () => getMangaFeedByID(id as string),
	});

	mangaFeed.data?.sort((a, b) => {
		return Number(a.attributes.chapter) - Number(b.attributes.chapter);
	});

	if (mangaFeed.data)
		feedFilterByEnglish = mangaFeed.data
			?.filter((language) => {
				if (language.attributes.translatedLanguage === "en") return language;
			})
			.slice(0, 10);

	const mangaChapters = useQueries({
		queries: feedFilterByEnglish.map((manga) => ({
			queryKey: ["chapter", manga.id],
			queryFn: () => getMangaBook(manga.id),
			enabled: !!feedFilterByEnglish,
			onSuccess(allChapters: string[]) {
				// if(mangaPages.map((entry) => {if(entry.chapter === )}))
				setMangaPages([
					...mangaPages,
					{ chapter: Number(manga.attributes.chapter), pages: allChapters },
				]);
			},
		})),
	});

	const mangaData = mangaInfo.data;

	if (
		(mangaChapters.length === 0 ||
			mangaChapters.map((chapter) => chapter.isLoading).includes(true)) ||
		mangaFeed.isLoading ||
		mangaInfo.isLoading ||
		mangaData === undefined
	) {
		return <LoadingPage />;
	} else if (
		mangaFeed.isError ||
		mangaInfo.isError ||
		mangaChapters
			.map((chapter) => {
				return chapter.isError;
			})
			.includes(true)
	) {
		return <ErrorPage />;
	} else {
		const data = mangaData as IInfo;
		const numManga = mangaFeed.data?.filter((language) => {
			if (language.attributes.translatedLanguage === "en") return language;
		}).length;

		mangaPages.sort((a, b) => {
			return Number(a.chapter) - Number(b.chapter);
		});

		return (
			<div className='fixed text-base font-medium z-30 left-0 right-0 top-[15vh] m-auto w-[1200px] h-[700px] bg-slate-600 rounded-t-xl'>
				<div className='grid grid-cols-clickedCardGridCol grid-rows-clickedCardGridRow w-full h-full'>
					<div className='Image grid col-clickedCardLeft row-clickedCardImage'>
						<img
							src={`https://uploads.mangadex.org/covers/${id}/${fileName}`}
							alt='Anime Cover'
							className='rounded-xl w-[85%] h-[90%] self-center justify-self-center'
						/>
					</div>
					<div className='body grid col-clickedCardRight row-clickedCardBody '>
						<div className='content w-[85%] h-[85%] self-center justify-self-center font-medium'>
							<h1>Title: {Object.values(data.attributes.title)[0]}</h1>
							<p className='mb-1'>
								Type: {data.attributes.publicationDemographic}
							</p>
							<p>Original Language: {data.attributes.originalLanguage}</p>
							<p className='mb-1'>
								Genres:
								{data.attributes.tags.map((tag, index) => {
									if (index !== data.attributes.tags.length - 1 && index < 3) {
										return (
											<li
												key={`${tag.id}` + Math.random()}
												className='ml-8'>
												{Object.values(tag.attributes.name)},
											</li>
										);
									}
									if (index < 3)
										return (
											<li
												key={`${tag.id}` + Math.random()}
												className='ml-8'>
												{Object.values(tag.attributes.name)}
											</li>
										);
								})}
							</p>
							<p className='mb-1'>Release Year: {data.attributes.year}</p>
							<p>
								Number Of Chapters:{" "}
								{
									mangaFeed.data?.filter((language) => {
										if (language.attributes.translatedLanguage === "en")
											return language;
									}).length
								}
							</p>
							<p>Status: {data.attributes.status}</p>
							<p className='line-clamp-5'>
								Description: {Object.values(data.attributes.description[0])}
							</p>
						</div>
					</div>

					<div className='manga grid col-clickedCardRight row-clickedCardManga bg-slate-600 '>
						<h1 className='text-xl font-semibold text-center '>CHAPTERS</h1>
						<div className='content w-[620px] h-[165px] self-center justify-self-center flex'>
							<HorizontalScroll
								children={mangaPages.map((entry, index) => {
									return (
										<Link to={`/${id}/${index}`}>
											<div
												key={entry.pages[0] + entry.chapter}
												className='card bg-base-100 shadow-xl w-36 image-full mr-3 ml-3 mb-5'>
												<figure>
													<img
														src={entry.pages[0]}
														alt='Anime Cover'
														className='rounded-xl w-full'
													/>
												</figure>
												<div className='card-body'>
													<h2 className='card-title '>
														Chapter: {entry.chapter}
													</h2>
												</div>
											</div>
										</Link>
									);
								})}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
