import { GetStaticPathsResult, GetStaticPropsContext } from "next"
import { Post } from "../../types/posts"
import { getPost, getPosts } from "../../utils/newt"
import TagList from "../../components/TagList"
import CreatedAt from "../../components/date/CreatedAt"
import UpdatedAt from "../../components/date/UpdatedAt"
import { Heading, reformHTML } from "../../utils/markdown"
import PostLayout from "../../components/layout/PostLayout"
import TOC from "../../components/TOC"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import Markdown from "../../components/Markdown"

interface Props {
    post: Post
    html: string
    toc: Heading[]
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    const contentId = ctx.params?.id

    if (typeof contentId !== "string") {
        return {
            props: {},
            redirect: {
                destination: "/404",
            },
        }
    }

    try {
        const post = await getPost(contentId)

        if (post === undefined) {
            return {
                props: {},
                redirect: {
                    destination: "/404",
                },
            }
        }

        const result = await reformHTML(post.body)

        return {
            props: {
                post: post,
                ...result,
            },
        }
    } catch (error) {
        console.error(error)

        return {
            props: {},
            redirect: {
                destination: "/404",
            },
        }
    }
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
    try {
        const posts = await getPosts()

        if (posts === undefined) {
            return {
                paths: [],
                fallback: false,
            }
        }

        const paths = posts.map((post) => {
            return {
                params: {
                    id: post._id,
                },
            }
        })

        return {
            paths,
            fallback: false,
        }
    } catch (error) {
        console.error(error)

        return {
            paths: [],
            fallback: false,
        }
    }
}

const Page = ({ post, html, toc }: Props) => {
    const [isTOCOpen, setIsTOCOpen] = useState(false)

    return (
        <PostLayout toc={toc}>
            <div className="mx-auto px-4 sm:max-w-lg md:max-w-xl xl:max-w-2xl">
                <div className="mb-8">
                    <p className="mt-8 text-6xl">{post.emoji.value}</p>
                    <h1 className="mt-6 text-3xl font-bold">{post.title}</h1>
                    <div className="flex gap-x-3">
                        <CreatedAt date={post._sys.createdAt} />
                        <UpdatedAt date={post._sys.raw.publishedAt} />
                    </div>
                    <TagList tags={post.tags} />
                </div>

                <div className="lg:hidden">
                    <div className="rounded border text-gray-500">
                        <div
                            className="flex cursor-pointer items-center justify-between"
                            onClick={() => {
                                setIsTOCOpen(!isTOCOpen)
                            }}
                        >
                            <p className="px-4 py-2">目次 (クリックで展開)</p>
                            <div className="px-4 py-2 text-lg font-bold">
                                <Icon icon="akar-icons:chevron-down" />
                            </div>
                        </div>
                        <hr />
                        <div className="bg-gray-100 bg-opacity-30 px-4 py-2">{isTOCOpen && <TOC toc={toc} />}</div>
                    </div>
                </div>

                {/* <Markdown html={html} /> */}

                <div dangerouslySetInnerHTML={{ __html: html }} className="markdown"></div>
            </div>
        </PostLayout>
    )
}

export default Page
