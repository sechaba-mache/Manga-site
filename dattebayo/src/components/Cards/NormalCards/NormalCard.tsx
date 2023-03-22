import { Link } from "react-router-dom";
import { IInfo } from "../../../models/mangaInfo";

export function NormalCard(manga: IInfo) {
	let fileName: string = "";
	manga.relationships.map((rel) => {
		if (rel.type === "cover_art") fileName = rel.attributes?.fileName!;
	});

	return (
		<Link to={`info/${manga.id}/${fileName}`}>
			<div className='card w-48 h-60 bg-base-100 shadow-xl image-full'>
				<figure>
					<img
						src={`https://uploads.mangadex.org/covers/${manga.id}/${fileName}`}
						alt={`${Object.values(manga.attributes.title)[0]} cover`}
						className='rounded-xl w-full h-full'
					/>
				</figure>
				<div className='card-body content-center justify-center'>
					<h2 className='card-title line-clamp-4 w-32'>
						{Object.values(manga.attributes.title)[0]}
					</h2>
				</div>
			</div>
		</Link>
	);
}
