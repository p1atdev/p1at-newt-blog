import { GetStaticPropsContext } from "next"
import NextLink from "next/link"
import PostList from "../components/PostList"
import { Post } from "../types/posts"
import { getPosts, getTags } from "../utils/newt"
import NormalLayout from "../layout/NormalLayout"
import { Tag } from "../types/tags"

interface Props {
    posts?: Post[]
    tags?: Tag[]
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    try {
        const posts = await getPosts()
        const tags = await getTags()

        return {
            props: {
                posts: posts,
                tags: tags,
            },
        }
    } catch (error) {
        console.error(error)

        return {
            props: {},
        }
    }
}

const Index = ({ posts, tags }: Props) => {
    if (posts === undefined) {
        return <div>No posts found</div>
    }

    return (
        <NormalLayout tags={tags ?? []}>
            <div className="mb-1">
                <h2 className=" text-2xl font-semibold">最新記事</h2>
                <div className="flex justify-end">
                    <NextLink href={"/posts"}>
                        <a className="font-medium text-blue-400 hover:underline">全ての記事→</a>
                    </NextLink>
                </div>
            </div>
            <PostList posts={posts.slice(0, 5)} />
        </NormalLayout>
    )
}

export default Index
