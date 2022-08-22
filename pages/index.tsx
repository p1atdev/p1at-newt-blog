import { GetStaticPropsContext } from "next"
import Head from "next/head"
import NextLink from "next/link"
import PostList from "../components/PostList"
import { Posts } from "../types/posts"
import { getPosts } from "../utils/newt"
import NormalLayout from "../components/layout/NormalLayout"

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
    } catch (error) {
        console.error(error)

        return {
            props: {},
        }
    }
}

const Index = ({ posts }: Props) => {
    if (posts === undefined) {
        return <div>No posts found</div>
    }

    return (
        <NormalLayout>
            <div className="mb-1">
                <h2 className=" text-2xl font-semibold">最新記事</h2>
                <div className="flex justify-end">
                    <NextLink href={"/posts"}>
                        <a className="font-medium text-blue-400 hover:underline">全ての記事→</a>
                    </NextLink>
                </div>
            </div>
            <PostList posts={posts.items.slice(0, 5)} />
        </NormalLayout>
    )
}

export default Index
