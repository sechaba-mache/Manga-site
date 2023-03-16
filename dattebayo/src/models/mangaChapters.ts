import { IRelationship } from "./mangaInfo";

export interface IFeedInfo {
    id: string
    type: string
    attributes: IFeedAttributes
    relationships: IRelationship[]
}

export interface IFeedAttributes {
    volume: string | number
    chapter: string | number
    title: string
    translatedLanguage: string
    externalUrl: string
    publishAt: string
    readableAt: string
    createdAt: string
    updatedAt: string
    pages: number | string
    version: number | string
}
