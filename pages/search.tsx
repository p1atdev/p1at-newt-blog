import { Icon } from "@iconify/react"
import { GetStaticPathsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import NormalLayout from "../components/layout/NormalLayout"
import PostList from "../components/PostList"
import { useSearchPost } from "../hooks/useSearchPost"
import { Tag } from "../types/tags"
import { getTags } from "../utils/newt"

interface Props {
    tags?: Tag[]
}

export const getStaticProps = async (ctx: GetStaticPathsContext) => {
    try {
        const tags = await getTags()

        return {
            props: {
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

const count = 10

const Page = ({ tags }: Props) => {
    const { query, posts, page, total, search, handleChange, handleSearch, prevPage, nextPage } = useSearchPost()
    const router = useRouter()

    return (
        <NormalLayout tags={tags ?? []}>
            <h1 className="text-2xl font-bold">検索</h1>
            <div className="my-4 flex w-full items-center rounded-full bg-slate-100 px-3 text-lg ring-slate-300 focus-within:ring">
                <Icon icon="akar-icons:search" />
                <form className="w-full" onSubmit={handleSearch}>
                    <input
                        type={"search"}
                        id={"q"}
                        placeholder={"テキストを入力..."}
                        className="w-full rounded-full border-0 bg-slate-100 px-2 py-2 outline-none"
                        onChange={handleChange}
                        defaultValue={query}
                    />
                </form>
            </div>

            {posts.length === 0 && page === 1 && (
                <div className="grid h-80 grid-cols-1 place-items-center">
                    <p className="text-lg text-gray-500">検索結果なし</p>
                </div>
            )}
            {posts.length > 0 && (
                <div>
                    <PostList posts={posts} />
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
                            disabled={total <= page * count}
                        >
                            <Icon icon="charm:chevron-right" className="m-auto" />
                        </button>
                    </div>
                </div>
            )}
        </NormalLayout>
    )
}

export default Page
