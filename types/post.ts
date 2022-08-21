export interface Post {
    _id: string
    _sys: Sys
    emoji: Emoji
    title: string
    body: string
    tags: Tag[]
}

export interface Sys {
    raw: Raw
    createdAt: Date
    updatedAt: Date
}

export interface Raw {
    createdAt: Date
    updatedAt: Date
    firstPublishedAt: Date
    publishedAt: Date
}

export interface Emoji {
    type: string
    value: string
}

export interface Tag {
    _id: string
    _sys: Sys
    name: string
    color: string
}
