export interface IStatistics {
    comments: IComments | string
    rating: IRating | string
    follows: number | string
}

export interface IComments {
    threadId: number | string
    repliesCount: number | string
}

export interface IRating {
    average: number | string
    bayesian: number | string
}
