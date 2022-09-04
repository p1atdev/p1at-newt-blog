import type { NextApiRequest as Req, NextApiResponse as Res } from "next"
import { getPost } from "../../../utils/newt"
import { createOGPImage } from "../../../utils/ogp_image"

const handler = async (req: Req, res: Res) => {
    const contentId = req.query.id

    if (typeof contentId !== "string") {
        res.status(404).json({
            error: "Not found",
        })
        return
    }

    try {
        const post = await getPost(contentId)

        if (post === undefined) {
            res.status(404).json({
                error: "Not found",
            })
            return
        }

        const imageBuffer = await createOGPImage(post.emoji.value, post.title)

        res.setHeader("Content-Type", "image/png")
        res.status(200).send(imageBuffer)
        return
    } catch (error) {
        res.status(500).json({
            error: "Something went wrong",
        })
    }
}

export default handler
