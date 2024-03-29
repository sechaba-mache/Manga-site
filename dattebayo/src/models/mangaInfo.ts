export interface IInfo {
    id: string
    type: string
    attributes: IAttributes
    relationships: IRelationship[]
}

export interface IAttributes {
    title: { [key: string]: string }
    altTitles: { [key: string]: string }[] | string
    description: { [key: string]: string }[]
    isLocked: boolean
    links: { [key: string]: string }[] | string
    originalLanguage: string
    lastVolume: number | string
    lastChapter: number | string
    publicationDemographic: string
    status: string
    year: number | string
    contentRating: string
    tags: ITag[]
    state: string
    chapterNumbersResetOnNewVolume: boolean
    createdAt: string
    updatedAt: string
    version: number | string
    availableTranslatedLanguages: string[] | string
    latestUploadedChapter: string
}

export interface ITag {
    id: string
    type: string
    attributes: IAttributes2
    relationships: IRelationship[]
}

export interface IAttributes2 {
    name: { [key: string]: string }
    description: { [key: string]: string }[] | string
    group: string
    version: number | string
}

export interface IRelationship {
    id: string
    type: string
    attributes?: IAttributes3
}

export interface IAttributes3 {
    description: string
    volume: number | string
    fileName: string
    locale: string
    createdAt: string
    updatedAt: string
    version: number | string
}
