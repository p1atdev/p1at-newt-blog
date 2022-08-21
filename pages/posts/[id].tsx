import { GetStaticPathsResult, GetStaticPropsContext } from "next"
import { Post } from "../../types/post"
import { getPost, getPosts } from "../../utils/newt"
import TagList from "../../components/TagList"
import CreatedAt from "../../components/date/CreatedAt"
import UpdatedAt from "../../components/date/UpdatedAt"
import NavBar from "../../components/NavBar"
import style from "../../styles/post.module.scss"

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
        <div className="mx-auto px-4 sm:max-w-lg md:max-w-xl xl:max-w-2xl">
            <NavBar />

            <div className="mb-8">
                <p className="mt-8 text-6xl">{post.emoji.value}</p>
                <h1 className="mt-6 text-3xl font-bold">{post.title}</h1>
                <div className="flex gap-x-3">
                    <CreatedAt date={post._sys.createdAt} />
                    <UpdatedAt date={post._sys.updatedAt} />
                </div>
                <TagList tags={post.tags} />
            </div>

            <div dangerouslySetInnerHTML={{ __html: post.body }} className={style.markdown}></div>
        </div>
    )
}

export default Page
