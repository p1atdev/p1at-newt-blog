import { GetStaticPropsContext } from "next"
import NextLink from "next/link"
import { Posts } from "../../types/posts"
import { getPosts } from "../../utils/newt"
import TagList from "../../components/TagList"
import CreatedAt from "../../components/date/CreatedAt"
import UpdatedAt from "../../components/date/UpdatedAt"
import PostList from "../../components/PostList"

interface Props {
    posts?: Posts
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    try {
        const posts = await getPosts()
        return {
            props: {
                posts: posts,
            },
        }
    } catch {
        return {
            props: {},
        }
    }
}

const Page = ({ posts }: Props) => {
    if (posts === undefined) {
        return <div>No posts found</div>
    }

    return (
        <div className="mx-auto max-w-lg px-4 md:max-w-xl xl:max-w-2xl">
            <p className="py-8 text-3xl font-bold">記事一覧</p>
            <PostList posts={posts} />
        </div>
    )
}

export default Page
