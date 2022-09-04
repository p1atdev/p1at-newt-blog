export interface NewtClientOptions {
    spaceUid: string
    token: string
    apiType: "api" | "cdn"
}

export interface GetContentOptions {
    appUid: string
    modelUid: string
    contentId: string
}

export interface GetContentsOptions {
    appUid: string
    modelUid: string
}

export class NewtClient {
    private readonly url: string
    private readonly bearer: string

    constructor(options: NewtClientOptions) {
        this.url = `https://${options.spaceUid}.${options.apiType}.newt.so/v1`
        this.bearer = `Bearer ${options.token}`
    }

    async getContent({ appUid, modelUid, contentId }: GetContentOptions) {
        const url = `${this.url}/${appUid}/${modelUid}/${contentId}`

        const res = await fetch(url, {
            headers: {
                Authorization: this.bearer,
            },
        })

        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`)
        }

        return res.json()
    }

    async getContents({ appUid, modelUid }: GetContentsOptions) {
        const url = `${this.url}/${appUid}/${modelUid}`

        const res = await fetch(url, {
            headers: {
                Authorization: this.bearer,
            },
        })

        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`)
        }

        return res.json()
    }
}
