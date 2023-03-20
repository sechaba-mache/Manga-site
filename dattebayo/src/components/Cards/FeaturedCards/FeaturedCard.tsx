import { UseQueryResult } from "@tanstack/react-query";
import { IInfo } from "../../../models/mangaInfo";
import { getAllManga, getMangaCover } from "../../../services/api";

export function FeaturedCard(featuredManga: IInfo) {
	let fileName: string = "";
	featuredManga.relationships.map((rel) => {
		if (rel.type === "cover_art") fileName = rel.attributes?.fileName!;
	});

	return (
		<div className='grid grid-cols-myGrid grid-rows-myGrid bg-slate-800 w-[300px] h-[500px] m-5 rounded-xl 	text-center cursor-pointer'>
			<div className='grid col-cardCols row-title content-center'>
				<h1>{Object.values(featuredManga.attributes.title)[0]}</h1>
			</div>

			<div className='grid col-cardCols row-image'>
				<img
					src={`https://uploads.mangadex.org/covers/${featuredManga.id}/${fileName}`}
					alt='Anime Cover'
					className='rounded-xl w-[60%] h-full self-center justify-self-center'
				/>
			</div>
			<div className='cardBody col-cardCols row-body mt-5 ml-6 w-full h-full text-left'>
				<p className='mb-1'>
					Type: {featuredManga.attributes.publicationDemographic}
				</p>
				<p className='mb-1'>
					Genres:
					{featuredManga.attributes.tags.map((tag, index) => {
						if (index < 3)
							return (
								<li className='ml-8'>{Object.values(tag.attributes.name)}</li>
							);
					})}
				</p>
				<p className='mb-1'>Release Year: {featuredManga.attributes.year}</p>
				<p>Status: {featuredManga.attributes.status}</p>
			</div>
		</div>
	);
}
