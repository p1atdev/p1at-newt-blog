import type { NextApiRequest as Req, NextApiResponse as Res } from "next"
import { searchPosts } from "../../../utils/newt"

const handler = async (req: Req, res: Res) => {
    const query = req.query.q
    const page = req.query.page ?? "1"

    if (!query || !page) {
        res.status(400).json({
            error: "Missing query",
        })
        return
    }

    if (typeof query !== "string" || typeof page !== "string") {
        res.status(400).json({
            error: "Invalid query",
        })
        return
    }

    const pageNumber = parseInt(page, 10)

    const count = 10 // 1ページに表示する分

    const result = await searchPosts(query, pageNumber, count)

    if (result) {
        res.status(200).json(result)
    } else {
        res.status(500).json({ error: "Something went wrong" })
    }
}

export default handler
