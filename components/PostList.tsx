import NextLink from "next/link"
import PostListItem from "./PostListItem"
import { Post } from "../types/posts"
import { format } from "date-fns"
import { useRouter } from "next/router"

interface Props {
    posts: Post[]
}

const PostList = ({ posts }: Props) => {
    if (posts.length === 0) {
        return (
            <div>
                <p className="text-gray-400">記事が見つかりませんでした</p>
                <div className="my-8 bg-black p-4 font-mono text-white">
                    <p className=" my-2 text-2xl font-medium">IndexError: page out of range</p>
                    <div className="my-4">
                        <p>Datetime: {format(new Date(), "yyyy-MM-dd E H:mm:ss XXXXX")}</p>
                        <p className="text-red-600">
                            Reason: Tried to retrieve an post by specifying the page, but the post does not exist.
                        </p>
                        <p>
                            Solution: Return to
                            <NextLink href="/">
                                <a className="mx-1.5 hover:underline">the top page</a>
                            </NextLink>
                            or
                            <NextLink href="/posts">
                                <a className="mx-1.5 hover:underline">the post list page</a>
                            </NextLink>
                            .
                        </p>
                    </div>
                    <div className="my-4">
                        <p>Version: 0.1.0</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {posts.map((post) => {
                return (
                    <NextLink key={post._id} href={`/posts/${post._id}`}>
                        <PostListItem post={post} />
                    </NextLink>
                )
            })}
        </div>
    )
}

export default PostList
