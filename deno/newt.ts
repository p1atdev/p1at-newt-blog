import { NewtClient } from "./client.ts"
import { Post, Posts } from "../src/types/posts.ts"

interface ClientSecrets {
    NEWT_SPACE_UID: string
    NEWT_API_TOKEN: string
    NEWT_API_TYPE: "cdn" | "api"
}

interface AppParam {
    NEWT_APP_UID: string
    NEWT_POST_MODEL_UID: string
    NEWT_TAG_MODEL_UID: string
}

const getSecrets = (): ClientSecrets => {
    const NEWT_SPACE_UID = Deno.env.get("NEWT_SPACE_UID")!
    const NEWT_API_TOKEN = Deno.env.get("NEWT_API_TOKEN")!
    const NEWT_API_TYPE = Deno.env.get("NEWT_API_TYPE")!

    if (!NEWT_SPACE_UID || !NEWT_API_TOKEN) {
        throw new Error("Missing environment variables")
    }

    if (NEWT_API_TYPE !== "cdn" && NEWT_API_TYPE !== "api") {
        throw new Error("Invalid environment variable: NEWT_APP_TYPE")
    }

    return {
        NEWT_SPACE_UID,
        NEWT_API_TOKEN,
        NEWT_API_TYPE,
    }
}

const getParam = (): AppParam => {
    const NEWT_APP_UID = Deno.env.get("NEWT_APP_UID")!
    const NEWT_POST_MODEL_UID = Deno.env.get("NEWT_POST_MODEL_UID")!
    const NEWT_TAG_MODEL_UID = Deno.env.get("NEWT_TAG_MODEL_UID")!

    if (!NEWT_APP_UID || !NEWT_POST_MODEL_UID || !NEWT_TAG_MODEL_UID) {
        throw new Error("Missing environment variables")
    }

    return {
        NEWT_APP_UID,
        NEWT_POST_MODEL_UID,
        NEWT_TAG_MODEL_UID,
    }
}

const newClient = () => {
    const secrets = getSecrets()
    const NEWT_POST_MODEL_UID = Deno.env.get("NEWT_POST_MODEL_UID")!

    if (!NEWT_POST_MODEL_UID) {
        throw new Error("Missing post model uid")
    }

    const client = new NewtClient({
        spaceUid: secrets.NEWT_SPACE_UID,
        token: secrets.NEWT_API_TOKEN,
        apiType: secrets.NEWT_API_TYPE,
    })

    return client
}

export const getPost = async (id: string): Promise<Post | undefined> => {
    const client = newClient()
    const param = getParam()

    try {
        const post: Post = await client.getContent({
            appUid: param.NEWT_APP_UID,
            modelUid: param.NEWT_POST_MODEL_UID,
            contentId: id,
        })

        return post
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const getPosts = async (): Promise<Post[] | undefined> => {
    const client = newClient()
    const param = getParam()

    try {
        const posts: Posts = await client.getContents({
            appUid: param.NEWT_APP_UID,
            modelUid: param.NEWT_POST_MODEL_UID,
        })

        return posts.items
    } catch (error) {
        console.error(error)

        return undefined
    }
}
