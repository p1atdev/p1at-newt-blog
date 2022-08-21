import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext } from "next"
import Tag from "../../components/Tag"
import NextLink from "next/link"
import { Posts } from "../../types/posts"
import { getPosts } from "../../utils/newt"
import Tags from "../../components/Tags"
import CreatedAt from "../../components/date/CreatedAt"
import UpdatedAt from "../../components/date/UpdatedAt"

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
    if (posts === undefined) {
        return <div>No posts found</div>
    }

    return (
        <div className="mx-auto max-w-lg px-4 md:max-w-xl xl:max-w-2xl">
            <p className="py-8 text-3xl font-bold">記事一覧</p>
            <div>
                {posts!.items.map((post) => {
                    return (
                        <NextLink key={post._id} href={`/posts/${post._id}`}>
                            <div className="flex rounded-md border border-gray-100 p-2 hover:shadow-sm">
                                <div className="mx-2 w-16 p-4">
                                    <div className="m-auto text-3xl">{post.emoji.value}</div>
                                </div>
                                <div className="w-full pr-4">
                                    <p className="text-xl font-medium">{post.title}</p>
                                    <Tags tags={post.tags} />
                                    <div className="flex w-full justify-end gap-x-2">
                                        <div className="hidden sm:block">
                                            <CreatedAt date={post._sys.createdAt} />
                                        </div>
                                        <UpdatedAt date={post._sys.raw.publishedAt} />
                                    </div>
                                </div>
                            </div>
                        </NextLink>
                    )
                })}
            </div>
        </div>
    )
}

export default Page
