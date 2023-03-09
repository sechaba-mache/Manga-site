import { IAttributes, IInfo } from "../models/mangaInfo";

const baseURL: string = "https://api.mangadex.org";
const coversURL: string = "https://uploads.mangadex.org";

export async function getAllManga(): Promise<IInfo[]> {
    const allManga: Array<string> = await fetch(`${baseURL}/manga?includes[]=cover_art&contentRating[]=safe&limit=100`).then(res => res.json()).then(data => { return data.data }).catch(err => console.error("An error has occured", err));
    const mangaInfo: IInfo[] = [];
    allManga.map((manga: string) => {
        const current = JSON.parse(JSON.stringify(manga));
        return mangaInfo.push({
            id: current?.id ?? "unknown",
            type: current?.type ?? "unknown",
            attributes: current?.attributes ?? "none",
            relationships: current?.relationships ?? [],
        });
    })
    return mangaInfo;
}