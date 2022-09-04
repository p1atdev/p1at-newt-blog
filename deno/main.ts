import { config } from "https://deno.land/std@0.154.0/dotenv/mod.ts"
await config({ path: "../.env.local", export: true })

import { generateOGPImage } from "./generate.ts"
import { getPosts } from "./newt.ts"

const posts = await getPosts()

if (!posts) {
    throw new Error("No posts found")
}

await Promise.all(
    posts.map(async (post) => {
        const image = await generateOGPImage(post.emoji.value, post.title)

        if (!image) {
            throw new Error("No image generated")
        }

        if (typeof image === "string") {
            throw new Error("Image is not a buffer")
        }

        await Deno.writeFile(`../asset/ogp/${post._id}.webp`, image)
    })
)
