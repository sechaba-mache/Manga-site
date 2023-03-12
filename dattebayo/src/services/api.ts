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

const baseURL: string = "https://api.mangadex.org";
const coversURL: string = "https://uploads.mangadex.org";
const mangaBookURL: string = "https://api.mangadex.org/at-home/server";

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
            relationships: current?.relationships !== null && current?.relationships !== "" ? setRelationships(current?.relationships as string) : "none",
        });
    });

    return mangaInfo;
}

export async function getMangaCover(id: string, fileName: string): Promise<void | Blob> {

    const cover: Blob | void = await fetch(`${coversURL}/covers/${id}/${fileName}`)
        .then((res) => { return res.blob(); })
        .catch((err) => console.error(err));
    return cover;
}

export async function getMangaFeedByID(id: string): Promise<IFeedInfo[] | void> {

    const feed: Array<string> = await fetch(`${baseURL}/manga/${id}/feed`)
        .then((res) => { return res.json(); })
        .then((data) => { return data.data; })
        .catch((err) => console.error(err));

    const mangaFeed: IFeedInfo[] = [];

    feed.map((item: string) => {
        const current = JSON.parse(JSON.stringify(item));

        return mangaFeed.push({
            id: current?.id !== null && current?.id !== "" ? current?.id : "unknown",
            type: current?.type !== null && current?.type !== "" ? current?.type : "unknown",
            attributes: (current?.attributes !== null && current?.attributes !== "") ? setFeedAttributes(current?.attributes) : "unknown",
            relationships: current?.relationships !== null && current?.relationships !== "" ? setRelationships(current?.relationships) : "none"
        });
    });

    return mangaFeed;
}

export async function getMangaBook(chapterID: string): Promise<Blob[]> {

    const bookInfo: string = await fetch(`${mangaBookURL}/${chapterID}`)
        .then((res) => { return res.json(); })
        .then((data) => { return data.chapter; })
        .catch((err) => console.error(err));

    const current = JSON.parse(JSON.stringify(bookInfo));

    const manga: IMangaBook = {
        hash: (current?.hash !== null && current?.hash !== "") ? current?.hash : "none",
        data: (current?.data !== null && current?.data !== "") ? current?.data : "none",
    };

    const book: Blob[] = [];

    Array.from(manga.data).map(async (page) => {

        const current: void | Blob = await fetch(`${coversURL}/data/${manga.hash}/${page}`)
            .then((res) => { return res.blob(); })
            .catch((err) => console.error(err));

        if (current?.type) book.push(current);
    })

    return book;
}



function setFeedAttributes(attr: string): IFeedAttributes {

    const current: { [key: string]: string } = JSON.parse(JSON.stringify(attr));

    const feedAttributes: IFeedAttributes = {
        volume: (current?.volume !== null && current?.volume !== "") ? Number(current?.volume) : "unknown",
        chapter: (current?.chapter !== null && current?.chapter !== "") ? Number(current?.chapter) : "unknown",
        title: (current?.title !== null && current?.title !== "") ? current?.title : "unknown",
        translatedLanguage: (current?.translatedLanguage !== null && current?.translatedLanguage !== "") ? current?.translatedLanguage : "unknown",
        externalUrl: (current?.externalUrl !== null && current?.externalUrl !== "") ? current?.externalUrl : "unknown",
        publishAt: (current?.publishAt !== null && current?.publishAt !== "") ? current?.publishAt : "unknown",
        readableAt: (current?.readableAt !== null && current?.readableAt !== "") ? current?.readableAt : "unknown",
        createdAt: (current?.createdAt !== null && current?.createdAt !== "") ? current?.createdAt : "unknown",
        updatedAt: (current?.updatedAt !== null && current?.updatedAt !== "") ? current?.updatedAt : "unknown",
        pages: (current?.pages !== null && current?.pages !== "") ? Number(current?.pages) : "unknown",
        version: (current?.version !== null && current?.version !== "") ? Number(current?.version) : "unknown"
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
            relationships: tag?.relationships.length > 0 ? setRelationships(tag?.relationships) : "none",
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
        description: descriptionArray.length > 0 ? descriptionArray : "none",
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
            attributes: relationship?.attributes !== null && relationship?.attributes !== "" ? setAttributes3(relationship?.attributes as string) : "none",
        });
    });

    return myRels;
}

function setAttributes3(attr: string): IAttributes3 {

    const current: { [key: string]: string } = JSON.parse(JSON.stringify(attr));

    const myAttr3: IAttributes3 = {
        description: (current?.description !== null && current?.description !== "") ? current?.description : "unknown",
        volume: (current?.volume !== null && current?.volume !== "") ? Number(current?.volume) : "unknown",
        fileName: (current?.fileName !== null && current?.fileName !== "") ? current?.fileName : "unknown",
        locale: (current?.locale !== null && current?.locale !== "") ? current?.locale : "unknown",
        createdAt: (current?.createdAt !== null && current?.createdAt !== "") ? current?.createdAt : "unknown",
        updatedAt: (current?.updatedAt !== null && current?.updatedAt !== "") ? current?.updatedAt : "unknown",
        version: (current?.version !== null && current?.version !== "") ? Number(current?.version) : "unknown",
    };

    return myAttr3;
}
