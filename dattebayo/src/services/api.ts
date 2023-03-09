import {
    IAttributes,
    IAttributes2,
    IAttributes3,
    IInfo,
    IRelationship,
    ITag
} from "../models/mangaInfo";

const baseURL: string = "https://api.mangadex.org";
const coversURL: string = "https://uploads.mangadex.org";

export async function getAllManga(): Promise<IInfo[]> {
    // Don't forget to set limit back to 100
    const allManga: Array<string> = await fetch(`${baseURL}/manga?includes[]=cover_art&contentRating[]=safe&limit=1`)
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
            relationships: current?.relationships !== null && current?.relationships !== "" ? setRelationships(current?.relationships as string) : "none",
        });
    });

    console.log(mangaInfo)
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
        originalLanguage: (current?.originalLanguage !== null && current?.originalLanguage !== "") ? current?.originalLanguage : "unknown",
        lastVolume: (current?.lastVolume !== null && current?.lastVolume !== "") ? Number(current?.lastVolume) : "unknown",
        lastChapter: (current?.lastChapter !== null && current?.lastChapter !== "") ? Number(current?.lastChapter) : "unknown",
        publicationDemographic: (current?.publicationDemographic !== null && current?.publicationDemographic !== "") ? current?.publicationDemographic : "unknown",
        status: (current?.status !== null && current?.status !== "") ? current?.status : "unknown",
        year: current?.year !== null ? Number(current?.year) : "unknown",
        contentRating: current?.contentRating,
        tags: current?.tags !== null && current?.tags !== "" ? setTags(current?.tags as string) : "none",
        state: (current?.state !== null && current?.state !== "") ? current?.state : "unknown",
        chapterNumbersResetOnNewVolume: current?.chapterNumbersResetOnNewVolume === "true" ? true : false,
        createdAt: (current?.createdAt !== null && current?.createdAt !== "") ? current?.createdAt : "unknown",
        updatedAt: (current?.updatedAt !== null && current?.updatedAt !== "") ? current?.updatedAt : "unknwon",
        version: (current?.version !== null && current?.version !== "") ? Number(current?.version) : "unknown",
        availableTranslatedLanguages: Array.from(current?.availableTranslatedLanguages).length > 0 ? Array.from(current?.availableTranslatedLanguages) : "none",
        latestUploadedChapter: (current?.latestUploadedChapter !== null && current?.latestUploadedChapter !== "") ? current?.latestUploadedChapter : "unknown"
    };

    return myAttr;
}

function setTags(tags: string): ITag[] {

    const current: Array<{ [key: string]: string }> = JSON.parse(JSON.stringify(tags));

    const myTags: ITag[] = [];
    Array.from(current).map((tag) => {
        return myTags.push({
            id: tag?.id !== null ? tag?.id : "unknown",
            type: tag?.type !== null ? tag?.type : "tag",
            attributes: tag?.attributes !== null && tag?.attributes !== "" ? setAttributes2(tag?.attributes as string) : "none",
            relationships: []
        });
    });

    return myTags;
}

function setAttributes2(attr: string): IAttributes2 {

    const current: { [key: string]: string } = JSON.parse(JSON.stringify(attr));

    const descriptionArray: Array<{ [key: string]: string }> = [];
    Array.from(Object.keys(current?.description)).map((entry: string, index: number): number => {
        return descriptionArray.push({
            [entry]: Object.values(current?.description)[index]
        });
    });

    const myAttr2: IAttributes2 = {
        name: JSON.parse(JSON.stringify(current?.name)) ?? "unknown",
        description: descriptionArray,
        group: (current?.group !== null && current?.group !== "") ? current?.group : "unknown",
        version: (current?.version !== null && current?.version !== "") ? current?.version : "unknown"
    };

    return myAttr2;
}

function setRelationships(rel: string): IRelationship[] {

    const current: Array<{ [key: string]: string }> = JSON.parse(JSON.stringify(rel));

    const myRels: IRelationship[] = [];

    Array.from(current).map((relationship: { [key: string]: string }) => {
        if (!relationship?.attributes) {
            return myRels.push({
                id: (relationship?.id !== null && relationship?.id !== "") ? relationship?.id : "unknown",
                type: (relationship?.type !== null && relationship?.type !== "") ? relationship?.type : "unknown"
            });
        }

        return myRels.push({
            id: (relationship?.id !== null && relationship?.id !== "") ? relationship?.id : "unknown",
            type: (relationship?.type !== null && relationship?.type !== "") ? relationship?.type : "unknown",
            attributes: {} as IAttributes3,
        });
    });

    return myRels;
}
