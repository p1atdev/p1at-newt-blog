import { GetStaticPropsContext } from "next"
import { Post } from "../../types/posts"
import { Tag } from "../../types/tags"
import { getPosts, getTags } from "../../utils/newt"
import PostList from "../../components/PostList"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import NormalLayout from "../../layout/NormalLayout"
import { Icon } from "@iconify/react"

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
    const total = useMemo(() => posts?.length ?? 0, [posts])

    const prevPage = () => {
        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        if (router.isReady) {
            setPage(parseInt(router.query.page as string) || 1)
        }
    }, [router.isReady])

    useEffect(() => {
        router.push(`/posts?page=${page}`, undefined, { shallow: true })
    }, [page])

    if (posts === undefined) {
        return <div>No posts found</div>
    }

    return (
        <NormalLayout tags={tags ?? []}>
            <p className="mb-6 text-2xl font-bold">記事一覧</p>

            <PostList posts={posts.slice((page - 1) * limit, page * limit)} />

            {posts.length > 0 && (
                <div className="my-4">
                    <div className="flex justify-evenly gap-x-2 text-xl font-bold text-blue-500">
                        <button
                            onClick={prevPage}
                            className="h-9 w-9 rounded border p-2 shadow-sm hover:shadow-md disabled:text-gray-500 disabled:shadow-none disabled:hover:shadow-none"
                            disabled={page === 1}
                        >
                            <Icon icon="charm:chevron-left" className="m-auto" />
                        </button>

                        <button
                            onClick={nextPage}
                            className="h-9 w-9 rounded border p-2 shadow-sm hover:shadow-md disabled:text-gray-500 disabled:shadow-none disabled:hover:shadow-none"
                            disabled={total <= page * limit}
                        >
                            <Icon icon="charm:chevron-right" className="m-auto" />
                        </button>
                    </div>

                    <div>
                        <p className="text-center">{page} ページ目</p>
                    </div>
                </div>
            )}
        </NormalLayout>
    )
}

export default Page
