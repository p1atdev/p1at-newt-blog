export interface Posts {
    skip: number
    limit: number
    total: number
    items: Post[]
}

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
    createdAt: string
    upstringdAt: string
}

export interface Raw {
    createdAt: string
    upstringdAt: string
    firstPublishedAt: string
    publishedAt: string
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
