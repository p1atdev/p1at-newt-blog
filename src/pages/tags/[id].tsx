import { GetStaticPathsResult, GetStaticPropsContext } from "next"
import PostList from "../../components/PostList"
import TagBadge from "../../components/Tag"
import NormalLayout from "../../layout/NormalLayout"
import { Post } from "../../types/posts"
import { Tag } from "../../types/tags"
import { getPosts, getTags } from "../../utils/newt"

interface Props {
    tags: Tag[]
    tag: Tag
    posts: Post[]
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    const tagId = ctx.params?.id

    if (typeof tagId !== "string") {
        return {
            props: {},
            redirect: {
                destination: "/404",
            },
        }
    }

    try {
        const posts = await getPosts()
        const tags = await getTags()

        if (posts === undefined || tags === undefined) {
            return {
                props: {},
                redirect: {
                    destination: "/404",
                },
            }
        }

        const tag = tags.find((tag) => tag._id === tagId)

        if (tag === undefined) {
            return {
                props: {},
                redirect: {
                    destination: "/404",
                },
            }
        }

        const filtered = posts.filter((post) => post.tags.map((tag) => tag._id).includes(tagId))

        return {
            props: {
                tags: tags,
                tag: tag,
                posts: filtered,
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
        const tags = await getTags()

        if (tags === undefined) {
            return {
                paths: [],
                fallback: false,
            }
        }

        const paths = tags.map((tag) => {
            return {
                params: {
                    id: tag._id,
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

const Page = ({ tags, tag, posts }: Props) => {
    return (
        <NormalLayout tags={tags}>
            <div>
                <div>
                    <p className="my-2 text-2xl font-semibold">タグ</p>
                </div>

                <p className="flex gap-x-1">
                    <span>
                        <TagBadge {...tag} />
                    </span>
                    が含まれた記事一覧
                </p>

                <div className="my-4">
                    <PostList posts={posts} />
                </div>
            </div>
        </NormalLayout>
    )
}

export default Page
