import { GetStaticPropsContext, NextPageContext } from "next"
import NextLink from "next/link"
import Image from "next/image"
import { Post } from "../../types/posts"
import { Tag } from "../../types/tags"
import { getPosts, getTags } from "../../utils/newt"
import PostList from "../../components/PostList"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NormalLayout from "../../components/layout/NormalLayout"

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
    } catch {
        return {
            props: {},
        }
    }
}

const Page = ({ posts, tags }: Props) => {
    const router = useRouter()
    const [page, setPage] = useState<number>(1)
    const limit = 10

    useEffect(() => {
        if (router.isReady) {
            setPage(parseInt(router.query.page as string) || 1)
        }
    }, [router])

    if (posts === undefined) {
        return <div>No posts found</div>
    }

    return (
        <NormalLayout tags={tags ?? []}>
            <p className="mb-6 text-2xl font-bold">記事一覧</p>
            <PostList posts={posts.slice((page - 1) * limit, page * limit)} />
            {/* TODO: ここのページングを作る */}
            <div className="mt-8">
                <p>ページ: {page}</p>
            </div>
        </NormalLayout>
    )
}

export default Page
