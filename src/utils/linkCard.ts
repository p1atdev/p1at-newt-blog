import LinkCard from "../components/LinkCard"
import { unfurl } from "unfurl.js"

export const createLinkCard = async (url: string) => {
    const ogp = await unfurl(url)

    // console.log(ogp)

    const description = ogp.description || ""

    const twitterImage = (() => {
        if (ogp.twitter_card !== undefined) {
            if (ogp.twitter_card.images !== undefined) {
                return ogp.twitter_card.images[0].url
            }
        }

        return undefined
    })()
    const openGraphImage = (() => {
        if (ogp.open_graph !== undefined) {
            if (ogp.open_graph.images !== undefined) {
                return ogp.open_graph.images[0].url
            }
        }

        return undefined
    })()

    const image = twitterImage || openGraphImage || ogp.favicon || ""

    const card = `
    <a href="${url}" targe="__blank" class="link-card">
        <div class="info">
            <p class="title">${ogp.title ?? "No Title"}</p>
            <p class="description">${description}</p>
            <div class="url">
                <img class="favicon" src="${ogp.favicon ?? ""}" alt="" />
                <p class="hostname">${new URL(url).hostname}</p>
            </div>
        </div>
        <img class="thumbnail" src="${image ?? ""}" alt="${""}">
    </a>
        
        `.trim()

    return card
}
