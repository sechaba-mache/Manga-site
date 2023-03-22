import { IMangaBook } from "../models/mangaBook";
import { IFeedAttributes, IFeedInfo } from "../models/mangaChapters";
import {
    IAttributes,
    IAttributes2,
    IAttributes3,
    IInfo,
    IRelationship,
    ITag
} from "../models/mangaInfo";
import { IComments, IRating, IStatistics } from "../models/mangaStats";

const baseURL: string = "https://api.mangadex.org";
const coversURL: string = "https://uploads.mangadex.org";
const mangaBookURL: string = "https://api.mangadex.org/at-home/server";

export async function getAllManga(type: string): Promise<IInfo[]> {

    let allManga: Array<string> = [];

    if (type === "featured") {
        allManga = await fetch(`${baseURL}/manga?order[followedCount]=desc&includes[]=cover_art&contentRating[]=safe&limit=10`)
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.error("An error has occured", err));
    }
    else if (type.toLowerCase() !== "unordered") {
        allManga = await fetch(`${baseURL}/manga?order[${type}]=desc&includes[]=cover_art&contentRating[]=safe&limit=56`)
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.error("An error has occured", err));
    }
    else {
        allManga = await fetch(`${baseURL}/manga?includes[]=cover_art&contentRating[]=safe&limit=56`)
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.error("An error has occured", err));
    }

    const mangaInfo: IInfo[] = [];
    allManga.map((manga: string) => {
        const current: { [key: string]: unknown } = JSON.parse(JSON.stringify(manga));

        return mangaInfo.push({
            id: current?.id as string,
            type: current?.type as string,
            attributes: setAttributes(current?.attributes as string),
            relationships: setRelationships(current?.relationships as string),
        });
    });

    return mangaInfo;
}

export async function getMangaByID(id: string): Promise<IInfo> {

    const feed = await fetch(`${baseURL}/manga/${id}`)
        .then((res) => { return res.json(); })
        .then((data) => { return data.data; })
        .catch((err) => console.error(err));

    const current: { [key: string]: unknown } = JSON.parse(JSON.stringify(feed));

    return {
        id: current?.id as string,
        type: current?.type as string,
        attributes: setAttributes(current?.attributes as string),
        relationships: setRelationships(current?.relationships as string),
    };
}

export function getMangaCover(id: string, fileName: string): string {

    return `${coversURL}/covers/${id}/${fileName}`;
}

export async function getMangaFeedByID(id: string): Promise<IFeedInfo[]> {

    const feed: Array<string> = await fetch(`${baseURL}/manga/${id}/feed`)
        .then((res) => { return res.json(); })
        .then((data) => { return data.data; })
        .catch((err) => console.error(err));

    const mangaFeed: IFeedInfo[] = [];

    feed.map((item: string) => {
        const current = JSON.parse(JSON.stringify(item));

        return mangaFeed.push({
            id: current?.id !== null && current?.id !== "" ? current?.id : "Unknown",
            type: current?.type !== null && current?.type !== "" ? current?.type : "Unknown",
            attributes: setFeedAttributes(current?.attributes),
            relationships: setRelationships(current?.relationships)
        });
    });

    return mangaFeed;
}

export async function getMangaBook(chapterID: string): Promise<string[]> {

    const bookInfo: string = await fetch(`${mangaBookURL}/${chapterID}`)
        .then((res) => { return res.json(); })
        .then((data) => { if (data?.errors) return "error"; return data.chapter; })
        .catch((err) => { console.error(err); return "error" });


    if (bookInfo !== "error") {
        const current = JSON.parse(JSON.stringify(bookInfo));

        const manga: IMangaBook = {
            hash: (current?.hash !== null && current?.hash !== "") ? current?.hash : "None",
            data: (current?.data !== null && current?.data !== "") ? current?.data : "None",
        };

        const book: string[] = [];

        Array.from(manga.data).map((page) => {
            book.push(`${coversURL}/data/${manga.hash}/${page}`)
        })

        return book;
    }
    return [bookInfo];
}

export async function getMangaStatsByID(id: string) {

    const stats: string = await fetch(`${baseURL}/statistics/manga/${id}`)
        .then((res) => { return res.json(); })
        .then((data) => { return data.statistics[id] })
        .catch((err) => console.error(err));

    const current = JSON.parse(JSON.stringify(stats));

    const mangaStats: IStatistics = {
        comments: setComments(current?.comments),
        rating: setRatings(current?.rating),
        follows: current?.follows !== null && current?.follows !== "" ? Number(current?.follows) : "Unknown"
    }

    return mangaStats;
}

function setComments(comments: string): IComments {

    const current = JSON.parse(JSON.stringify(comments));

    const comms: IComments = {
        threadId: current?.threadId !== null && current?.threadId !== "" ? Number(current?.threadId) : "Unknown",
        repliesCount: current?.repliesCount !== null && current?.repliesCount !== "" ? Number(current?.repliesCount) : "Unknown"
    }

    return comms;
}

function setRatings(ratings: string) {

    const current = JSON.parse(JSON.stringify(ratings));

    const rating: IRating = {
        average: current?.average !== null && current?.average !== "" ? parseFloat(current?.average) : "Unknown",
        bayesian: current?.bayesian !== null && current?.bayesian !== "" ? parseFloat(current?.bayesian) : "Unknown"
    }

    return rating;
}

function setFeedAttributes(attr: string): IFeedAttributes {

    const current: { [key: string]: string } = JSON.parse(JSON.stringify(attr));

    const feedAttributes: IFeedAttributes = {
        volume: (current?.volume !== null && current?.volume !== "") ? Number(current?.volume) : "Unknown",
        chapter: (current?.chapter !== null && current?.chapter !== "") ? Number(current?.chapter) : "Unknown",
        title: (current?.title !== null && current?.title !== "") ? current?.title : "Unknown",
        translatedLanguage: (current?.translatedLanguage !== null && current?.translatedLanguage !== "") ? current?.translatedLanguage : "Unknown",
        externalUrl: (current?.externalUrl !== null && current?.externalUrl !== "") ? current?.externalUrl : "Unknown",
        publishAt: (current?.publishAt !== null && current?.publishAt !== "") ? current?.publishAt : "Unknown",
        readableAt: (current?.readableAt !== null && current?.readableAt !== "") ? current?.readableAt : "Unknown",
        createdAt: (current?.createdAt !== null && current?.createdAt !== "") ? current?.createdAt : "Unknown",
        updatedAt: (current?.updatedAt !== null && current?.updatedAt !== "") ? current?.updatedAt : "Unknown",
        pages: (current?.pages !== null && current?.pages !== "") ? Number(current?.pages) : "Unknown",
        version: (current?.version !== null && current?.version !== "") ? Number(current?.version) : "Unknown"
    };

    return feedAttributes;
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
        title: JSON.parse(JSON.stringify(current?.title)) ?? "Unknown",
        altTitles: current?.altTitles.length > 0 ? current?.altTitles : "None",
        description: descriptionArray.length > 0 ? descriptionArray : [{ "decription": "None" }],
        isLocked: current?.isLocked === "true" ? true : false,
        links: linksArray.length > 0 ? linksArray : "None",
        originalLanguage: (current?.originalLanguage !== null && current?.originalLanguage !== "") ? current?.originalLanguage : "Unknown",
        lastVolume: (current?.lastVolume !== null && current?.lastVolume !== "") ? Number(current?.lastVolume) : "Unknown",
        lastChapter: (current?.lastChapter !== null && current?.lastChapter !== "") ? Number(current?.lastChapter) : "Unknown",
        publicationDemographic: (current?.publicationDemographic !== null && current?.publicationDemographic !== "") ? current?.publicationDemographic : "Unknown",
        status: (current?.status !== null && current?.status !== "") ? current?.status : "Unknown",
        year: current?.year !== null ? Number(current?.year) : "Unknown",
        contentRating: current?.contentRating,
        tags: setTags(current?.tags as string),
        state: (current?.state !== null && current?.state !== "") ? current?.state : "Unknown",
        chapterNumbersResetOnNewVolume: current?.chapterNumbersResetOnNewVolume === "true" ? true : false,
        createdAt: (current?.createdAt !== null && current?.createdAt !== "") ? current?.createdAt : "Unknown",
        updatedAt: (current?.updatedAt !== null && current?.updatedAt !== "") ? current?.updatedAt : "unknwon",
        version: (current?.version !== null && current?.version !== "") ? Number(current?.version) : "Unknown",
        availableTranslatedLanguages: Array.from(current?.availableTranslatedLanguages).length > 0 ? Array.from(current?.availableTranslatedLanguages) : "None",
        latestUploadedChapter: (current?.latestUploadedChapter !== null && current?.latestUploadedChapter !== "") ? current?.latestUploadedChapter : "Unknown"
    };

    return myAttr;
}

function setTags(tags: string): ITag[] {

    const current: Array<{ [key: string]: string }> = JSON.parse(JSON.stringify(tags));

    const myTags: ITag[] = [];
    Array.from(current).map((tag) => {

        return myTags.push({
            id: tag?.id !== null ? tag?.id : "Unknown",
            type: tag?.type !== null ? tag?.type : "Tag",
            attributes: setAttributes2(tag?.attributes as string),
            relationships: setRelationships(tag?.relationships),
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
        name: JSON.parse(JSON.stringify(current?.name)) ?? "Unknown",
        description: descriptionArray.length > 0 ? descriptionArray : "None",
        group: (current?.group !== null && current?.group !== "") ? current?.group : "Unknown",
        version: (current?.version !== null && current?.version !== "") ? current?.version : "Unknown"
    };

    return myAttr2;
}

function setRelationships(rel: string): IRelationship[] {

    const current: Array<{ [key: string]: string }> = JSON.parse(JSON.stringify(rel));
    const myRels: IRelationship[] = [];

    Array.from(current).map((relationship: { [key: string]: string }) => {
        if (!relationship?.attributes) {
            return myRels.push({
                id: (relationship?.id !== null && relationship?.id !== "") ? relationship?.id : "Unknown",
                type: (relationship?.type !== null && relationship?.type !== "") ? relationship?.type : "Unknown"
            });
        }

        return myRels.push({
            id: (relationship?.id !== null && relationship?.id !== "") ? relationship?.id : "Unknown",
            type: (relationship?.type !== null && relationship?.type !== "") ? relationship?.type : "Unknown",
            attributes: setAttributes3(relationship?.attributes as string),
        });
    });

    return myRels;
}

function setAttributes3(attr: string): IAttributes3 {

    const current: { [key: string]: string } = JSON.parse(JSON.stringify(attr));

    const myAttr3: IAttributes3 = {
        description: (current?.description !== null && current?.description !== "") ? current?.description : "Unknown",
        volume: (current?.volume !== null && current?.volume !== "") ? Number(current?.volume) : "Unknown",
        fileName: (current?.fileName !== null && current?.fileName !== "") ? current?.fileName : "Unknown",
        locale: (current?.locale !== null && current?.locale !== "") ? current?.locale : "Unknown",
        createdAt: (current?.createdAt !== null && current?.createdAt !== "") ? current?.createdAt : "Unknown",
        updatedAt: (current?.updatedAt !== null && current?.updatedAt !== "") ? current?.updatedAt : "Unknown",
        version: (current?.version !== null && current?.version !== "") ? Number(current?.version) : "Unknown",
    };

    return myAttr3;
}
