import LinkCard from "../components/LinkCard"

export const createLinkCard = async (url: string) => {
    return LinkCard({ url: url, title: "Example", description: "Example site", thumbnail: "" })
}
