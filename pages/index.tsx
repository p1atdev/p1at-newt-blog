import { GetStaticPropsContext } from "next"
import Head from "next/head"
import NextLink from "next/link"
import Image from "next/image"
import PostList from "../components/PostList"
import { Posts } from "../types/posts"
import { getPosts } from "../utils/newt"
import SideNavBar from "../components/sideNavBar/SideNavBar"
import SideNabBarToggle from "../components/sideNavBar/SideNavBarToggle"
import SideNavBarDrawer from "../components/sideNavBar/SideNavBarDrawer"

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
        <div className=" h-screen w-screen">
            <div className="flex h-full w-full flex-col divide-x md:flex-row">
                {/* サイドバー */}
                <div className="hidden basis-1/4 md:block lg:basis-1/5">
                    <SideNavBar />
                </div>

                <div className="h-screen justify-end md:hidden">
                    <div className="absolute z-50 h-screen">
                        <SideNavBarDrawer />
                    </div>
                    <div className="mx-4 mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-x-2 px-2 pt-4 text-3xl font-bold">
                            <div className="m-auto h-10 w-10 rounded-full bg-blue-100 p-0.5 text-[0px] tracking-normal">
                                <Image
                                    src={"https://avatars.githubusercontent.com/u/60182057"}
                                    width={36}
                                    height={36}
                                    className="rounded-full"
                                />
                            </div>
                            <p>Plat Dev</p>
                        </div>
                        <SideNabBarToggle />
                    </div>
                </div>

                <div className="flex grow flex-col divide-y overflow-clip md:overflow-auto lg:flex-row lg:divide-x ">
                    {/* ホーム要素 */}
                    <div className="grow py-10 px-6 lg:overflow-auto">
                        <div className="mb-1">
                            <h2 className=" text-2xl font-semibold">最新記事</h2>
                            <div className="flex justify-end">
                                <NextLink href={"/posts"}>
                                    <a className="font-medium text-blue-400 hover:underline">全ての記事→</a>
                                </NextLink>
                            </div>
                        </div>
                        <PostList posts={posts.items.slice(0, 5)} />
                    </div>

                    {/* リンク集など */}
                    <div className="grow basis-1/4 py-10 px-6 ">
                        <p className=" text-2xl font-semibold">検索</p>
                        <p>Coming soon...</p>
                        <p className=" text-2xl font-semibold">タグ一覧</p>
                        <p>Coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
