import LinkCard from "../components/LinkCard"
import { unfurl } from "unfurl.js"

export const createLinkCard = async (url: string) => {
    const ogp = await unfurl(url)

    // console.log(ogp)

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
        <div>
            <p class="title">${ogp.title ?? "No Title"}</p>
            <p class="url">${url}</p>
        </div>
        <img src="${image ?? ""}" alt="${""}">
    </a>
        
        `.trim()

    return card
}
