import NextLink from "next/link"
import PostListItem from "./PostListItem"
import { Posts } from "../types/posts"

interface Props {
    posts: Posts
}

const PostList = ({ posts }: Props) => {
    return (
        <div>
            {posts.items.map((post) => {
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
