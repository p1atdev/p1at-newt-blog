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
                <h2 className="text-2xl font-semibold">最新記事</h2>
            </div>

            <PostList posts={posts.slice(0, 5)} />

            <div className="my-2">
                <NextLink href={"/posts"} passHref>
                    <button className="w-full rounded-md border border-blue-200 p-2 text-blue-400 hover:bg-blue-100 hover:bg-opacity-10 hover:shadow-sm">
                        <div className="w-full">全ての記事を見る</div>
                    </button>
                </NextLink>
            </div>
        </NormalLayout>
    )
}

export default Index
