import { GetStaticPathsResult, GetStaticPropsContext } from "next"
import { Post } from "../../types/post"
import { createClient } from "newt-client-js"
import { getPost, getPosts } from "../../utils/newt"
// import {} from "../../types/post"

interface Props {
    post: Post
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

        console.log(post)

        return {
            props: {
                post: post,
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

        const paths = posts.items.map((post) => {
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

const Page = ({ post }: Props) => {
    return (
        <div className="mx-auto xl:max-w-2xl">
            <p className="mt-8 text-6xl">{post.emoji.value}</p>
            <h1 className="mt-6 text-3xl font-bold">{post.title}</h1>

            <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
        </div>
    )
}

export default Page
