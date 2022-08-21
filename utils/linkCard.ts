import LinkCard from "../components/LinkCard"
import { unfurl } from "unfurl.js"

export const createLinkCard = async (url: string) => {
    const ogp = await unfurl(url)

    console.log(ogp)

    const card = `
    <a href="${url}" targe="__blank" class="link-card">

        <div>
            <p class="title">${ogp.title ?? "No Title"}</p>
            <p class="url">${url}</p>
        </div>
        <img src="${ogp.favicon ?? ""}" alt="${""}">
    </a>
        
        `.trim()

    return card
}
