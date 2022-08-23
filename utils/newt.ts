import { createClient } from "newt-client-js"
import { Posts, Post } from "../types/posts"
import { Tag, Tags } from "../types/tags"

interface Secrets {
    NEWT_SPACE_UID: string
    NEWT_CDN_API_TOKEN: string
    NEWT_APP_UID: string
}

const getSecrets = (): Secrets => {
    const NEWT_SPACE_UID = process.env.NEWT_SPACE_UID!
    const NEWT_CDN_API_TOKEN = process.env.NEWT_CDN_API_TOKEN!
    const NEWT_APP_UID = process.env.NEWT_APP_UID!

    if (!NEWT_SPACE_UID || !NEWT_CDN_API_TOKEN || !NEWT_APP_UID) {
        throw new Error("Missing environment variables")
    }

    return {
        NEWT_SPACE_UID,
        NEWT_CDN_API_TOKEN,
        NEWT_APP_UID,
    }
}

export const getPosts = async (): Promise<Post[] | undefined> => {
    const secrets = getSecrets()
    const NEWT_POST_MODEL_UID = process.env.NEWT_POST_MODEL_UID!

    if (!NEWT_POST_MODEL_UID) {
        throw new Error("Missing post model uid")
    }

    const client = createClient({
        spaceUid: secrets.NEWT_SPACE_UID,
        token: secrets.NEWT_CDN_API_TOKEN,
        apiType: "cdn",
    })

    try {
        const posts: Posts = await client.getContents({
            appUid: secrets.NEWT_APP_UID,
            modelUid: NEWT_POST_MODEL_UID,
        })

        return posts.items
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const getPost = async (id: string): Promise<Post | undefined> => {
    const secrets = getSecrets()
    const NEWT_POST_MODEL_UID = process.env.NEWT_POST_MODEL_UID!

    if (!NEWT_POST_MODEL_UID) {
        throw new Error("Missing post model uid")
    }

    const client = createClient({
        spaceUid: secrets.NEWT_SPACE_UID,
        token: secrets.NEWT_CDN_API_TOKEN,
        apiType: "cdn",
    })

    try {
        const post: Post = await client.getContent({
            appUid: secrets.NEWT_APP_UID,
            modelUid: NEWT_POST_MODEL_UID,
            contentId: id,
        })

        return post
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const getTags = async (): Promise<Tag[] | undefined> => {
    const secrets = getSecrets()
    const NEWT_TAG_MODEL_UID = process.env.NEWT_TAG_MODEL_UID!

    if (!NEWT_TAG_MODEL_UID) {
        throw new Error("Missing tag model uid")
    }

    const client = createClient({
        spaceUid: secrets.NEWT_SPACE_UID,
        token: secrets.NEWT_CDN_API_TOKEN,
        apiType: "cdn",
    })

    try {
        const tags: Tags = await client.getContents({
            appUid: secrets.NEWT_APP_UID,
            modelUid: NEWT_TAG_MODEL_UID,
            query: {
                order: ["color"],
            },
        })

        return tags.items
    } catch (error) {
        console.error(error)

        return undefined
    }
}
