import { UseQueryResult } from "@tanstack/react-query";
import { IInfo } from "../../../models/mangaInfo";
import { getAllManga, getMangaCover } from "../../../services/api";
import { Link } from "react-router-dom";

export function FeaturedCard(featuredManga: IInfo) {
	let fileName: string = "";
	featuredManga.relationships.map((rel) => {
		if (rel.type === "cover_art") fileName = rel.attributes?.fileName!;
	});

	return (
		<Link to={`info/${featuredManga.id}/${fileName}`}>
			<div className='grid grid-cols-myGrid grid-rows-myGrid bg-orange-500 text-main w-[350px] h-[440px] m-5 rounded-xl 	text-center cursor-pointer'>
				<div className='grid col-cardCols row-title content-center justify-center'>
					<h1 className='pt-2 line-clamp-2 text-xl font-semibold w-52'>
						{Object.values(featuredManga.attributes.title)[0]}
					</h1>
				</div>

				<div className='grid col-cardCols row-image w-full h-full'>
					<img
						src={`https://uploads.mangadex.org/covers/${featuredManga.id}/${fileName}`}
						alt='Anime Cover'
						className='rounded-xl w-[60%] h-full self-center justify-self-center'
					/>
				</div>
				<div className='cardBody col-cardCols row-body mt-5 ml-6 w-full h-full text-left font-semibold'>
					<p className='mb-1'>
						Type: {featuredManga.attributes.publicationDemographic}
					</p>
					<p className='mb-1'>
						Genres:
						{featuredManga.attributes.tags.map((tag, index) => {
							if (index < 2)
								return (
									<li
										key={`${tag.id}`}
										className='ml-8'>
										{Object.values(tag.attributes.name)}
									</li>
								);
						})}
					</p>
					<p>Year: {featuredManga.attributes.year}</p>
					<p>Status: {featuredManga.attributes.status}</p>
				</div>
			</div>
		</Link>
	);
}
