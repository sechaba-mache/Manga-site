import { useQuery } from "@tanstack/react-query";
import { getAllManga, getMangaCover } from "../../../services/api";

export function FeaturedCard() {
	const retrievedManga = useQuery({
		queryKey: ["manga"],
		queryFn: () => getAllManga("featured"),
	});

	if (retrievedManga.isLoading) return <p>Loading</p>;
	if (retrievedManga.error) return <p>error</p>;

	return (
		<div className='overflow-scroll flex absolute'>
			{retrievedManga.data?.map((manga) => {
				let fileName: string = "";
				manga.relationships.map((rel) => {
					if (rel.type === "cover_art") fileName = rel.attributes?.fileName!;
				});

				return (
					<div className='card bg-slate-800 w-[300px] h-[480px] m-5'>
						<h1 className='card-title justify-center mt-4 ml-5 mr-5'>
							{Object.values(manga.attributes.title)[0]}
						</h1>
						<div className='cover flex justify-center content-center items-center w-full h-52 rounded-xl'>
							<img
								src={`https://uploads.mangadex.org/covers/${manga.id}/${fileName}`}
								alt='Anime Cover'
								className='rounded-xl w-44 h-44'
							/>
						</div>

						<div className='card-body text-left'>
							<p>Type: {manga.attributes.publicationDemographic}</p>
							<p>
								Genre:{" "}
								{manga.attributes.tags.map((tag, index) => {
									if (index < 3)
										return `${Object.values(tag.attributes.name)} `;
								})}
							</p>
							<p>Release Year: {manga.attributes.year}</p>
							<p>Status: {manga.attributes.status}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
