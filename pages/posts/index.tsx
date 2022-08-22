import { GetStaticPropsContext, NextPageContext } from "next"
import NextLink from "next/link"
import Image from "next/image"
import { Posts } from "../../types/posts"
import { getPosts } from "../../utils/newt"
import PostList from "../../components/PostList"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import SideNabBarToggle from "../../components/sideNavBar/SideNavBarToggle"
import SideNavBarDrawer from "../../components/sideNavBar/SideNavBarDrawer"
import SideNavBar from "../../components/sideNavBar/SideNavBar"
import NormalLayout from "../../layout/NormalLayout"

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
        <NormalLayout>
            <p className="mb-6 text-2xl font-bold">記事一覧</p>
            <PostList posts={posts.items.slice((page - 1) * limit, page * limit)} />
            {/* TODO: ここのページングを作る */}
            <div className="mt-8">
                <p>ページ: {page}</p>
            </div>
        </NormalLayout>
    )
}

export default Page
