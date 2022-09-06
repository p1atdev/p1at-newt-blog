export interface Tags {
    skip: number
    limit: number
    total: number
    items: Tag[]
}

export interface Tag {
    _id: string
    _sys: Sys
    name: string
    color: string
}

export interface Sys {
    raw: Raw
    createdAt: string
    updatedAt: string
}

export interface Raw {
    createdAt: string
    updatedAt: string
    firstPublishedAt: string
    publishedAt: string
}
