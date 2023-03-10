import { IRelationship } from "./mangaInfo";

export interface IFeedInfo {
    id: string
    type: string
    attributes: IFeedAttributes | string
    relationships: IRelationship[] | string
}

export interface IFeedAttributes {
    volume: string | number
    chapter: string | number
    title: string
    translatedLanguage: string
    externalUrl: any
    publishAt: string
    readableAt: string
    createdAt: string
    updatedAt: string
    pages: number | string
    version: number | string
}
