import { IInfo } from "../../../models/mangaInfo";

export function NormalCard(manga: IInfo) {
	let fileName: string = "";
	manga.relationships.map((rel) => {
		if (rel.type === "cover_art") fileName = rel.attributes?.fileName!;
	});

	console.log(
		Object.values(manga.attributes.title)[0],
		`https://uploads.mangadex.org/covers/${manga.id}/${fileName}`
	);
	return (
		<div className='normalCard w-48 h-60 bg-white shadow-xl rounded-xl m-5 cursor-pointer'>
			<img
				src={`https://uploads.mangadex.org/covers/${manga.id}/${fileName}`}
				alt={`${Object.values(manga.attributes.title)[0]} cover`}
				className='rounded-xl w-full h-full'></img>
		</div>
	);
}
