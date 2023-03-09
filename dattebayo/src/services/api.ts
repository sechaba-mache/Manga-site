import { IAttributes, IInfo, IRelationship } from "../models/mangaInfo";

const baseURL: string = "https://api.mangadex.org";
const coversURL: string = "https://uploads.mangadex.org";

export async function getAllManga(): Promise<IInfo[]> {
    const allManga: Array<string> = await fetch(`${baseURL}/manga?includes[]=cover_art&contentRating[]=safe&limit=100`)
        .then((res) => res.json())
        .then((data) => data.data)
        .catch((err) => console.error("An error has occured", err));

    const mangaInfo: IInfo[] = [];
    allManga.map((manga: string) => {
        const current: { [key: string]: unknown } = JSON.parse(JSON.stringify(manga));
        return mangaInfo.push({
            id: current?.id as string ?? "unknown",
            type: current?.type as string ?? "unknown",
            attributes: current?.attributes !== null && current?.attributes !== "" ? setAttributes(current?.attributes as string) : "none",
            relationships: current?.relationships as IRelationship[] ?? [],
        });
    });

    return mangaInfo;
}

function setAttributes(attr: string): IAttributes {

    const current: { [key: string]: string } = JSON.parse(JSON.stringify(attr));

    const descriptionArray: Array<{ [key: string]: string }> = [];
    Array.from(Object.keys(current?.description)).map((entry: string, index: number): number => {
        return descriptionArray.push({
            [entry]: Object.values(current?.description)[index]
        });
    });

    const linksArray: Array<{ [key: string]: string }> = [];
    Array.from(Object.keys(current?.links)).map((entry: string, index: number): number => {
        return linksArray.push({
            [entry]: Object.values(current?.links)[index]
        });
    });

    const myAttr: IAttributes = {
        title: JSON.parse(JSON.stringify(current?.title)) ?? "unknown",
        altTitles: current?.altTitles.length > 0 ? current?.altTitles : "none",
        description: descriptionArray.length > 0 ? descriptionArray : "none",
        isLocked: current?.isLocked === "true" ? true : false,
        links: linksArray.length > 0 ? linksArray : "none",
        originalLanguage: current?.originalLanguage,
        lastVolume: (current?.lastVolume !== null && current?.lastVolume !== "") ? Number(current?.lastVolume) : "unknown",
        lastChapter: (current?.lastChapter !== null && current?.lastChapter !== "") ? Number(current?.lastChapter) : "unknown",
        publicationDemographic: current?.publicationDemographic !== null ? current?.publicationDemographic : "unknown",
        status: current?.status !== null ? current?.status : "unknown",
        year: current?.year !== null ? Number(current?.year) : "unknown",
        contentRating: current?.contentRating,
        tags: [], // Add setTags function
        state: current?.state !== null ? current?.state : "unknown",
        chapterNumbersResetOnNewVolume: current?.chapterNumbersResetOnNewVolume === "true" ? true : false,
        createdAt: current?.createdAt !== null ? current?.createdAt : "unknown",
        updatedAt: current?.updatedAt !== null ? current?.updatedAt : "unknwon",
        version: current?.version !== null ? Number(current?.version) : "unknown",
        availableTranslatedLanguages: Array.from(current?.availableTranslatedLanguages).length > 0 ? Array.from(current?.availableTranslatedLanguages) : "none",
        latestUploadedChapter: current?.latestUploadedChapter !== null ? current?.latestUploadedChapter : "unknown"
    };

    return myAttr;
}
